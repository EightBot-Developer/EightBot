import {
  ContextMenuCommandBuilder,
  ContextMenuCommandInteraction,
  ApplicationCommandType,
  PermissionFlagsBits,
  EmbedBuilder,
  WebhookClient,
} from "discord.js";
import Keyv from "keyv";
const db = new Keyv("sqlite://db/message_bottom.sqlite", { table: "chid_mid" });
const db2 = new Keyv("sqlite://db/message_bottom.sqlite", { table: "mid" });

export default {
  command: new ContextMenuCommandBuilder()
    .setName("最下に固定を解除")
    .setType(ApplicationCommandType.Message),
  async execute(i: ContextMenuCommandInteraction) {
    if (!i.isMessageContextMenuCommand()) return;
    if (!i.channel.isTextBased() || i.channel.isThread())
      return await i.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("<:x_:1061166079495389196> | 失敗")
            .setDescription(
              "このチャンネルではこのコマンドを実行することはできません。"
            )
            .setColor("Blue"),
        ],
      });

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
              "Botにウェブフックの管理又はチャンネルの閲覧又はメッセージの送信又はチャンネル管理権限がありません。"
            )
            .setColor("Blue"),
        ],
      });

    const webhookdata: {
      content: string;
      url: string;
    } = await db.get(i.channelId);
    if (!webhookdata)
      return await i.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("<:x_:1061166079495389196> | 失敗")
            .setDescription("登録されていません。")
            .setColor("Blue"),
        ],
      });
    await db.set(i.channelId, undefined);
    const webhookClient = new WebhookClient({ url: webhookdata.url });
    await webhookClient.delete();
    await db2.set(i.channelId, undefined);
    await i.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("<:check:1061166073891786872> | 成功")
          .setDescription("解除しました。")
          .setColor("Blue"),
      ],
    });
  },
};
