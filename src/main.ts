import {
  Client,
  Embed,
  GatewayIntents,
  Guild,
  Interaction,
  User,
  register,
} from "./deps/deps.ts";
const key = "982215169465786428";
const client = new Client({
  intents: [GatewayIntents.GUILDS | GatewayIntents.GUILD_MEMBERS],
  token: Deno.env.get("DISCORD_TOKEN"),
});
import { serve } from "https://deno.land/std@0.171.0/http/server.ts";
function handler(): Response {
  return new Response("オンラインです。");
}

serve(handler, { port: 12312 });
client.once("ready", () => {
  register(client.user?.id || "");
  console.log(`Ready! User: ${client.user?.tag}`);
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
    const n = interaction.name;
    if (n === "ping") {
      await interaction.reply({
        embeds: [
          new Embed()
            .setTitle("🏓Pong!")
            .setDescription(`${interaction.client.gateway.ping}ms!`)
            .setColor("BLUE"),
        ],
        ephemeral: true,
      });
    }
    if (n === "invite") {
      const user_id: string = interaction.options[0].value;
      const user: User =
        (await interaction.client.users.get(user_id)) || interaction.user;
      if (!user?.bot)
        return await interaction.reply({
          embeds: [
            new Embed()
              .setTitle(`<:x_:1061166079495389196> : 失敗`)
              .setDescription(`指定したBotはユーザーです。`)
              .setColor("RED"),
          ],
          ephemeral: true,
        });
      await interaction.reply({
        embeds: [
          new Embed()
            .setTitle(`${user?.tag}を招待。`)
            .setDescription(
              `以下のボタンをクリックすることで、${user?.tag}を招待出来ます。`
            )
            .setColor("BLUE"),
        ],
        components: [
          {
            type: "ACTION_ROW",
            components: [
              {
                type: "BUTTON",
                label: "管理者権限で招待",
                style: "LINK",
                url: `https://discord.com/api/oauth2/authorize?client_id=${user?.id}&permissions=8&scope=bot%20applications.commands`,
              },
              {
                type: "BUTTON",
                label: "権限を選択して招待",
                style: "LINK",
                url: `https://discord.com/api/oauth2/authorize?client_id=${user?.id}&permissions=4398046511095&scope=bot%20applications.commands`,
              },
              {
                type: "BUTTON",
                label: "権限なしで招待",
                style: "LINK",
                url: `https://discord.com/api/oauth2/authorize?client_id=${user?.id}&permissions=0&scope=bot%20applications.commands`,
              },
            ],
          },
        ],
        ephemeral: true,
      });
    }
    if (n === "totuzen") {
      const sep_top = "人";
      const sep_left = "＞　";
      const sep_right = "　＜";
      const sep_bottom = "^Y";
      let top = "＿人人人";
      let bottom = "\r\n￣Y^Y^Y";
      let cnt = 0;
      let str = interaction.options[0].value
        ? interaction.options[0].value
        : "突然の死";
      let line = str.match(/\r\n|\n/g);
      if (!line) line = "";
      line = line.length + 1;
      let i = 0;
      if (line > 1) {
        str = str.split(/\r\n|\r|\n/);
        for (i = 0; i < line; i++) {
          if (cnt < str[i].length) cnt = str[i].length;
          str[i] = sep_left + str[i] + sep_right;
        }
        str = str.join("\r\n");
        str = str.replace(/\r\n$/, "");
      } else {
        cnt = str.length;
        str = sep_left + str + sep_right;
      }
      for (i = 1; i < cnt; i++) {
        top += sep_top;
        bottom += sep_bottom;
      }
      top += "＿\r";
      if (cnt > 1) bottom = bottom.replace(/\^Y$/m, "");
      bottom += "￣";
      str = top + str + bottom;
      await interaction.reply({
        embeds: [
          new Embed().setTitle("突然の死").setDescription(str).setColor("BLUE"),
        ],
        allowedMentions: { parse: [] },
        ephemeral: true,
      });
    }
  }
});

client.connect();
