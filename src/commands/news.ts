import {Command, Context, MsgBuilder} from "@cloudrex/forge";

export default class NewsCommand extends Command {
    readonly meta = {
        name: "news",
        description: "Stay informed of the latest news"
    };

    readonly aliases: string[] = ["latest", "feed"];

    readonly constraints: any = {
        cooldown: 3
    };

    public async run(x: Context): Promise<void> {
        x.ok(new MsgBuilder()
            .addLine("The latest news are:")
            .block()
            .add("There are no recent news yet. Come check back later!")
            .block()
        );
    }
};