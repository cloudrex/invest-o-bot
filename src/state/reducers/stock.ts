import {Reducer, IStoreAction} from "@cloudrex/forge";
import {IState, StoreActionType, CompanyMap, ICompany} from "../store";

const StockReducer: Reducer<IState> = (action: IStoreAction<any>, state?: IState): IState | null => {
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

        companies.set(action.payload.acronym, newCompany);

        return {
            companies
        };
    }

    return null;
};

export default StockReducer;