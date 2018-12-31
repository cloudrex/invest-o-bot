import {Task, IFragmentMeta, Log, Utils} from "@cloudrex/forge";
import {StoreActionType} from "../state/store";

export default class NewsWorker extends Task {
    public static chance: number = 1;

    readonly meta: IFragmentMeta = {
        name: "news-worker",
        description: "Responsible for dispatching news and updating stocks accordingly"
    };

    // Every 1 minute
    readonly interval: number = 0.3 * 60_000;

    public run(): void {
        Log.verbose("[NewsWorker] Running news worker");

        if (Utils.getRandomInt(0, NewsWorker.chance) === 0) {
            Log.verbose("Updating stock...");

            this.bot.store.dispatch(StoreActionType.ChangeStockPrice, {
                acronym: "MSFT",
                change: Utils.getRandomInt(1, 5)
            });
        }
    }
}