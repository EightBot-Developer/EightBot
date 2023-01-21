import {
  Client,
  Embed,
  GatewayIntents,
  Guild,
  Interaction,
  SlashCommandOptionType,
  SlashCommandPartial,
} from "./deps/deps.ts";
import { files } from "./files/index.ts";
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
import { ActivityType } from "https://raw.githubusercontent.com/discordjs/discord-api-types/0.37.26/deno/v10.ts";
function handler(): Response {
  return new Response("オンラインです。");
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
  const ch = await client.channels.get(LOG_CHANNEL_ID);
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
