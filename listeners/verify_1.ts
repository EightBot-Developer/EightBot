import { Listener, Events } from "@sapphire/framework";
import {
  Interaction,
  CacheType,
  MessageEmbed,
  Message,
  MessageActionRow,
  MessageButton,
} from "discord.js";
import Keyv from "keyv";

export class PollModal extends Listener {
  verify: Keyv;
  public constructor(context: Listener.Context, options: Listener.Options) {
    super(context, {
      ...options,
      once: false,
      event: Events.InteractionCreate,
    });
    this.verify = new Keyv("sqlite://db/verify.sqlite", { table: "type1" });
    this.verify.on("error", (e) => this.container.logger.info(e));
  }
  public async run(interaction: Interaction<CacheType>) {
    if (!interaction.isButton()) return;
    if (interaction.customId === "verify_1") {
      await interaction.guild?.members.cache
        .get(interaction.user.id)
        ?.roles.add(
          `${await this.verify.get(`${interaction.message.id}`)}`,
          "認証に成功したため。"
        )
        .then(
          async () =>
            await interaction.reply({
              content: "認証に成功しました。",
              ephemeral: true,
            })
        )
        .catch(
          async () =>
            await interaction.reply({
              content: "認証に失敗しました。",
              ephemeral: true,
            })
        );
    }
  }
}
