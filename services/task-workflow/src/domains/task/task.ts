/**
 * All domain events related to Task.
 */
export enum TaskEvents {
    Create = 'Create',
    MoveToInProgress = 'MoveToInProgress',
    MoveToCompleted = 'MoveToCompleted',
    MoveToPaused = 'MoveToPaused',
    Abandon = 'Abandon',
}

/**
 * All states an instance of a Task may have.
 */
export enum TaskState {
    Planned = 'Planned',
    InProgress = 'InProgress',
    Completed = 'Completed',
    Paused = 'Paused',
    Abandoned = 'Abandoned',
}

/**
 * Represents the structure of Task.
 */
export interface Task {
    id: string;
    name: string;
    description: string;
    state: TaskState;
    comment?: string;
}
