import {
    FINAL_STATE,
    INITIAL_STATE,
    StateMachinePlan,
} from '../../common/types';
import { TaskState } from './task';

/**
 * The State Machine for Task instances.
 * Defines all possible state transitions.
 */
const TaskStateMachine: StateMachinePlan<TaskState> = {
    [TaskState.Planned]: {
        fromStates: INITIAL_STATE,
        toStates: [TaskState.InProgress, TaskState.Abandoned],
    },
    [TaskState.InProgress]: {
        fromStates: [TaskState.Planned, TaskState.Paused],
        toStates: [TaskState.Completed, TaskState.Paused, TaskState.Abandoned],
    },
    [TaskState.Paused]: {
        fromStates: [TaskState.InProgress],
        toStates: [TaskState.InProgress, TaskState.Abandoned],
    },
    [TaskState.Completed]: {
        fromStates: [TaskState.InProgress],
        toStates: FINAL_STATE,
    },
    [TaskState.Abandoned]: {
        fromStates: [TaskState.Planned, TaskState.InProgress, TaskState.Paused],
        toStates: FINAL_STATE,
    },
};

/**
 * Validate a state transistion for a Task instance.
 * Throws an error if the state transition is invaid.
 *
 * @param fromState
 * @param toState
 * @throws Error
 */
export const validateStateTransition = (
    fromState: TaskState,
    toState: TaskState
): void => {
    if (!TaskStateMachine[fromState].toStates.includes(toState)) {
        throw new Error(
            `State transition from [${fromState}] to [${toState}] is not allowed.`
        );
    }
};
