import { Events, Listener } from "@sapphire/framework";
import { Client } from "discord.js";
export class ReadyListener extends Listener {
  public constructor(context: Listener.Context, options: Listener.Options) {
    super(context, {
      ...options,
      once: true,
      event: Events.ClientReady,
    });
  }
  public run(client: Client) {
    const { username, id } = client.user!;
    this.container.client.user?.setPresence({
      status: "idle",
      activities: [
        {
          name: `/help | ${this.container.client.guilds.cache.size} server`,
          type: "PLAYING",
        },
      ],
    });
    this.container.logger.info(`Successfully logged in as ${username} (${id})`);
    setInterval(async () => {
      this.container.client.user?.setPresence({
        status: "idle",
        activities: [
          {
            name: `/help | ${this.container.client.guilds.cache.size} server`,
            type: "PLAYING",
          },
        ],
      });
    }, 10000);
  }
}
