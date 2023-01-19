import {
  ApplicationCommandType,
  ApplicationCommandOptionType,
  Routes,
  sleep,
} from "./deps/deps.ts";

export async function register(CLIENT_ID: string) {
  const commands = [
    {
      type: ApplicationCommandType.ChatInput,
      name: "ping",
      description: "Botの現在のping値を返します。",
      options: [],
    },
    {
      type: ApplicationCommandType.ChatInput,
      name: "invite",
      description: "指定したBotの招待リンクを生成します。",
      options: [
        {
          name: "bot",
          description: "Bot",
          required: true,
          type: ApplicationCommandOptionType.User,
        },
      ],
    },
    {
      type: ApplicationCommandType.ChatInput,
      name: "totuzen",
      description: "突然の死を生成します。",
      options: [
        {
          name: "text",
          description: "テキスト",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
  ];

  console.log("Started refreshing application (/) commands.");
  await fetch(
    `https://discord.com/api/v10${Routes.applicationCommands(CLIENT_ID)}`,
    {
      method: "get",
      headers: {
        Authorization: `Bot ${Deno.env.get("DISCORD_TOKEN")}`,
      },
    }
  ).then(async (data) => {
    for (const command of await data.json()) {
      const deleteUrl = `https://discord.com/api/v10${Routes.applicationCommands(
        CLIENT_ID
      )}/${command.id}`;
      await sleep(2);
      await fetch(deleteUrl, {
        method: "delete",
        headers: {
          Authorization: `Bot ${Deno.env.get("DISCORD_TOKEN")}`,
        },
      }).then(async (res) => {
        if (res.status === 429) {
          console.log(res.status + ": " + res.statusText + "(retry)");
          await sleep(2);
          await fetch(deleteUrl, {
            method: "delete",
            headers: {
              Authorization: `Bot ${Deno.env.get("DISCORD_TOKEN")}`,
            },
          }).then(async (res) => {
            if (res.status === 429) {
              console.log(res.status + ": " + res.statusText + "(retry)");
              await sleep(2);
            } else {
              console.log(res.status + ": " + res.statusText);
            }
          });
        } else {
          console.log(res.status + ": " + res.statusText);
        }
      });
    }
  });
  commands.forEach(async (command) => {
    await sleep(2);
    await fetch(
      `https://discord.com/api/v10${Routes.applicationCommands(CLIENT_ID)}`,
      {
        method: "post",
        headers: {
          Authorization: `Bot ${Deno.env.get("DISCORD_TOKEN")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(command),
      }
    ).then((res) => console.log(res.status + ": " + res.statusText));
  });
}
