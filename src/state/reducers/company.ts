import {Reducer, IStoreAction, Log} from "@cloudrex/forge";
import {IState, StoreActionType, ICompany, CompanyMap} from "../store";

const CompanyReducer: Reducer<IState> = (action: IStoreAction, state?: IState): IState | null => {
    if (state === undefined) {
        return null;
    }

    switch (action.type) {
        case StoreActionType.AddCompany: {
            const company: ICompany = action.payload;

            // TODO: .clone() throws error
            const companies: CompanyMap = state.companies;

            companies.set(company.acronym, company);

            return {
                ...state,
                companies
            };
        }
    }

    return null;
};

export default CompanyReducer;