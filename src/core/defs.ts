import {Snowflake} from "discord.js";
import {BotToken} from "@cloudrex/forge/dist/core/bot-extra";

export type Env = {
    readonly PREFIX: string;
    readonly TOKEN: BotToken;
    readonly COMMANDS_DIR: string;
    readonly SERVICES_DIR: string;
    readonly TASKS_DIR: string;
    readonly OWNER_ID: Snowflake;
};