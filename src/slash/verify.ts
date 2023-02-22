import {
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { en_us } from "../../locales/en-US.js";
import { ja } from "../../locales/ja.js";

export default {
  command: new SlashCommandBuilder()
    .setName("verify")
    .setDescription(en_us.verify.description)
    .setDescriptionLocalizations({
      ja: ja.ping.description,
      "en-US": en_us.verify.description,
    })
    .addStringOption((input) =>
      input.addChoices(
        {
          name: en_us.verify.options[0],
          name_localizations: { ja: ja.verify.options[0] },
          value: "01",
        },
        {
          name: en_us.verify.options[1],
          name_localizations: { ja: ja.verify.options[1] },
          value: "02",
        },
        {
          name: en_us.verify.options[2],
          name_localizations: { ja: ja.verify.options[2] },
          value: "03",
        },
        {
          name: en_us.verify.options[3],
          name_localizations: { ja: ja.verify.options[3] },
          value: "04",
        },
        {
          name: en_us.verify.options[4],
          name_localizations: { ja: ja.verify.options[4] },
          value: "05",
        },
        {
          name: en_us.verify.options[5],
          name_localizations: { ja: ja.verify.options[5] },
          value: "06",
        },
        {
          name: en_us.verify.options[6],
          name_localizations: { ja: ja.verify.options[6] },
          value: "07",
        },
        {
          name: en_us.verify.options[7],
          name_localizations: { ja: ja.verify.options[7] },
          value: "08",
        },
        {
          name: en_us.verify.options[8],
          name_localizations: { ja: ja.verify.options[8] },
          value: "09",
        },
        {
          name: en_us.verify.options[9],
          name_localizations: { ja: ja.verify.options[9] },
          value: "10",
        }
      )
    ),
  async execute(i: CommandInteraction) {},
};
