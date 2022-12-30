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
    if (!interaction.isButton()) return;
    if (interaction.customId === "verify_2") {
      if (
        interaction.guild?.members.cache
          .get(interaction.member?.user.id || "")
          ?.roles.cache.has(await this.verify.get(`${interaction.message.id}`))
      )
        return await interaction.reply({
          content: "認証に成功しています。",
          ephemeral: true,
        });
      const n = String(Random_num(999));
      const modal = new Modal().setCustomId(`verify_2_${n}`).setTitle("認証");
      modal.addComponents(
        new MessageActionRow<ModalActionRowComponent>().addComponents(
          new TextInputComponent()
            .setCustomId("id")
            .setLabel(`${n}←この数字を入力してください。`)
            .setStyle("SHORT")
            .setMaxLength(3)
        )
      );
      await interaction.showModal(modal);
    }
  }
}
