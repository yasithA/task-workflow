export const INITIAL_STATE = 'INITIAL_STATE';
export const FINAL_STATE = 'FINAL_STATE';

export type StateMachinePlan<M> = {
    [key in keyof M]: {
        fromStates: M[keyof M][] | typeof INITIAL_STATE;
        toStates: M[keyof M][] | typeof FINAL_STATE;
    };
};
