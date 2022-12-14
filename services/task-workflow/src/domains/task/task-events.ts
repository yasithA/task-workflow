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
