import {
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { en_us } from "../../locales/en-US.js";
import { ja } from "../../locales/ja.js";

export default {
  command: new SlashCommandBuilder()
    .setName("ping")
    .setDescription(en_us.ping.description)
    .setDescriptionLocalizations({
      "en-US": en_us.ping.description,
      ja: ja.ping.description,
    }),
  async execute(i: CommandInteraction) {
    await i.reply({ content: ":ping_pong:Pinging...", fetchReply: true }).then(
      async (msg) =>
        await msg.edit({
          content: null,
          embeds: [
            new EmbedBuilder()
              .setTitle(":ping_pong:Ping!")
              .setDescription("只今のPing値は...")
              .setFields(
                {
                  name: "🚅WebSocket Ping",
                  value: `${i.client.ws.ping}ms`,
                  inline: true,
                },
                {
                  name: "🚌API Latency",
                  value: `${Date.now() - msg.createdTimestamp}ms`,
                  inline: true,
                }
              )
              .setColor("Blue"),
          ],
        })
    );
  },
};
