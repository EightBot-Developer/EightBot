import { Listener, Events } from "@sapphire/framework";
import {
  Interaction,
  CacheType,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} from "discord.js";

export class EmbedResponse1 extends Listener {
  public constructor(context: Listener.Context, options: Listener.Options) {
    super(context, {
      ...options,
      once: false,
      event: Events.InteractionCreate,
    });
  }
  public async run(interaction: Interaction<CacheType>) {
    if (!interaction.isModalSubmit()) return;
    if (interaction.customId === "embed_modal") {
      const embed = new MessageEmbed();
      embed.setTitle(interaction.fields.getTextInputValue("em_ti"));
      embed.setDescription(interaction.fields.getTextInputValue("em_de"));
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setEmoji("🔴")
            .setStyle("SECONDARY")
            .setCustomId("color_1")
        )
        .addComponents(
          new MessageButton()
            .setEmoji("🟠")
            .setStyle("SECONDARY")
            .setCustomId("color_2")
        )
        .addComponents(
          new MessageButton()
            .setEmoji("🟡")
            .setStyle("SECONDARY")
            .setCustomId("color_3")
        )
        .addComponents(
          new MessageButton()
            .setEmoji("🟢")
            .setStyle("SECONDARY")
            .setCustomId("color_4")
        )
        .addComponents(
          new MessageButton()
            .setEmoji("🔵")
            .setStyle("SECONDARY")
            .setCustomId("color_5")
        );
      const row2 = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setEmoji("🟣")
            .setStyle("SECONDARY")
            .setCustomId("color_6")
        )
        .addComponents(
          new MessageButton()
            .setEmoji("🟤")
            .setStyle("SECONDARY")
            .setCustomId("color_7")
        )
        .addComponents(
          new MessageButton()
            .setEmoji("⚫")
            .setStyle("SECONDARY")
            .setCustomId("color_8")
        )
        .addComponents(
          new MessageButton()
            .setEmoji("⚪")
            .setStyle("SECONDARY")
            .setCustomId("color_9")
        )
        .addComponents(
          new MessageButton()
            .setEmoji("🗑️")
            .setLabel("色選択ボタンを消す(戻せません)")
            .setStyle("DANGER")
            .setCustomId("color_d")
        );
      await interaction.reply({ embeds: [embed], components: [row, row2] });
    }
  }
}
