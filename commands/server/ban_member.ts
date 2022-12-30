import { Command, ChatInputCommand } from "@sapphire/framework";
import { MessageEmbed } from "discord.js";

export class BanMember extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, { ...options });
  }

  public override registerApplicationCommands(
    registry: ChatInputCommand.Registry
  ) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName("ban_member")
        .setDescription("Banされたメンバー一覧を表示します。")
    );
  }

  public async chatInputRun(interaction: Command.ChatInputInteraction) {
    if (interaction.guild) {
      const bans = await interaction.guild.bans.fetch();
      const str =
        bans.map((ban) => ban.user.tag).join(", ") ||
        "Banされたユーザーがいません。";
      if (str.length > 4096) {
        const str2 = str.substring(4096, str.length);
        await interaction.reply({
          embeds: [
            new MessageEmbed()
              .setTitle("Banされたユーザー一覧")
              .setDescription(str)
              .setColor(0x3498db),
            new MessageEmbed()
              .setTitle("Banされたユーザー一覧")
              .setDescription(str2)
              .setColor(0x3498db),
          ],
        });
      } else {
        await interaction.reply({
          embeds: [
            new MessageEmbed()
              .setTitle("Banされたユーザー一覧")
              .setDescription(str)
              .setColor(0x3498db),
          ],
        });
      }
    } else {
      await interaction.reply({
        content: "ここはサーバーではありません。",
        ephemeral: true,
      });
    }
  }
}
