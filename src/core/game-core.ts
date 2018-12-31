import fs from "fs";
import {Log, Store, Utils} from "@cloudrex/forge";
import {ICompany, StoreActionType} from "../state/store";

const CompaniesFile: string = "data/companies.json";

export default abstract class GameCore {
    public static async loadCompanies(store: Store): Promise<void> {
        Log.verbose("[App] Loading company data");

        if (!fs.existsSync(CompaniesFile)) {
            Log.fatal("[App] Expecting companies file to exist");

            return;
        }

        const companies: ICompany[] = await Utils.readJson(CompaniesFile);

        for (const company of companies) {
            store.dispatch(StoreActionType.AddCompany, company);
        }

        Log.success("[App] Finished loading company data");
    }
}