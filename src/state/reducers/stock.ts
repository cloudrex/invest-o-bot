import {Reducer, IStoreAction} from "@cloudrex/forge";
import {IState, StoreActionType, CompanyMap, ICompany} from "../store";

const StockReducer: Reducer<IState> = (action: IStoreAction<any>, state?: IState): IState | null => {
    if (action.type === StoreActionType.ChangeStockPrice) {
        if (state === undefined) {
            return null;
        }

        // TODO: Throws error on .clone()
        const companies: CompanyMap = state.companies;
        const company: ICompany = companies.get(action.payload.acronym) as ICompany;

        const newCompany: ICompany = {
            ...company,
            price: company.price + action.payload.change
        };

        companies.set(action.payload.acronym, newCompany);

        return {
            companies
        };
    }

    return null;
};

export default StockReducer;