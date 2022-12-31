import { Command, ChatInputCommand } from "@sapphire/framework";
import { MessageEmbed } from "discord.js";
export class help extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, { ...options });
  }

  public override registerApplicationCommands(
    registry: ChatInputCommand.Registry
  ) {
    registry.registerChatInputCommand((builder) =>
      builder.setName("help").setDescription("Botのヘルプを表示します。")
    );
  }

  public async chatInputRun(interaction: Command.ChatInputInteraction) {
    const app =
      this.container.client.application?.commands?.cache?.map(
        (appcmd) => appcmd
      ) || [];
    const embed = new MessageEmbed();
    embed.setTitle("EightBotヘルプ").setColor(0x3498db);
    let num: number = 0;
    for (const cmd of app) {
      num = num + 1;
      embed.addFields({
        name: cmd.name,
        value: cmd.description || "説明はありません。",
      });
    }
    await interaction.reply({ embeds: [embed] });
  }
}
