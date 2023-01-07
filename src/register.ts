import { REST, Routes, SlashCommandBuilder } from "./deps/deps.ts";
import { DISCORD_TOKEN, CLIENT_ID } from "./secret/secret.ts";
export async function register() {
  const commands = [
    new SlashCommandBuilder()
      .setName("bot")
      .setDescription("Bot系コマンド")
      .addSubcommand((input) =>
        input.setName("ping").setDescription("Botの現在のping値を返します。")
      )
      .addSubcommand((input) =>
        input
          .setName("invite")
          .setDescription("指定したBotの招待リンクを生成します。")
          .addUserOption((input) =>
            input.setName("bot").setDescription("Bot").setRequired(true)
          )
      ),
  ];

  const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
}
