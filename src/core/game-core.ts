import {Log, Store} from "@cloudrex/forge";
import {FileHandle, System} from "@atlas/xlib";
import {ICompany, StoreActionType} from "../state/store";

export default abstract class GameCore {
    public static async loadCompanies(store: Store): Promise<void> {
        Log.verbose("[App] Loading company data");

        const companiesFile: FileHandle | null = System.open("data/companies.json");

        if (companiesFile === null) {
            throw Log.fatal("[App] Expecting companies data file to exist");
        }

        const companies: ICompany[] = await companiesFile.readAllAsJson();

        for (const company of companies) {
            store.dispatch(StoreActionType.AddCompany, company);
        }
    }
}