import { isMessageInstance } from "@sapphire/discord.js-utilities";
import { Command, ChatInputCommand } from "@sapphire/framework";
import { MessageEmbed } from "discord.js";
export class PingCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, { ...options });
  }

  public override registerApplicationCommands(
    registry: ChatInputCommand.Registry
  ) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName("5000")
        .setDescription("5000兆円ほしいを生成します。")
        .addStringOption((option) =>
          option.setName("top").setDescription("上部文字列").setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("bottom")
            .setDescription("下部文字列")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("type")
            .setDescription("画像の拡張子")
            .setChoices(
              { name: "png(お勧め)", value: "png" },
              { name: "jpg", value: "jpg" },
              { name: "webp", value: "webp" }
            )
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("quality")
            .setDescription("画像の画質")
            .setChoices(
              { name: "低", value: "30" },
              { name: "中", value: "70" },
              { name: "高", value: "100" }
            )
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("hoshii")
            .setDescription("下部文字列を「欲しい！」に固定する")
            .setChoices(
              { name: "固定する", value: "true" },
              { name: "固定しない", value: "false" }
            )
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("noalpha")
            .setDescription("背景色を白にする")
            .setChoices(
              { name: "白にする", value: "true" },
              { name: "白にしない", value: "false" }
            )
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("rainbow")
            .setDescription("虹色にする")
            .setChoices(
              { name: "虹色にする", value: "true" },
              { name: "虹色にしない", value: "false" }
            )
            .setRequired(true)
        )
    );
  }

  public async chatInputRun(interaction: Command.ChatInputInteraction) {
    const op = interaction.options;
    await interaction.reply({
      embeds: [
        new MessageEmbed()
          .setImage(
            encodeURI(
              `https://gsapi.cbrx.io/image?top=${op.getString(
                "top"
              )}&bottom=${op.getString("bottom")}&type=${op.getString(
                "type"
              )}&quality=${op.getString("quality")}&hoshii=${op.getString(
                "hoshii"
              )}&noalpha=${op.getString("noalpha")}&rainbow=${op.getString(
                "rainbow"
              )}`
            )
          )
          .setTitle("5000兆円ほしい!!")
          .setFooter({ text: "5000choyen-apiで生成しています。" })
          .setColor(0x3498db),
      ],
    });
  }
}
