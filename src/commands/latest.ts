import {Command, Context, MsgBuilder, Name, Description, Constraint} from "@cloudrex/forge";

@Name("latest")
@Description("View the latest changes in stocks")
@Constraint.Cooldown(3)
export default class LatestCommand extends Command {
    public async run(x: Context): Promise<void> {
        // TODO
        await x.send(new MsgBuilder()
            .block("diff")
            .add("+ 🡑 0.04% | MSFT (Microsoft)")
            .add("+ 🡑 0.06% | APPL (Apple)")
            .add("+ = 0.00% | ORCL (Oracle Corp.)")
            .add("- 🡓 0.40% | ORCL (Oracle Corp.)")
            .block()
            .build());
    }
};
