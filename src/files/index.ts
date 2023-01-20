import { Client, Interaction } from "../deps/deps.ts";
import { Ping } from "./ping.ts";
import { Invite } from "./invite.ts";
import { Totuzen } from "./totuzen.ts";
import { Gosentyoen } from "./gosentyoen.ts";
export async function files(
  file_name: string,
  client: Client,
  interaction: Interaction
) {
  switch (file_name) {
    case "ping":
      await new Ping().run(client, interaction);
      break;
    case "invite":
      await new Invite().run(interaction);
      break;
    case "totuzen":
      await new Totuzen().run(interaction);
      break;
    case "5000":
      await new Gosentyoen().run(interaction);
      break;
    default:
      break;
  }
}
