import {Command, Context, MsgBuilder} from "@cloudrex/forge";

interface Args {
    readonly company: string;
}

export default class LatestCommand extends Command {
    readonly meta = {
        name: "latest",
        description: "View the latest changes in stocks"
    };

    readonly constraints: any = {
        cooldown: 3
    };

    public async run(x: Context, args: Args): Promise<void> {
        x.ok(new MsgBuilder().block())
    }
};