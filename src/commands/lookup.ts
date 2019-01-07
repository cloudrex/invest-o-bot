import {Command, Context, IArgument, TrivialArgType} from "@cloudrex/forge";

interface Args {
    readonly company: string;
}

export default class LookupCommand extends Command {
    readonly meta = {
        name: "lookup",
        description: "View stock information of a company"
    };

    readonly aliases: string[] = ["look", "stock"];

    readonly constraints: any = {
        cooldown: 3
    };

    readonly arguments: IArgument[] = [
        {
            name: "company",
            description: "The company to lookup",
            required: true,
            type: TrivialArgType.String
        }
    ];

    public async run(x: Context, args: Args): Promise<void> {
        if (args.company.length < 2 || args.company.length > 4) {
            x.fail("Acronyms consist of 2-4 characters");

            return;
        }

        x.fail("That company doesn't exist! Verify your acronym");
    }
};