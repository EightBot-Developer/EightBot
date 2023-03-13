import {
  Message,
  WebhookClient,
  BaseInteraction,
  EmbedBuilder,
  PermissionFlagsBits,
} from "discord.js";
import Keyv from "keyv";
const db = new Keyv("sqlite://db/message_bottom.sqlite", { table: "chid_mid" });
const db2 = new Keyv("sqlite://db/message_bottom.sqlite", { table: "mid" });

export async function message_bottom(message: Message) {
  if (message.author.bot) return;
  const webhookdata: {
    content: string;
    url: string;
  } = await db.get(message.channelId);
  const mid: string = await db2.get(message.channelId);
  const cache_msg = message.channel.messages.cache.get(mid);
  if (cache_msg) {
    if (cache_msg.deletable) {
      await cache_msg.delete();
    }
  } else {
    const fetch_msg = await message.channel.messages.fetch(mid);
    if (fetch_msg) {
      if (fetch_msg.deletable) {
        await fetch_msg.delete();
      }
    }
  }
  const webhookClient = new WebhookClient({ url: webhookdata.url });
  const wm = await webhookClient.send({
    content: webhookdata.content,
  });
  await db2.set(message.channelId, wm.id);
}
