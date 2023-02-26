import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { en_us } from "../../../locales/en-US.js";
import { ja } from "../../../locales/ja.js";
import Keyv from "keyv";
const bot_log = new Keyv("sqlite://db/security_log.sqlite", {
  table: "channels",
});

export default {
  command: new SlashCommandBuilder()
    .setName("setting")
    .setDescription(en_us.setting.description)
    .setDescriptionLocalizations({
      "en-US": en_us.setting.description,
      ja: ja.setting.description,
    })
    .addSubcommand((input) =>
      input
        .setName("token_security")
        .setDescription(en_us.setting.description)
        .setDescriptionLocalizations({
          "en-US": en_us.setting.description,
          ja: ja.setting.description,
        })
        .addStringOption((input) =>
          input
            .setName("level")
            .setNameLocalizations({
              "en-US": "level",
              ja: "レベル",
            })
            .addChoices(
              {
                name: "warn",
                name_localizations: { ja: "注意" },
                value: "MessageWarn",
              },
              {
                name: "timeout",
                name_localizations: { ja: "タイムアウト" },
                value: "Timeout",
              },
              {
                name: "kick",
                name_localizations: { ja: "キック" },
                value: "Kick",
              },
              {
                name: "ban",
                name_localizations: { ja: "バン" },
                value: "Ban",
              },
              {
                name: "warn",
                name_localizations: { ja: "注意" },
                value: "MessageWarn",
              }
            )
        )
        .addChannelOption((input) =>
          input.setName("level").setNameLocalizations({
            "en-US": "level",
            ja: "レベル",
          })
        )
    ),
  guildOnly: true,
  async execute(i: ChatInputCommandInteraction) {
    if (!i.channel.isTextBased())
      return await i.reply({
        content: "テキストベースのチャンネルのみでしか実行できません。",
        ephemeral: true,
      });
    switch (i.options.getSubcommand()) {
      case "token_security":
        if (i.options.getChannel(""))
        break;

      default:
        break;
    }
  },
};
