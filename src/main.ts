import { Client, GatewayIntents, Interaction, register } from "./deps/deps.ts";
const client = new Client({
  intents: [GatewayIntents.GUILDS | GatewayIntents.GUILD_MEMBERS],
  token: Deno.env.get("DISCORD_TOKEN"),
});

client.once("ready", async () => {
  await register(client.user?.id || "");

  console.log(`Ready! User: ${client.user?.tag}`);
});

client.on("interactionCreate", async (interaction: Interaction) => {
  if (interaction.isApplicationCommand()) {
    try {
      const cmd = await import(
        `./slash/${interaction.name}/${interaction.subCommand}.ts`
      );
      const c = new cmd.default();
      await c.run(interaction);
    } catch (e) {
      console.log(e);
      await interaction.reply({
        content: "コマンドが見つかりませんでした。",
        ephemeral: true,
      });
    }
  }
});

client.connect();
