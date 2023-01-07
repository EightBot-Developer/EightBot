import {
  Client,
  Embed,
  GatewayIntents,
  Interaction,
  register,
  User,
} from "./deps/deps.ts";
const client = new Client({
  intents: [GatewayIntents.GUILDS | GatewayIntents.GUILD_MEMBERS],
  token: Deno.env.get("DISCORD_TOKEN"),
});
import { serve } from "https://deno.land/std@0.171.0/http/server.ts";
function handler(): Response {
  return new Response("オンラインです。");
}
serve(handler, { port: 12312 });
client.once("ready", async () => {
  await register(client.user?.id || "");

  console.log(`Ready! User: ${client.user?.tag}`);
});

client.on("interactionCreate", async (interaction: Interaction) => {
  if (interaction.isApplicationCommand()) {
    if (interaction.subCommand === "ping") {
      return await interaction.reply({
        embeds: [
          new Embed()
            .setTitle("🏓Pong!")
            .setDescription(`${interaction.client.gateway.ping}ms!`)
            .setColor("BLUE"),
        ],
        ephemeral: true,
      });
    } else if (interaction.subCommand === "invite") {
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
      return await interaction.reply({
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
    } else {
      return await interaction.reply({
        content: "コマンドが見つかりませんでした。",
        ephemeral: true,
      });
    }
  }
});

client.connect();
