import { Message, Events } from "discord.js";
import Keyv from "keyv";
import { message_bottom } from "../function/message_bottom.js";
const db = new Keyv("sqlite://db/message_bottom.sqlite", { table: "chid_mid" });

export default {
  name: Events.MessageCreate,
  async execute(message: Message) {
    if (await db.get(message.channelId)) {
      await message_bottom(message);
    }
  },
};
