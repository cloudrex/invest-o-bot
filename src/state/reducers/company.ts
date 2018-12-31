import {Reducer, IStoreAction} from "@cloudrex/forge";
import {IState, StoreActionType, ICompany, CompanyMap} from "../store";

const CompanyReducer: Reducer<IState> = (action: IStoreAction, state?: IState): IState | null => {
    if (state === undefined) {
        return null;
    }

    switch (action.type) {
        case StoreActionType.AddCompany: {
            const company: ICompany = action.payload;
            const companies: CompanyMap = (state.companies.clone() as CompanyMap);

            companies.set(company.acronym, company);

            return {
                ...state,
                companies
            };

            break;
        }
    }

    return null;
};

export default CompanyReducer;