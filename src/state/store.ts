import {Reducer, IStoreAction} from "@cloudrex/forge";
import {Dictionary} from "@atlas/xlib";

export enum StoreActionType {
    ChangeStockPrice,
    AddCompany
}

export interface ICompany {
    readonly name: string;
    readonly acronym: string;
    readonly price: number;
}

export type Acronym = string;

export type CompanyMap = Dictionary<Acronym, ICompany>;

export interface IState {
    readonly companies: CompanyMap;
}

export const InitialState: IState = {
    companies: new Dictionary()
};