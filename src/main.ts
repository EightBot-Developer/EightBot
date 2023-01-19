import {
  Client,
  Embed,
  GatewayIntents,
  Guild,
  Interaction,
  register,
} from "./deps/deps.ts";
import { files } from "./files/index.ts";
const key = "982215169465786428";
const client = new Client({
  intents: [GatewayIntents.GUILDS | GatewayIntents.GUILD_MEMBERS],
  token: Deno.env.get("DISCORD_TOKEN"),
  presence: {
    activity: {
      name: `起動しています...`,
      type: ActivityType.Playing,
    },
    status: "idle",
  },
});
import { serve } from "https://deno.land/std@0.171.0/http/server.ts";
import { ActivityType } from "https://raw.githubusercontent.com/discordjs/discord-api-types/0.37.26/deno/v10.ts";
function handler(): Response {
  return new Response("オンラインです。");
}

serve(handler, { port: 12312 });
client.once("ready", async () => {
  register(client.user?.id || "");
  console.log(`Ready! User: ${client.user?.tag}`);
  const siezds = await client.guilds.size();
  client.setPresence({
    activity: {
      name: `/help | ${siezds} server`,
      type: ActivityType.Playing,
    },
    status: "online",
  });
  setInterval(async () => {
    const siezd = await client.guilds.size();
    client.setPresence({
      activity: {
        name: `/help | ${siezd} server`,
        type: ActivityType.Playing,
      },
      status: "online",
    });
  }, 10000);
});
client.on("guildCreate", async (guild: Guild) => {
  const ch = await client.channels.get(key);
  if (!ch?.isText()) return;
  await ch.send({
    embeds: [
      new Embed()
        .setTitle("🆕｜サーバー参加")
        .setDescription(`**${guild.name}**に追加されました`)
        .setThumbnail({ url: guild.iconURL("dynamic") })
        .addFields(
          {
            name: "🆔｜id",
            value: guild.id,
          },
          {
            name: "📝｜サーバーの説明",
            value: guild.description || "なし",
          },
          {
            name: "👑｜オーナー",
            value: `${(await client.users.get(guild.ownerID || ""))?.tag}｜${
              guild.ownerID
            }`,
          }
        )
        .setColor("GREEN"),
    ],
  });
});
client.on("guildDelete", async (guild: Guild) => {
  const ch = await client.channels.get(key);
  if (!ch?.isText()) return;
  await ch.send({
    embeds: [
      new Embed()
        .setTitle("😭｜サーバー退出")
        .setDescription(`**${guild.name}**でkickされました。`)
        .setThumbnail({ url: guild.iconURL("dynamic") })
        .addFields(
          {
            name: "🆔｜id",
            value: guild.id,
          },
          {
            name: "📝｜サーバーの説明",
            value: guild.description || "なし",
          },
          {
            name: "👑｜オーナー",
            value: `${(await client.users.get(guild.ownerID || ""))?.tag}｜${
              guild.ownerID
            }`,
          }
        )
        .setColor("RED"),
    ],
  });
});
client.on("interactionCreate", async (interaction: Interaction) => {
  if (interaction.isApplicationCommand()) {
    await files(interaction.name, client, interaction);
  } else if (interaction.isMessageComponent()) {
    await files(interaction.customID, client, interaction);
  }
});

client.connect();
