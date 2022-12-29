import { Listener, Events } from "@sapphire/framework";
import {
  Interaction,
  CacheType,
  MessageEmbed,
  Message,
  MessageActionRow,
  MessageButton,
} from "discord.js";
import Keyv from "keyv";

export class Poll_modal extends Listener {
  poll: Keyv;
  public constructor(context: Listener.Context, options: Listener.Options) {
    super(context, {
      ...options,
      once: false,
      event: Events.InteractionCreate,
    });
    this.poll = new Keyv("sqlite://db/db.sqlite", { table: "poll" });
    this.poll.on("error", (e) => this.container.logger.info(e));
  }
  public async run(interaction: Interaction<CacheType>) {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId === "poll_MODAL") {
      try {
        const row = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setCustomId("1")
              .setLabel("1")
              .setStyle("PRIMARY")
          )
          .addComponents(
            new MessageButton()
              .setCustomId("2")
              .setLabel("2")
              .setStyle("PRIMARY")
          )
          .addComponents(
            new MessageButton()
              .setCustomId("3")
              .setLabel("3")
              .setStyle("PRIMARY")
          );
        const embed = new MessageEmbed()
          .setTitle(interaction.fields.getTextInputValue("title"))
          .setDescription(
            `1: ${interaction.fields.getTextInputValue(
              "1"
            )}\n2: ${interaction.fields.getTextInputValue(
              "2"
            )}\n3: ${interaction.fields.getTextInputValue("3")}`
          )
          .setColor(0x3498db);

        await interaction.reply({
          content: "アンケートを生成しました。",
          ephemeral: true,
        });
        const msg = await interaction.channel?.send({
          embeds: [embed],
          components: [row],
        });
        await this.poll.set(`${msg?.id}`, true);
        await this.poll.set(`${msg?.id}_1`, 0);
        await this.poll.set(`${msg?.id}_2`, 0);
        await this.poll.set(`${msg?.id}_3`, 0);
      } catch {
        const row = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setCustomId("1")
              .setLabel("1")
              .setStyle("PRIMARY")
          )
          .addComponents(
            new MessageButton()
              .setCustomId("2")
              .setLabel("2")
              .setStyle("PRIMARY")
          );
        const embed = new MessageEmbed()
          .setTitle(interaction.fields.getTextInputValue("title"))
          .setDescription(
            `1: ${interaction.fields.getTextInputValue(
              "1"
            )}\n2: ${interaction.fields.getTextInputValue("2")}`
          )
          .setColor(0x3498db);
        await interaction.reply({
          content: "アンケートを生成しました。",
          ephemeral: true,
        });
        const ch = await interaction.channel?.send({
          embeds: [embed],
          components: [row],
        });
        await this.poll.set(`${ch?.id}_1`, 0);
        await this.poll.set(`${ch?.id}_2`, 0);
      }
    }
  }
}
