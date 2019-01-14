import {Command, Context, Name, Description, Constraint} from "@cloudrex/forge";

@Name("template")
@Description("template")
@Constraint.Cooldown(3)
export default class TemplateCommand extends Command {
    public async run(x: Context): Promise<void> {
        //
    }
};
