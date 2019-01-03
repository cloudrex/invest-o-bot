import {Task, IFragmentMeta, Log, Utils} from "@cloudrex/forge";
import {Actions} from "../core/actions";

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

        // TODO
        if (Utils.getRandomInt(0, NewsWorker.chance) === 0) {
            Log.verbose("Updating stock...");
            Actions.changeStockPrice("MSFT", Utils.getRandomInt(1, 5));
        }
    }
}