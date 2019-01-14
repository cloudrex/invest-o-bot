import {Command, Context, MsgBuilder, Name, Description, Constraint} from "@cloudrex/forge";
import {Aliases} from "@cloudrex/forge/dist/decorators/general";

@Name("news")
@Description("Stay informed of the latest news")
@Aliases("feed")
@Constraint.Cooldown(3)
export default class NewsCommand extends Command {
    public async run(x: Context): Promise<void> {
        await x.ok(new MsgBuilder()
            .add("The latest news are:")
            .block()
            .add("There are no recent news yet. Come check back later!")
            .block()
        );
    }
};
