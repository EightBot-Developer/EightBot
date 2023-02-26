import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { en_us } from "../../../locales/en-US.js";
import { ja } from "../../../locales/ja.js";

export default {
  command: new SlashCommandBuilder()
    .setName("aichat")
    .setDescription(en_us.aichat.description)
    .setDescriptionLocalizations({
      "en-US": en_us.aichat.description,
      ja: ja.aichat.description,
    }),
  guildOnly: true,
  async execute(i: ChatInputCommandInteraction) {
    if (!i.channel.isTextBased())
      return await i.reply({
        content: "テキストベースのチャンネルのみでしか実行できません。",
        ephemeral: true,
      });
  },
};
