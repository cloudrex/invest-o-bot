import {Reducer, IStoreAction} from "@cloudrex/forge";
import {Dictionary} from "@atlas/xlib";

export enum StoreActionType {
    ChangeStockPrice
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

export const StockReducer: Reducer<IState> = (action: IStoreAction<any>, state?: IState): IState | null => {
    if (action.type === StoreActionType.ChangeStockPrice) {
        if (state === undefined) {
            return null;
        }
        
        // TODO: Fix clone error, hot-fixed with (as any)
        const companies: CompanyMap = (state.companies.clone() as any);
        const company: ICompany = companies.get(action.payload.acronym) as ICompany;

        const newCompany: ICompany = {
            ...company,
            price: action.payload.change
        };

        companies.set(company.acronym, newCompany);

        return {
            companies
        };
    }

    return null;
};