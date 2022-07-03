export const INITIAL_STATE = 'INITIAL_STATE';
export const FINAL_STATE = 'FINAL_STATE';

export type StateMachinePlan<M> = {
    // TODO: strict typing for the key
    [state: string]: {
        fromStates: M[] | typeof INITIAL_STATE;
        toStates: M[] | typeof FINAL_STATE;
    };
};
