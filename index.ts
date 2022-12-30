import { SapphireClient } from "@sapphire/framework";
import { Intents } from "discord.js";
import { config } from "dotenv";
import http from "node:http";

var server = http.createServer(function (request, response) {
  response.writeHead(200, { "Content-Type": "text/html" });
  response.end("<h1>Botは動いています。</h1>");
});

const client = new SapphireClient({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS],
});
// replitで動かす場合は6行目を消してください。
config();
server.listen(8080);

if (process.env.test_mode === "y") {
  console.info("\x1b[46m\x1b[30mInfo\x1b[49m\x1b[39m Log in in Test mode.");
  client.login(process.env.test_token);
} else {
  console.info(
    "\x1b[46m\x1b[30mInfo\x1b[49m\x1b[39m Log in in production mode."
  );
  client.login(process.env.token);
}
