import {Command, Context, MsgBuilder} from "@cloudrex/forge";

export default class LatestCommand extends Command {
    readonly meta = {
        name: "latest",
        description: "View the latest changes in stocks"
    };

    readonly constraints: any = {
        cooldown: 3
    };

    public async run(x: Context): Promise<void> {
        // TODO
        await x.send(new MsgBuilder()
            .block("diff")
            .addLine("+ 🡑 0.04% | MSFT (Microsoft)")
            .addLine("+ 🡑 0.06% | APPL (Apple)")
            .addLine("+ = 0.00% | ORCL (Oracle Corp.)")
            .addLine("- 🡓 0.40% | ORCL (Oracle Corp.)")
            .block()
            .build()
        );
    }
};