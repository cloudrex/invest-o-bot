import {Reducer, IStoreAction} from "@cloudrex/forge";

export enum StoreActionType {
    LogCommand
}

export interface ICommandLog {
    readonly command: string;
    readonly user: string;
    readonly time: number;
}

export interface IState {
    readonly commandLogs: ICommandLog[];
}

// Our log reducer, responsible for updating the state upon dispatched actions
export const LogReducer: Reducer<IState> = (action: IStoreAction<ICommandLog | any>, state?: IState): IState | null => {
    if (action.type === StoreActionType.LogCommand) {
        if (state === undefined) {
            return {
                commandLogs: [action.payload]
            } as any;
        }
        else {
            return {
                ...state,
                commandLogs: [...(state as any).commandLogs, action.payload]
            } as any;
        }
    }

    return null;
};