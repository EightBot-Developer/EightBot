import {
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { en_us } from "../../locales/en-US.js";
import { ja } from "../../locales/ja.js";
import Keyv from "keyv";
const db = new Keyv("sqlite://db/globalchat.sqlite", { table: "channels" });
export default {
  command: new SlashCommandBuilder()
    .setName("globalchat")
    .setDescription(en_us.globalchat.description)
    .setDescriptionLocalizations({
      "en-US": en_us.globalchat.description,
      ja: ja.globalchat.description,
    }),
  async execute(i: CommandInteraction) {
    const channels: Array<String> = await db.get("channels");
    let found: boolean = false;
    channels.forEach((value) => {
      if (value === i.channelId) {
        found = true;
      }
    });
    if (found) {
      const index = channels.indexOf(i.channelId);
      channels.splice(index, 1);
      await db
        .set("list", channels)
        .then(async () => {
          if (!i.replied) {
            await i.reply({
              embeds: [
                new EmbedBuilder()
                  .setTitle("✅｜成功")
                  .setDescription("退室に成功しました。"),
              ],
            });
          } else {
            await i.followUp({
              embeds: [
                new EmbedBuilder()
                  .setTitle("✅｜成功")
                  .setDescription("退室に成功しました。"),
              ],
            });
          }
        })
        .catch(async () => {
          if (!i.replied) {
            await i.reply({
              embeds: [
                new EmbedBuilder()
                  .setTitle("❌｜失敗")
                  .setDescription("退室に失敗しました。"),
              ],
            });
          } else {
            await i.followUp({
              embeds: [
                new EmbedBuilder()
                  .setTitle("❌｜失敗")
                  .setDescription("退室に失敗しました。"),
              ],
            });
          }
        });
    }
  },
};
