import { Listener, Events } from "@sapphire/framework";
import {
  Interaction,
  CacheType,
  Modal,
  MessageActionRow,
  ModalActionRowComponent,
  TextInputComponent,
} from "discord.js";
import Keyv from "keyv";
function Random_num(max: number) {
  return Math.floor(Math.random() * max);
}
export class PollModal extends Listener {
  verify: Keyv;
  public constructor(context: Listener.Context, options: Listener.Options) {
    super(context, {
      ...options,
      once: false,
      event: Events.InteractionCreate,
    });
    this.verify = new Keyv("sqlite://db/verify.sqlite", { table: "type2" });
    this.verify.on("error", (e) => this.container.logger.info(e));
  }
  public async run(interaction: Interaction<CacheType>) {
    if (!interaction.isModalSubmit()) return;
    if (interaction.customId.startsWith("verify_2_")) {
      const a = interaction.customId.replace("verify_2_", "");
      if (interaction.fields.getTextInputValue("id") === a) {
        await interaction.guild?.members.cache
          .get(interaction.user.id)
          ?.roles.add(
            `${await this.verify.get(`${interaction.message?.id}`)}`,
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
}
