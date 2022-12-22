import { Prisma } from '../../prisma/generated/prisma/client';
import { EventEntityRepository } from './event-entity-type';
import { EventStore } from './event-store';

describe('event-store', () => {
    enum OrderState {
        CREATE = 'CREATE_ORDER',
        ADD_LINE = 'ADD_LINE',
        REMOVE_LINE = 'REMOVE_LINE',
        CONFIRM = 'CONFIRM',
        CANCEL = 'CANCEL',
    }

    interface OrderEvents {
        id: string;
        eventLog: Prisma.JsonValue[];
        currentEvent: number;
    }

    const createMock = jest.fn();
    let getMock = jest.fn().mockResolvedValue(null);
    const getAllMock = jest.fn();
    const appendEventMock = jest.fn();

    class OrderEventRepository
        implements EventEntityRepository<OrderEvents, OrderState>
    {
        create(
            entityId: string,
            eventLog: Prisma.JsonValue[]
        ): Promise<OrderEvents> {
            return createMock(entityId, eventLog);
        }
        get(entityId: string): Promise<OrderEvents | null> {
            return getMock(entityId);
        }
        getAll(): Promise<OrderEvents[]> {
            return getAllMock();
        }
        appendEvent(
            entityId: string,
            updatedEventLog: Prisma.JsonValue[],
            currentEventSeq: number
        ): Promise<OrderEvents> {
            return appendEventMock(entityId, updatedEventLog, currentEventSeq);
        }
    }

    const payloads: { [key: string]: Record<string, unknown> } = {
        createOrderPayload: {
            createdDate: new Date().toLocaleDateString(),
            createdBy: 'Batman',
        },
        addLine1Payload: {
            skuId: 'SKU001',
            unitPrice: 12.5,
            qty: 3,
        },
        addLine2Payload: {
            skuId: 'SKU002',
            unitPrice: 20,
            qty: 1,
        },
        addLine3Payload: {
            skuId: 'SKU098',
            unitPrice: 2,
            qty: 5,
        },
        removeLinePayload: {
            skuId: 'SKU098',
        },
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('When an event is appended with a payload, it is added to event log of the event store', async () => {
        // Arrange
        const orderEventRepository = new OrderEventRepository();
        const orderEventStore = new EventStore<
            OrderState,
            OrderEvents,
            OrderEventRepository
        >(orderEventRepository);

        // Act
        await orderEventStore.appendEvent(
            '1',
            OrderState.CREATE,
            payloads['createOrderPayload']
        );
        getMock = jest.fn().mockResolvedValue({
            id: '1',
            eventLog: [
                {
                    event: 'CREATE_ORDER',
                    eventId: 1,
                    timestamp: 1671690332882,
                    payload: {},
                },
            ],
            currentEvent: 1,
        });
        await orderEventStore.appendEvent(
            '1',
            OrderState.ADD_LINE,
            payloads['addLine1Payload']
        );
        await orderEventStore.appendEvent(
            '1',
            OrderState.ADD_LINE,
            payloads['addLine2Payload']
        );
        await orderEventStore.appendEvent(
            '1',
            OrderState.ADD_LINE,
            payloads['addLine3Payload']
        );
        await orderEventStore.appendEvent(
            '1',
            OrderState.REMOVE_LINE,
            payloads['removeLinePayload']
        );

        // Assert
        const allEvents = await orderEventStore.getAllEventsByEntityId('1');
        expect(allEvents).toHaveLength(5);
        expect(allEvents.map((event) => (event as any).event)).toStrictEqual([
            OrderState.CREATE,
            OrderState.ADD_LINE,
            OrderState.ADD_LINE,
            OrderState.ADD_LINE,
            OrderState.REMOVE_LINE,
        ]);
        expect(createMock).toBeCalledTimes(1);
        expect(appendEventMock).toBeCalledTimes(4);
    });

    it('When a new domain instance is added to an existing event store, the domain events gets appended to the respective event log', async () => {
        // Arrange
        const orderEventRepository = new OrderEventRepository();
        const orderEventStore = new EventStore<
            OrderState,
            OrderEvents,
            OrderEventRepository
        >(orderEventRepository);

        // Act
        // Domain instance 1
        getMock = jest.fn().mockResolvedValue(null);
        await orderEventStore.appendEvent(
            '1',
            OrderState.CREATE,
            payloads['createOrderPayload']
        );
        getMock = jest.fn().mockResolvedValue({
            id: '1',
            eventLog: [
                {
                    event: 'CREATE_ORDER',
                    eventId: 1,
                    timestamp: 1671690332882,
                    payload: {},
                },
            ],
            currentEvent: 1,
        });
        await orderEventStore.appendEvent(
            '1',
            OrderState.ADD_LINE,
            payloads['addLine1Payload']
        );

        // Domain instance 2
        getMock = jest.fn().mockResolvedValue(null);
        await orderEventStore.appendEvent(
            '2',
            OrderState.CREATE,
            payloads['createOrderPayload']
        );
        getMock = jest.fn().mockResolvedValue({
            id: '2',
            eventLog: [
                {
                    event: 'CREATE_ORDER',
                    eventId: 1,
                    timestamp: 1671690332882,
                    payload: {},
                },
            ],
            currentEvent: 1,
        });
        await orderEventStore.appendEvent(
            '2',
            OrderState.ADD_LINE,
            payloads['addLine3Payload']
        );

        // Assert
        expect(createMock).toHaveBeenNthCalledWith(1, '1', [
            expect.objectContaining({
                event: OrderState.CREATE,
                eventId: 1,
                payload: payloads['createOrderPayload'],
            }),
        ]);
        expect(createMock).toHaveBeenNthCalledWith(2, '2', [
            expect.objectContaining({
                event: OrderState.CREATE,
                eventId: 1,
                payload: payloads['createOrderPayload'],
            }),
        ]);
        expect(appendEventMock).toHaveBeenNthCalledWith(
            1,
            '1',
            [
                expect.objectContaining({
                    event: OrderState.CREATE,
                    eventId: 1,
                    payload: {},
                }),
                expect.objectContaining({
                    event: OrderState.ADD_LINE,
                    eventId: 2,
                    payload: payloads['addLine1Payload'],
                }),
            ],
            2
        );
        expect(appendEventMock).toHaveBeenNthCalledWith(
            2,
            '2',
            [
                expect.objectContaining({
                    event: OrderState.CREATE,
                    eventId: 1,
                    payload: {},
                }),
                expect.objectContaining({
                    event: OrderState.ADD_LINE,
                    eventId: 2,
                    payload: payloads['addLine3Payload'],
                }),
            ],
            2
        );
    });

    it('When subscribed to an event store, the callback function is called everytime an event is appended', async () => {
        // Arrange
        const orderEventRepository = new OrderEventRepository();
        const orderEventStore = new EventStore<
            OrderState,
            OrderEvents,
            OrderEventRepository
        >(orderEventRepository);

        const subscriptionMethod1 = jest.fn();
        const subscriptionMethod2 = jest.fn();

        orderEventStore.subscribe(subscriptionMethod1);
        orderEventStore.subscribe(subscriptionMethod2);

        // Act
        getMock = jest.fn().mockResolvedValue(null);
        await orderEventStore.appendEvent(
            '1',
            OrderState.CREATE,
            payloads['createOrderPayload']
        );
        getMock = jest.fn().mockResolvedValue({
            id: '1',
            eventLog: [
                {
                    event: 'CREATE_ORDER',
                    eventId: 1,
                    timestamp: 1671690332882,
                    payload: {},
                },
            ],
            currentEvent: 1,
        });
        await orderEventStore.appendEvent(
            '1',
            OrderState.ADD_LINE,
            payloads['addLine1Payload']
        );
        await orderEventStore.appendEvent(
            '1',
            OrderState.ADD_LINE,
            payloads['addLine2Payload']
        );

        // Assert
        expect(subscriptionMethod1).toHaveBeenNthCalledWith(
            1,
            '1',
            OrderState.CREATE,
            payloads['createOrderPayload']
        );

        expect(subscriptionMethod1).toHaveBeenNthCalledWith(
            2,
            '1',
            OrderState.ADD_LINE,
            payloads['addLine1Payload']
        );
        expect(subscriptionMethod1).toHaveBeenNthCalledWith(
            3,
            '1',
            OrderState.ADD_LINE,
            payloads['addLine2Payload']
        );
        expect(subscriptionMethod2).toHaveBeenNthCalledWith(
            1,
            '1',
            OrderState.CREATE,
            payloads['createOrderPayload']
        );
        expect(subscriptionMethod2).toHaveBeenNthCalledWith(
            2,
            '1',
            OrderState.ADD_LINE,
            payloads['addLine1Payload']
        );
        expect(subscriptionMethod2).toHaveBeenNthCalledWith(
            3,
            '1',
            OrderState.ADD_LINE,
            payloads['addLine2Payload']
        );
    });
});
