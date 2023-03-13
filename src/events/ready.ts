import { Client, ActivityType, Events } from "discord.js";

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export default {
  name: Events.ClientReady,
  once: true,
  async execute(client: Client) {
    console.log("Logged in as " + client.user.tag);
    await sleep(500);
    client.user.setPresence({
      activities: [{ name: "再起動中...", type: ActivityType.Watching }],
      status: "dnd",
    });
    client.rebootFlag = 1;
    setInterval(() => {
      client.user.setPresence({
        activities: [
          {
            name: `/help | ${client.guilds.cache.size} Servers | ${client.ws.ping} ms`,
            type: ActivityType.Playing,
          },
        ],
        status: "online",
      });
      client.rebootFlag = 0;
    }, 5000);
  },
};
