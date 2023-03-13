import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
export default {
  command: new SlashCommandBuilder()
    .setName("verify")
    .setDescription("認証パネルを生成します。")
    .addStringOption((input) =>
      input
        .addChoices(
          {
            name: "2段階認証をしているかチェック",
            value: "01",
          },
          {
            name: "1クリック",
            value: "02",
          },
          {
            name: "ウェブ",
            value: "03",
          },
          {
            name: "乱数",
            value: "04",
          },
          {
            name: "足し算",
            value: "05",
          },
          {
            name: "引き算",
            value: "06",
          },
          {
            name: "掛け算",
            value: "07",
          },
          {
            name: "割り算",
            value: "08",
          },
          {
            name: "画像",
            value: "09",
          },
          {
            name: "テキスト",
            value: "10",
          },
          { name: "連携ロール認証", value: "11" }
        )
        .setRequired(true)
        .setName("認証の種類")
        .setDescription("認証の種類")
    ),
  async execute(i: ChatInputCommandInteraction) {},
};
