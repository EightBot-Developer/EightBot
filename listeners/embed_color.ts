import { Listener, Events } from "@sapphire/framework";
import {
  Interaction,
  CacheType,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} from "discord.js";
import { APIEmbed } from "discord-api-types/v9";
export class EmbedColor extends Listener {
  public constructor(context: Listener.Context, options: Listener.Options) {
    super(context, {
      ...options,
      once: false,
      event: Events.InteractionCreate,
    });
  }
  public async run(interaction: Interaction<CacheType>) {
    if (!interaction.isButton()) return;
    if (interaction.customId === "color_1") {
      const embed = interaction.message?.embeds[0];
      return await interaction.update({
        embeds: [new MessageEmbed(embed).setColor(0xdd2e44)],
      });
    } else if (interaction.customId === "color_2") {
      const embed = interaction.message?.embeds[0];
      return await interaction.update({
        embeds: [new MessageEmbed(embed).setColor(0xff6723)],
      });
    } else if (interaction.customId === "color_3") {
      const embed = interaction.message?.embeds[0];
      return await interaction.update({
        embeds: [new MessageEmbed(embed).setColor(0xfcd53f)],
      });
    } else if (interaction.customId === "color_4") {
      const embed = interaction.message?.embeds[0];
      return await interaction.update({
        embeds: [new MessageEmbed(embed).setColor(0x00d26a)],
      });
    } else if (interaction.customId === "color_5") {
      const embed = interaction.message?.embeds[0];
      return await interaction.update({
        embeds: [new MessageEmbed(embed).setColor(0x0074ba)],
      });
    } else if (interaction.customId === "color_6") {
      const embed = interaction.message?.embeds[0];
      return await interaction.update({
        embeds: [new MessageEmbed(embed).setColor(0x8d65c5)],
      });
    } else if (interaction.customId === "color_7") {
      const embed = interaction.message?.embeds[0];
      return await interaction.update({
        embeds: [new MessageEmbed(embed).setColor(0x6d4534)],
      });
    } else if (interaction.customId === "color_8") {
      const embed = interaction.message?.embeds[0];
      return await interaction.update({
        embeds: [new MessageEmbed(embed).setColor(0x000000)],
      });
    } else if (interaction.customId === "color_9") {
      const embed = interaction.message?.embeds[0];
      return await interaction.update({
        embeds: [new MessageEmbed(embed).setColor(0xffffff)],
      });
    } else if (interaction.customId === "color_d") {
      return await interaction.update({
        components: [],
      });
    }
  }
}
