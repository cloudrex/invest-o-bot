import {Command, Context, IArgument, TrivialArgType, Name, Description, Constraint} from "@cloudrex/forge";
import {Aliases, Arguments} from "@cloudrex/forge/dist/decorators/general";

interface IArgs {
    readonly company: string;
}

@Name("lookup")
@Description("View stock information of a company")
@Aliases("look", "stock")
@Constraint.Cooldown(3)
@Arguments(
    {
        name: "company",
        description: "The company to lookup",
        required: true,
        type: TrivialArgType.String
    }
)
export default class LookupCommand extends Command {
    public async run(x: Context, args: IArgs): Promise<void> {
        if (args.company.length < 2 || args.company.length > 4) {
            await x.fail("Acronyms consist of 2-4 characters");

            return;
        }

        await x.fail("That company doesn't exist! Verify your acronym");
    }
};
