import fs from "fs";
import {Log, Utils} from "@cloudrex/forge";
import {ICompany} from "../state/store";
import {Actions} from "./actions";

const CompaniesFile: string = "data/companies.json";

export default abstract class GameCore {
    public static async loadCompanies(): Promise<void> {
        Log.verbose("Loading company data");

        if (!fs.existsSync(CompaniesFile)) {
            Log.fatal("Expecting companies file to exist");

            return;
        }

        const companies: ICompany[] = await Utils.readJson(CompaniesFile);

        for (const company of companies) {
            Actions.addCompany(company);
        }

        Log.success("Finished loading company data");
    }
}
