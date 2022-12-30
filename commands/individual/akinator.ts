import { Command, ChatInputCommand } from "@sapphire/framework";
import akinator from "discord.js-akinator";
export class Akinator extends Command {
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
    );
  }

  public async chatInputRun(interaction: Command.ChatInputInteraction) {
    if (!interaction.guild)
      return await interaction.reply({
        content: "DMではアキネーターをプレイできません。",
        ephemeral: true,
      });
    akinator(interaction, {
      language: "ja",
      childMode: false,
      gameType: "character",
      useButtons: true,
      embedColor: "#3498db",
    });
  }
}
