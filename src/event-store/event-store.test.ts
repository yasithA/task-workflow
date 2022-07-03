import { EventStore } from './event-store';

describe('event-store', () => {
    enum OrderState {
        CREATE = 'CREATE_ORDER',
        ADD_LINE = 'ADD_LINE',
        REMOVE_LINE = 'REMOVE_LINE',
        CONFIRM = 'CONFIRM',
        CANCEL = 'CANCEL',
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

    it('When an event is appended with a payload, it is added to event log of the event store', () => {
        // Arrange
        const orderEventStore = new EventStore<OrderState>();

        // Act
        orderEventStore.appendEvent(
            '1',
            OrderState.CREATE,
            payloads['createOrderPayload']
        );
        orderEventStore.appendEvent(
            '1',
            OrderState.ADD_LINE,
            payloads['addLine1Payload']
        );
        orderEventStore.appendEvent(
            '1',
            OrderState.ADD_LINE,
            payloads['addLine2Payload']
        );
        orderEventStore.appendEvent(
            '1',
            OrderState.ADD_LINE,
            payloads['addLine3Payload']
        );
        orderEventStore.appendEvent(
            '1',
            OrderState.REMOVE_LINE,
            payloads['removeLinePayload']
        );

        // Assert
        const allEvents = orderEventStore.getAllEventsByEntityId('1');
        expect(allEvents).toHaveLength(5);
        expect(allEvents.map((event) => event.event)).toStrictEqual([
            OrderState.CREATE,
            OrderState.ADD_LINE,
            OrderState.ADD_LINE,
            OrderState.ADD_LINE,
            OrderState.REMOVE_LINE,
        ]);
    });

    it('When a new domain instance is added to an existing event store, the domain events gets appended to the respective event log', () => {
        // Arrange
        const orderEventStore = new EventStore<OrderState>();

        // Act
        // Domain instance 1
        orderEventStore.appendEvent(
            '1',
            OrderState.CREATE,
            payloads['createOrderPayload']
        );
        orderEventStore.appendEvent(
            '1',
            OrderState.ADD_LINE,
            payloads['addLine1Payload']
        );

        // Domain instance 2
        orderEventStore.appendEvent(
            '2',
            OrderState.CREATE,
            payloads['createOrderPayload']
        );
        orderEventStore.appendEvent(
            '2',
            OrderState.ADD_LINE,
            payloads['addLine3Payload']
        );

        // Assert
        const allEvents = orderEventStore.getAllEventsByEntityId('2');
        expect(allEvents).toHaveLength(2);
        expect(allEvents.map((event) => event.event)).toStrictEqual([
            OrderState.CREATE,
            OrderState.ADD_LINE,
        ]);
    });

    it('When subscribed to an event store, the callback function is called everytime an event is appended', () => {
        // Arrange
        const orderEventStore = new EventStore<OrderState>();
        const subscriptionMethod1 = jest
            .fn()
            .mockImplementation(
                (
                    entityId: string,
                    event: OrderState,
                    payload?: Record<string, unknown>
                ) => {
                    null;
                }
            );
        const subscriptionMethod2 = jest
            .fn()
            .mockImplementation(
                (
                    entityId: string,
                    event: OrderState,
                    payload?: Record<string, unknown>
                ) => {
                    null;
                }
            );
        orderEventStore.subscribe(subscriptionMethod1);
        orderEventStore.subscribe(subscriptionMethod2);

        // Act
        orderEventStore.appendEvent(
            '1',
            OrderState.CREATE,
            payloads['createOrderPayload']
        );
        orderEventStore.appendEvent(
            '1',
            OrderState.ADD_LINE,
            payloads['addLine1Payload']
        );
        orderEventStore.appendEvent(
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
