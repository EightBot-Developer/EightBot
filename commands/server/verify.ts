import { Command, ChatInputCommand } from "@sapphire/framework";

export class PingCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, { ...options });
  }

  public override registerApplicationCommands(
    registry: ChatInputCommand.Registry
  ) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName("verify")
        .setDescription("Returns the current Ping value of the bot.")
        .setDescriptionLocalizations({
          ja: "Botの現在のPing値を返します。",
          "en-US": "Returns the current Ping value of the bot.",
        })
    );
  }

  public async chatInputRun(interaction: Command.ChatInputInteraction) {}
}