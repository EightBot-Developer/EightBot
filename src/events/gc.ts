import { Message, Events } from "discord.js";
import Keyv from "keyv";
const db = new Keyv("sqlite://db/globalchat.sqlite", { table: "channels" });
//editとdeleteはdbにmsgidとwebhook message idを保存して編集などをする

export default {
  name: Events.MessageCreate,
  async execute(message: Message) {
    if (await db.get(message.channelId)) {
      const channels: Array<String> = await db.get("channels");
    }
  },
};
