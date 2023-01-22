import { Client, Embed, Interaction } from "../deps/deps.ts";
import { Ping } from "./ping.ts";
import { Invite } from "./invite.ts";
import { Totuzen } from "./totuzen.ts";
import { Gosentyoen } from "./gosentyoen.ts";
import { DownCheck } from "./downcheck.ts";
import { Slot } from "./slot.ts";
async function log(interaction: Interaction, client: Client) {
  if (!interaction.isApplicationCommand()) return;

  const LOG_CHANNEL_ID = Deno.env.get("LOG_CHANNEL_ID") || "";

  const ch = await client.channels.get(LOG_CHANNEL_ID);
  if (!ch?.isText()) return;
  await ch.send({
    content:
      "```json\n" +
      `{name: ${interaction.data.name}, id: ${interaction.data.id}, type: ${interaction.data.type}, target_id: ${interaction.data.target_id}, resolved: ${interaction.data.resolved}, options: ${interaction.data.options}}` +
      "```",
    embeds: [
      new Embed()
        .setTitle("コマンド実行ログ")
        .setDescription(
          `${interaction.user.tag}(${interaction.user.id}) がコマンドを実行しました。`
        )
        .setFields([
          {
            name: "実行サーバー",
            value:
              "```\n" +
              `${interaction.guild?.name || "不明"}(${
                interaction.guild?.id || "不明"
              })` +
              "```",
          },
          {
            name: "実行ユーザー",
            value:
              "```\n" +
              `${interaction.user?.tag || "不明"}(${
                interaction.user?.id || "不明"
              })` +
              "```",
          },
        ])
        .setThumbnail({ url: interaction.user.avatarURL("webp") })
        .setFooter({
          text:
            "InteractionId: " +
            String(interaction.id) +
            " | CommandId: " +
            String(interaction.data.id),
        })
        .setTimestamp(new Date())
        .setColor("BLUE"),
    ],
  });
}
export async function files(
  file_name: string,
  client: Client,
  interaction: Interaction
) {
  switch (file_name) {
    case "ping":
      await new Ping().run(client, interaction);
      await log(interaction, client);
      break;
    case "invite":
      await new Invite().run(interaction);
      await log(interaction, client);
      break;
    case "totuzen":
      await new Totuzen().run(interaction);
      await log(interaction, client);
      break;
    case "5000":
      await new Gosentyoen().run(interaction);
      await log(interaction, client);
      break;
    case "downcheck":
      await new DownCheck().run(interaction);
      await log(interaction, client);
      break;
    case "slot":
      await new Slot().run(interaction);
      await log(interaction, client);
      break;
    default:
      break;
  }
}
