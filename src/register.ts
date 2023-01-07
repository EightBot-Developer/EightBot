import { Routes } from "./deps/deps.ts";
import { DISCORD_TOKEN } from "./secret/secret.ts";
export async function register(CLIENT_ID: string) {
  const commands = {
    options: [
      {
        type: 1,
        name: "ping",
        name_localizations: undefined,
        description: "Botの現在のping値を返します。",
        description_localizations: undefined,
        options: [],
      },
      {
        type: 1,
        name: "invite",
        name_localizations: undefined,
        description: "指定したBotの招待リンクを生成します。",
        description_localizations: undefined,
        options: [
          {
            name: "bot",
            name_localizations: undefined,
            description: "Bot",
            description_localizations: undefined,
            required: true,
            type: 6,
          },
        ],
      },
    ],
    name: "bot",
    name_localizations: undefined,
    description: "Bot系コマンド",
    description_localizations: undefined,
    default_permission: undefined,
    default_member_permissions: undefined,
    dm_permission: undefined,
  };

  console.log("Started refreshing application (/) commands.");
  await fetch(
    `https://discord.com/api/v10${Routes.applicationCommands(CLIENT_ID)}`,
    {
      method: "post",
      headers: {
        Authorization: `Bot ${DISCORD_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commands),
    }
  )
    .catch((error) => console.error(error))
    .then((res) => console.log(res));
}
