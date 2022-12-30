import { Command, ChatInputCommand } from "@sapphire/framework";
import totsuzen from "totsuzen-text";
export class Totsuzen extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, { ...options });
  }

  public override registerApplicationCommands(
    registry: ChatInputCommand.Registry
  ) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName("totuzen")
        .setDescription("突然の死を生成します。")
        .addStringOption((input) =>
          input.setName("テキスト").setDescription("テキスト").setRequired(true)
        )
    );
  }

  public async chatInputRun(interaction: Command.ChatInputInteraction) {
    await interaction.reply(
      totsuzen(interaction.options.getString("テキスト") || "")
    );
  }
}
