export enum ActionType {
    create,
    delete,
    update
}

export interface IAction<P = any> {
    type: ActionType;
    payload?: P;
}