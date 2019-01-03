import {Acronym, StoreActionType, IState, ICompany} from "../state/store";
import {store} from "../app";
import {Log} from "@cloudrex/forge";

export abstract class Actions {
    public static changeStockPrice(name: Acronym, change: number): void {
        if (typeof name !== "string" || typeof change !== "number") {
            throw Log.error("Invalid parameters where provided");
        }
        // Company must exist
        else if (!(store.getState() as IState).companies.has(name)) {
            throw Log.error("Company does not exist");
        }

        store.dispatch(StoreActionType.ChangeStockPrice, {
            acronym: name,
            change: change
        });
    }

    public static addCompany(company: ICompany): void {
        if (typeof company !== "object") {
            throw Log.error("Expecting company parameter to be an object");
        }

        store.dispatch(StoreActionType.AddCompany, company);
    }
}