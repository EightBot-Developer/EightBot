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

export class RolePanelAddsSelect extends Listener {
  role: Keyv;
  public constructor(context: Listener.Context, options: Listener.Options) {
    super(context, {
      ...options,
      once: false,
      event: Events.InteractionCreate,
    });
    this.role = new Keyv("sqlite://db/role_panel.sqlite", {
      table: "role_panel_mesg",
    });
    this.role.on("error", (e) => this.container.logger.info(e));
  }
  public async run(interaction: Interaction<CacheType>) {
    if (!interaction.isSelectMenu()) return;
    if (!interaction.user.id === (await this.role.get(interaction.message.id)))
      return;
    if (interaction.customId === "role_panel_adds_seleectttt") {
      await interaction.update({
        content: "ロールパネルにロールを追加しました。",
        components: [],
      });
      let num = 0;
      const datas: Array<string> = [];
      for (const id of interaction.values) {
        num = num + 1;
        datas.push(`${num}: <@&${id}>`);
      }
      const desc = datas.join("\n");
      await interaction.channel?.send({
        embeds: [
          new MessageEmbed().setTitle("ロールパネル").setDescription(desc),
        ],
        components: [
          new MessageActionRow().addComponents(
            new MessageButton()
              .setCustomId("role_adds_button")
              .setLabel("ロールをゲット！")
              .setStyle("PRIMARY")
          ),
        ],
      });
    }
  }
}
