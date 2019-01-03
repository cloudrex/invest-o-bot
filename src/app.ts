// Environment Variables (defined in .env)
require("dotenv").config();

import path from "path";
import fs from "fs";
import {StoreActionType, IState, InitialState} from "./state/store";
import {Bot, Settings, Log, LogLevel, Store} from "@cloudrex/forge";
import GameCore from "./core/game-core";
import StockReducer from "./state/reducers/stock";
import CompanyReducer from "./state/reducers/company";

// Verify that .env file exists (bot configuration)
if (!fs.existsSync(".env")) {
    console.log("Hold up! Your bot isn't configured. Run 'npm run config' to configure it. Alternatively, you can configure the .env file manually.");
    process.exit(0);
}

// Useful for debugging
Log.level = LogLevel.Debug;
Log.hiddenItems = true;

const bot: Bot = new Bot<IState, StoreActionType>({
    settings: new Settings({
        general: {
            prefixes: [process.env.PREFIX] as string[],
            token: process.env.TOKEN as string,
        },

        paths: {
            commands: path.join(__dirname, process.env.COMMANDS_DIR as string),
            services: path.join(__dirname, process.env.SERVICES_DIR as string),
            tasks: path.join(__dirname, process.env.TASKS_DIR as string)
        }
    }),

    initialState: InitialState,
    owner: process.env.OWNER_ID
});

// Export store as a global
export const store = bot.store;

// Register reducers
bot.store.addReducer(Store.mergeReducers(
    StockReducer,
    CompanyReducer
));

// Load companies
GameCore.loadCompanies(bot.store)
    // Then connect the bot
    .then(bot.connect);