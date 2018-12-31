import {Command, Context, IArgument, TrivialArgType} from "@cloudrex/forge";

interface ILookupArgs {
    readonly company: string;
}

export default class LookupCommand extends Command {
    readonly meta = {
        name: "hello",
        description: "Say hello world"
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

    public async run(context: Context, args: ILookupArgs): Promise<void> {
        if (args.company.length < 2 || args.company.length > 4) {
            context.fail("Acronyms consist of 2-4 characters");

            return;
        }

        context.fail("That company doesn't exist! Verify your acronym");
    }
};