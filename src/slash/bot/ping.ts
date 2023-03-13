import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";

export default {
  command: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("BotのPing値を測ります。"),
  async execute(i: ChatInputCommandInteraction) {
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
