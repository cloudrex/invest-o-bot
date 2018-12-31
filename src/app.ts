// Environment Variables (defined in .env)
require("dotenv").config();

import path from "path";
import fs from "fs";
import {StoreActionType, StockReducer, IState, InitialState} from "./store";
import {Bot, Settings, Log, LogLevel} from "@cloudrex/forge";

// Verify that .env file exists (bot configuration)
if (!fs.existsSync(".env")) {
    console.log("Hold up! Your bot isn't configured. Run 'npm run config' to configure it. Alternatively, you can configure the .env file manually.");
    process.exit(0);
}

Log.level = LogLevel.Debug;
Log.hiddenItems = true;

async function init(): Promise<void> {
    // TODO: Export store as a global
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

    // Register reducers
    bot.store.addReducer(StockReducer);

    // Connect and start the bot
    await bot.connect();
}

init();
