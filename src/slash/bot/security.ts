import {
    CommandInteraction,
    EmbedBuilder,
    SlashCommandBuilder,
  } from "discord.js";
  import { en_us } from "../../../locales/en-US.js";
  import { ja } from "../../../locales/ja.js";
  
  export default {
    command: new SlashCommandBuilder()
      .setName("ping")
      .setDescription(en_us.ping.description)
      .setDescriptionLocalizations({
        "en-US": en_us.ping.description,
        ja: ja.ping.description,
      }),
    async execute(i: CommandInteraction) {
     
    },
  };
  