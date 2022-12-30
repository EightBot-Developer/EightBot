import { isMessageInstance } from "@sapphire/discord.js-utilities";
import { Command, ChatInputCommand } from "@sapphire/framework";
import { MessageEmbed } from "discord.js";
export class Ping extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, { ...options });
  }

  public override registerApplicationCommands(
    registry: ChatInputCommand.Registry
  ) {
    registry.registerChatInputCommand((builder) =>
      builder.setName("ping").setDescription("Botの現在のPing値を返します。")
    );
  }

  public async chatInputRun(interaction: Command.ChatInputInteraction) {
    const msg = await interaction.reply({
      embeds: [
        new MessageEmbed().setDescription("**Ping?**").setColor(0x3498db),
      ],
      ephemeral: true,
      fetchReply: true,
    });

    if (isMessageInstance(msg)) {
      const diff = msg.createdTimestamp - interaction.createdTimestamp;
      const ping = Math.round(this.container.client.ws.ping);
      return interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setDescription("**Pong 🏓!**")
            .setColor(0x3498db)
            .addFields(
              {
                name: "往復でかかった時間",
                value: `${diff / 1000}秒(${diff}ミリ秒)`,
              },
              { name: "ハートビート", value: `${ping / 1000}秒(${ping}ミリ秒)` }
            ),
        ],
      });
    }

    return interaction.editReply({
      embeds: [
        new MessageEmbed()
          .setDescription("**Pingの取得に失敗しました。**")
          .setColor(0x3498db),
      ],
    });
  }
}
