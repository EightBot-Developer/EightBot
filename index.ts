import { SapphireClient } from "@sapphire/framework";
import { config } from "dotenv";
const client = new SapphireClient({ intents: ["GUILDS", "GUILD_MESSAGES"] });
// replitで動かす場合は5行目を消してください。
config();
if (process.env.test_mode === "y") {
  client.login(process.env.test_token);
} else {
  client.login(process.env.token);
}
