import { Events, Message } from "discord.js";
import Keyv from "keyv";
import { security_func } from "../function/index.js";
const automod = new Keyv("sqlite://db/automod.sqlite", { table: "channels" });
export default {
  name: Events.MessageCreate,
  once: true,
  async execute(message: Message) {
    const channels: Array<String> = await automod.get("channels");
    try {
      channels.forEach(async (value) => {
        if (value === message.channelId) {
          await security_func(message);
        }
      });
    } catch {
      return;
    }
  },
};
