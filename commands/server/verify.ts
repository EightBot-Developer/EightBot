import { Command, ChatInputCommand } from "@sapphire/framework";
import { MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import Keyv from "keyv";
export class Verify extends Command {
  verify: Keyv;
  verify2: Keyv;
  verify3: Keyv;
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, { ...options });
    this.verify = new Keyv("sqlite://db/verify.sqlite", { table: "type1" });
    this.verify.on("error", (e) => this.container.logger.info(e));
    this.verify2 = new Keyv("sqlite://db/verify.sqlite", { table: "type2" });
    this.verify2.on("error", (e) => this.container.logger.info(e));
    this.verify3 = new Keyv("sqlite://db/verify.sqlite", { table: "type3" });
    this.verify3.on("error", (e) => this.container.logger.info(e));
  }

  public override registerApplicationCommands(
    registry: ChatInputCommand.Registry
  ) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName("verify")
        .setDescription("認証を生成します。")
        .addStringOption((input) =>
          input
            .addChoices(
              { name: "1クリック認証", value: "1" },
              { name: "数字認証", value: "2" },
              { name: "足し算認証", value: "3" }
            )
            .setRequired(true)
            .setName("type")
            .setDescription("何の認証方式にするか。")
        )
        .addStringOption((input) =>
          input
            .setRequired(true)
            .setName("title")
            .setDescription("認証パネルのタイトル")
        )
        .addStringOption((input) =>
          input
            .setRequired(true)
            .setName("description")
            .setDescription("認証パネルの内容")
        )
        .addRoleOption((input) =>
          input
            .setRequired(true)
            .setName("role")
            .setDescription("認証が終わった後付与するロール")
        )
    );
  }

  public async chatInputRun(interaction: Command.ChatInputInteraction) {
    if (!interaction.guild)
      return await interaction.reply({
        content: "ここはサーバーではありません。",
        ephemeral: true,
      });
    if (interaction.options.getString("type") === "1") {
      await interaction.reply({
        content: "認証パネルを生成しました。",
        ephemeral: true,
      });
      const embed = new MessageEmbed()
        .setTitle(interaction.options.getString("title") || "")
        .setDescription(interaction.options.getString("description") || "")
        .setFields({
          name: "付与するロール",
          value: `<@&${interaction.options.getRole("role")?.id}>`,
        })
        .setColor(0x3498db);
      const msg = await interaction.channel?.send({
        embeds: [embed],
        components: [
          new MessageActionRow().addComponents(
            new MessageButton()
              .setEmoji("✅")
              .setLabel("認証")
              .setStyle("SUCCESS")
              .setCustomId("verify_1")
          ),
        ],
      });
      await this.verify.set(
        `${msg?.id}`,
        `${interaction.options.getRole("role")?.id}`
      );
    } else if (interaction.options.getString("type") === "2") {
      await interaction.reply({
        content: "認証パネルを生成しました。",
        ephemeral: true,
      });
      const embed = new MessageEmbed()
        .setTitle(interaction.options.getString("title") || "")
        .setDescription(interaction.options.getString("description") || "")
        .setFields({
          name: "付与するロール",
          value: `<@&${interaction.options.getRole("role")?.id}>`,
        })
        .setColor(0x3498db);
      const msg = await interaction.channel?.send({
        embeds: [embed],
        components: [
          new MessageActionRow().addComponents(
            new MessageButton()
              .setEmoji("✅")
              .setLabel("認証")
              .setStyle("SUCCESS")
              .setCustomId("verify_2")
          ),
        ],
      });
      await this.verify2.set(
        `${msg?.id}`,
        `${interaction.options.getRole("role")?.id}`
      );
    } else if (interaction.options.getString("type") === "3") {
      await interaction.reply({
        content: "認証パネルを生成しました。",
        ephemeral: true,
      });
      const embed = new MessageEmbed()
        .setTitle(interaction.options.getString("title") || "")
        .setDescription(interaction.options.getString("description") || "")
        .setFields({
          name: "付与するロール",
          value: `<@&${interaction.options.getRole("role")?.id}>`,
        })
        .setColor(0x3498db);
      const msg = await interaction.channel?.send({
        embeds: [embed],
        components: [
          new MessageActionRow().addComponents(
            new MessageButton()
              .setEmoji("✅")
              .setLabel("認証")
              .setStyle("SUCCESS")
              .setCustomId("verify_3")
          ),
        ],
      });
      await this.verify3.set(
        `${msg?.id}`,
        `${interaction.options.getRole("role")?.id}`
      );
    }
  }
}
