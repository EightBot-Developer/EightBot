import { isMessageInstance } from "@sapphire/discord.js-utilities";
import { Command, ChatInputCommand } from "@sapphire/framework";
import { MessageEmbed } from "discord.js";
import akinator from "discord.js-akinator";
export class PingCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, { ...options });
  }

  public override registerApplicationCommands(
    registry: ChatInputCommand.Registry
  ) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName("akinator")
        .setDescription("アキネーターをプレイすることができます。")
        .addStringOption((option) =>
          option
            .setName("")
            .setDescription("選択肢の数を入力してください。")
            .setRequired(true)
        )
    );
  }

  public async chatInputRun(interaction: Command.ChatInputInteraction) {
    akinator(interaction, {
      language: "ja",
      childMode: false,
      gameType: "character",
      useButtons: true,
      embedColor: "#3498db",
    });
  }
}
