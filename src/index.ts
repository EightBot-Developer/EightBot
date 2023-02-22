import fs from "node:fs";
import {
  Client,
  GatewayIntentBits,
  Collection,
  Partials,
  EmbedBuilder,
  BitFieldResolvable,
  REST,
  Routes,
  ContextMenuCommandBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { timeToJST } from "./util/function.js";
import config from "./config.js";
import chalk from "chalk";
import "./helper/extends.js";
const client = new Client({
  intents: Object.values(GatewayIntentBits) as BitFieldResolvable<
    keyof typeof GatewayIntentBits,
    number
  >,
  allowedMentions: { repliedUser: false, parse: ["roles", "users"] },
  partials: Object.values(Partials) as Partials[],
});

client.rebootFlag = 0;

client.contextmenu = new Collection();
client.slash = new Collection();
client.cooldowns = new Collection();
const commands: Array<SlashCommandBuilder | ContextMenuCommandBuilder> = [];

for (const folder of fs.readdirSync("./src/slash")) {
  const commandFiles = fs
    .readdirSync(`./src/slash/${folder}`)
    .filter((file) => file.endsWith(".ts"));
  for (const file of commandFiles) {
    const slash_d = await import(`./slash/${folder}/${file}`);
    const slash = slash_d.default;
    client.slash.set(slash.command.name, slash);
    commands.push(slash.command.toJSON());
  }
}

for (const folder of fs.readdirSync("./src/contextmenu")) {
  const commandFiles = fs
    .readdirSync(`./src/contextmenu/${folder}`)
    .filter((file) => file.endsWith(".ts"));
  for (const file of commandFiles) {
    const contextmenu_d = await import(`./contextmenu/${folder}/${file}`);
    const contextmenu = contextmenu_d.default;
    client.contextmenu.set(contextmenu.command.name, contextmenu);
    commands.push(contextmenu.command.toJSON());
  }
}

for (const file of fs.readdirSync("./src/events")) {
  const event_d = await import(`./events/${file}`);
  const event = event_d.default;
  if (event.once) {
    client.once(event.name, async (...args) => await event.execute(...args));
  } else {
    client.on(event.name, async (...args) => await event.execute(...args));
  }
}
const rest = new REST({ version: "10" }).setToken(config.token);
console.log("Started refreshing application (/) commands.");

rest.put(Routes.applicationCommands(config.clientId), {
  body: commands,
});

console.log("Successfully reloaded application (/) commands.");
client.login(config.token).then(() => console.log("login..."));

process.on("uncaughtException", (error) => {
  console.error(`[${timeToJST(Date.now(), true)}] ${error.stack}`);
  const embed = new EmbedBuilder()
    .setTitle("ERROR - uncaughtException")
    .setDescription("```\n" + error.stack + "\n```")
    .setColor("Red")
    .setTimestamp();
  client.channels.fetch(config.logChannelId).then(async (c) => {
    if (!c.isTextBased()) return;
    await c.send({
      content: `\`\`\`js\n${(await import("util"))
        .inspect(error)
        .slice(0, 1800)}\n\`\`\``,
      embeds: [embed],
    });
  });
});

process.on("unhandledRejection", (reason, promise) => {
  console.error(
    `\u001b[31m[${timeToJST(Date.now(), true)}] ${reason}\u001b[0m\n`,
    promise
  );
  const embed = new EmbedBuilder()
    .setTitle("ERROR - unhandledRejection")
    .setDescription("```\n" + reason + "\n```")
    .setColor("Red")
    .setTimestamp();
  client.channels.fetch(config.logChannelId).then(async (c) => {
    if (!c.isTextBased()) return;
    await c.send({ embeds: [embed] });
  });
});
