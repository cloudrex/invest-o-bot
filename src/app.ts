// Environment Variables (defined in .env)
require("dotenv").config();

import path from "path";
import fs from "fs";
import {StoreActionType, LogReducer, IState} from "./store";
import {Bot, Settings, Command, Context, Log} from "@cloudrex/forge";
import {EBotEvents} from "@cloudrex/forge/dist/core/bot-extra";

// Verify that .env file exists (bot configuration)
if (!fs.existsSync(".env")) {
    console.log("Hold up! Your bot isn't configured. Run 'npm run config' to configure it. Alternatively, you can configure the .env file manually.");
    process.exit(0);
}

async function init(): Promise<void> {
    const bot: Bot = new Bot<IState, StoreActionType>({
        settings: new Settings({
            general: {
                prefixes: [process.env.PREFIX] as string[],
                token: process.env.TOKEN as string,
            },

            paths: {
                commands: path.join(__dirname, process.env.COMMANDS_DIR as string),
                services: path.join(__dirname, process.env.SERVICES_DIR as string)
            }
        }),

        owner: process.env.OWNER_ID
    });

    // Connect and start the bot
    await bot.connect();

    // BONUS: Log commands using the store
    bot.store.addReducer(LogReducer);

    // Dispatch log event upon command execution
    bot.on(EBotEvents.CommandExecuted, (command: Command, context: Context) => {
        bot.store.dispatch(StoreActionType.LogCommand, {
            command: command.meta.name,
            user: context.sender.tag,
            time: Date.now()
        });

        Log.info(`Command '${command.meta.name}' was executed by '${context.sender.tag}'`);
    });
}

init();
