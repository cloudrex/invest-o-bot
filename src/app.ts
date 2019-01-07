// Environment Variables (defined in .env)
require("dotenv").config();

import path from "path";
import fs from "fs";
import {StoreActionType, IState, InitialState} from "./state/store";
import {Bot, Settings, Log, LogLevel, Store} from "@cloudrex/forge";
import GameCore from "./core/game-core";
import StockReducer from "./state/reducers/stock";
import CompanyReducer from "./state/reducers/company";
import {Env} from "./core/defs";

// Verify that .env file exists (bot configuration)
if (!fs.existsSync(".env")) {
    console.log("Hold up! Your bot isn't configured. Run 'npm run config' to configure it. Alternatively, you can configure the .env file manually.");
    process.exit(0);
}

// Useful for debugging
Log.level = LogLevel.Debug;
Log.hiddenItems = true;

const env: Env = process.env as Env;

const bot: Bot = new Bot<IState, StoreActionType>({
    settings: new Settings({
        general: {
            prefix: [env.PREFIX],
            token: env.TOKEN,
        },

        paths: {
            commands: path.join(__dirname, env.COMMANDS_DIR),
            services: path.join(__dirname, env.SERVICES_DIR),
            tasks: path.join(__dirname, env.TASKS_DIR)
        }
    }),

    initialState: InitialState,
    owner: env.OWNER_ID
});

// Export store as a global
export const store: Store = bot.store;

// Register reducers
bot.store.addReducer(Store.mergeReducers(
    StockReducer,
    CompanyReducer
));

// Load companies
GameCore.loadCompanies()
    // Then connect the bot
    .then(bot.connect.bind(bot));