import { SapphireClient } from "@sapphire/framework";
import { Intents } from "discord.js";
import { config } from "dotenv";
const client = new SapphireClient({ intents: Intents.FLAGS.GUILDS });
// replitで動かす場合は6行目を消してください。
config();
if (process.env.test_mode === "y") {
  console.info("\x1b[46m\x1b[30mInfo\x1b[49m\x1b[39m Log in in Test mode.");
  client.login(process.env.test_token);
} else {
  console.info(
    "\x1b[46m\x1b[30mInfo\x1b[49m\x1b[39m Log in in production mode."
  );
  client.login(process.env.token);
}
