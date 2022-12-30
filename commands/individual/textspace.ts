import { Command, ChatInputCommand } from "@sapphire/framework";
export class TextSpace extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, { ...options });
  }

  public override registerApplicationCommands(
    registry: ChatInputCommand.Registry
  ) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName("textspace")
        .setDescription("テキストの間に空白を入れます。")
        .addStringOption((input) =>
          input
            .setName("テキスト")
            .setDescription("空白を入れるテキスト")
            .setRequired(true)
        )
    );
  }

  public async chatInputRun(interaction: Command.ChatInputInteraction) {
    const op = interaction.options.getString("テキスト") || "";
    let result = op.split("");
    let newText = "";

    for (let i = 0; i < result.length; i++) {
      newText += result[i] + "　";
    }
    await interaction.reply(newText);
  }
}
