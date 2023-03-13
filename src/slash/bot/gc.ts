import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import Keyv from "keyv";
const db = new Keyv("sqlite://db/globalchat.sqlite", { table: "channels" });
export default {
  command: new SlashCommandBuilder()
    .setName("globalchat")
    .setDescription("グローバルチャット系コマンド。")
    .addSubcommand((input) =>
      input.setName("join").setDescription("グローバルチャットに入室します。")
    )
    .addSubcommand((input) =>
      input
        .setName("leave")
        .setDescription("グローバルチャットから退出します。")
    ),
  async execute(i: ChatInputCommandInteraction) {
    if (
      !i.guild.members.cache
        .get(i.user.id)
        .permissions.has(PermissionFlagsBits.ManageChannels)
    )
      return await i.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("<:x_:1061166079495389196> | 失敗")
            .setDescription(
              "あなたにこのチャンネルを管理する権限がありません。"
            )
            .setColor("Blue"),
        ],
      });
    if (
      !i.guild.members.cache
        .get(i.client.user.id)
        .permissions.has(PermissionFlagsBits.ManageWebhooks) ||
      !i.guild.members.cache
        .get(i.client.user.id)
        .permissions.has(PermissionFlagsBits.AddReactions) ||
      !i.guild.members.cache
        .get(i.client.user.id)
        .permissions.has(PermissionFlagsBits.ViewChannel) ||
      !i.guild.members.cache
        .get(i.client.user.id)
        .permissions.has(PermissionFlagsBits.SendMessages) ||
      !i.guild.members.cache
        .get(i.client.user.id)
        .permissions.has(PermissionFlagsBits.ManageChannels)
    )
      return await i.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("<:x_:1061166079495389196> | 失敗")
            .setDescription(
              "Botにウェブフックの管理又はリアクションの追加又はチャンネルの閲覧又はメッセージの送信又はチャンネル管理権限がありません。"
            )
            .setColor("Blue"),
        ],
      });
    const channels: Array<string> = await db.get("channels");
    let foundJoin = false;
    switch (i.options.getSubcommand()) {
      case "join":
        channels.forEach((value) => {
          if (value === i.channelId) {
            foundJoin = true;
          }
        });
        if (foundJoin) {
          await i.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle("<:x_:1061166079495389196> | 失敗")
                .setDescription("すでに入室済みです。")
                .setColor("Blue"),
            ],
          });
        } else {
          await db.set(i.channelId, true);
          await i.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle("<:check:1061166073891786872> | 成功")
                .setDescription("入室しました。")
                .setColor("Blue"),
            ],
          });
        }
        break;

      default:
        break;
    }
  },
};
