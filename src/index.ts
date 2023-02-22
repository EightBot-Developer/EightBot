import fs from "node:fs";
import {
  Client,
  GatewayIntentBits,
  Collection,
  Partials,
  EmbedBuilder,
  BitFieldResolvable,
} from "discord.js";
import { timeToJST } from "./util/function.js";
import config from "./config.js";
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

/*for (const folder of fs.readdirSync("./slash")) {
  const commandFiles = fs
    .readdirSync(`./slash/${folder}`)
    .filter((file) => file.endsWith(".ts"));
  for (const file of commandFiles) {
    const command = require(`./slash/${folder}/${file}`);
    client.slash.set(command.name, command);
  }
}

for (const folder of fs.readdirSync("./contextmenu")) {
  const commandFiles = fs
    .readdirSync(`./contextmenu/${folder}`)
    .filter((file) => file.endsWith(".ts"));
  for (const file of commandFiles) {
    const contextmenu = require(`./contextmenu/${folder}/${file}`);
    client.contextmenu.set(contextmenu.name, contextmenu);
  }
} */

const eventFiles = fs.readdirSync("./src/events");

for (const file of eventFiles) {
  const event_d = await import(`./events/${file}`);
  const event = event_d.default;
  if (event.once) {
    client.once(event.name, async (...args) => await event.execute(...args));
  } else {
    client.on(event.name, async (...args) => await event.execute(...args));
  }
}

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
