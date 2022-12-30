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
export class Verify3 extends Listener {
  verify: Keyv;
  public constructor(context: Listener.Context, options: Listener.Options) {
    super(context, {
      ...options,
      once: false,
      event: Events.InteractionCreate,
    });
    this.verify = new Keyv("sqlite://db/verify.sqlite", { table: "type3" });
    this.verify.on("error", (e) => this.container.logger.info(e));
  }
  public async run(interaction: Interaction<CacheType>) {
    if (!interaction.isButton()) return;
    if (interaction.customId === "verify_3") {
      if (
        interaction.guild?.members.cache
          .get(interaction.member?.user.id || "")
          ?.roles.cache.has(await this.verify.get(`${interaction.message.id}`))
      )
        return await interaction.reply({
          content: "認証に成功しています。",
          ephemeral: true,
        });
      const c = Random_num(901);
      const c3 = Random_num(10);
      const n = String(c + c3);
      const modal = new Modal().setCustomId(`verify_3_${n}`).setTitle("認証");
      modal.addComponents(
        new MessageActionRow<ModalActionRowComponent>().addComponents(
          new TextInputComponent()
            .setCustomId("id")
            .setLabel(`${c} + ${c3}の答えは？`)
            .setStyle("SHORT")
            .setMaxLength(3)
        )
      );
      await interaction.showModal(modal);
    }
  }
}
