import {
  Client,
  Embed,
  GatewayIntents,
  Guild,
  Interaction,
  SlashCommandOptionType,
  SlashCommandPartial,
  ActivityType,
  files,
} from "./deps/deps.ts";
const LOG_CHANNEL_ID = Deno.env.get("LOG_CHANNEL_ID") || "";
const token = Deno.env.get("DISCORD_TOKEN") || "";
if (token === "") throw new Error("TOKEN is not set.");
if (LOG_CHANNEL_ID === "") throw new Error("LOG_CHANNEL_ID is not set.");

const client = new Client({
  intents: [GatewayIntents.GUILDS | GatewayIntents.GUILD_MEMBERS],
  token: token,
  presence: {
    activity: {
      name: `起動しています...`,
      type: ActivityType.Playing,
    },
    status: "idle",
  },
});
import { serve } from "https://deno.land/std@0.171.0/http/server.ts";
function handler(): Response {
  return new Response(
    '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>EightBot</title><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous" /> <script src="https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.min.js"></script></head><body style="text-align: center;"><h1>EightBot は正常に動作しています。</h1> <button type="button" class="btn btn-success  btn-lg" disabled>動作中！</button><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script></body></html> ',
    { headers: { "Content-Type": "text/html" } }
  );
}

serve(handler, { port: 12312 });
client.once("ready", async () => {
  const commands: SlashCommandPartial[] = [
    {
      type: "CHAT_INPUT",
      name: "ping",
      description: "Botの現在のping値を返します。",
      options: [],
    },
    {
      type: "CHAT_INPUT",
      name: "invite",
      description: "指定したBotの招待リンクを生成します。",
      options: [
        {
          name: "bot",
          description: "Bot",
          required: true,
          type: SlashCommandOptionType.USER,
        },
      ],
    },
    {
      type: "CHAT_INPUT",
      name: "totuzen",
      description: "突然の死を生成します。",
      options: [
        {
          name: "text",
          description: "テキスト",
          type: SlashCommandOptionType.STRING,
          required: true,
        },
      ],
    },
    {
      type: "CHAT_INPUT",
      name: "5000",
      description: "5000兆円欲しいを生成します。",
      options: [
        {
          name: "top",
          description: "上部文字列",
          type: SlashCommandOptionType.STRING,
          required: true,
        },
        {
          name: "bottom",
          description: "下部文字列",
          type: SlashCommandOptionType.STRING,
          required: true,
        },
        {
          name: "type",
          description: "画像の拡張子",
          choices: [
            { name: "png(お勧め)", value: "png" },
            { name: "jpg", value: "jpg" },
            { name: "webp", value: "webp" },
          ],
          type: SlashCommandOptionType.STRING,
          required: true,
        },
        {
          name: "quality",
          description: "画像の画質",
          choices: [
            { name: "低", value: "30" },
            { name: "中", value: "70" },
            { name: "高", value: "100" },
          ],
          type: SlashCommandOptionType.STRING,
          required: true,
        },
        {
          name: "hoshii",
          description: "下部文字列を「欲しい！」に固定する",
          choices: [
            { name: "固定する", value: "true" },
            { name: "固定しない", value: "false" },
          ],
          type: SlashCommandOptionType.STRING,
          required: true,
        },
        {
          name: "noalpha",
          description: "背景色を白にする",
          choices: [
            { name: "白にする", value: "true" },
            { name: "白にしない", value: "false" },
          ],
          type: SlashCommandOptionType.STRING,
          required: true,
        },
        {
          name: "rainbow",
          description: "虹色にする",
          choices: [
            { name: "虹色にする", value: "true" },
            { name: "虹色にしない", value: "false" },
          ],
          type: SlashCommandOptionType.STRING,
          required: true,
        },
      ],
    },
  ];
  commands.forEach((command) => {
    client.interactions.commands
      .create(command)
      .then((cmds) => console.log(`Created Slash Command ${cmds.name}!`))
      .catch(() => {
        console.log(`Failed to create ${command.name} command!`);
        client.interactions.commands
          .create(command)
          .then((cmds) => console.log(`Created Slash Command ${cmds.name}!`))
          .catch(() => {
            console.log(`Failed to create ${command.name} command!`);
            client.interactions.commands
              .create(command)
              .then((cmds) =>
                console.log(`Created Slash Command ${cmds.name}!`)
              )
              .catch(() =>
                console.log(`Failed to create ${command.name} command!`)
              );
          });
      });
  });
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
  const ch = await client.channels.get(LOG_CHANNEL_ID);
  if (!ch?.isText()) return;
  await ch.send({
    embeds: [
      new Embed()
        .setTitle("🆕｜サーバー参加")
        .setDescription(`**${guild.name}**に追加されました`)
        .setThumbnail({ url: guild.iconURL("webp") })
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
        .setColor("GREEN")
        .setTimestamp(new Date()),
    ],
  });
});
client.on("guildDelete", async (guild: Guild) => {
  const ch = await client.channels.get(LOG_CHANNEL_ID);
  if (!ch?.isText()) return;
  await ch.send({
    embeds: [
      new Embed()
        .setTitle("😭｜サーバー退出")
        .setDescription(`**${guild.name}**でkickされました。`)
        .setThumbnail({ url: guild.iconURL("webp") })
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
        .setColor("RED")
        .setTimestamp(new Date()),
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
