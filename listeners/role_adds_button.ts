import { Listener, Events } from "@sapphire/framework";
import {
  Interaction,
  CacheType,
  MessageActionRow,
  MessageSelectMenu,
  InteractionCollector,
} from "discord.js";
import Keyv from "keyv";

export class RoleAddsButton extends Listener {
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
    if (!interaction.isButton()) return;
    if (interaction.customId === "role_adds_button") {
      const row = new MessageSelectMenu()
        .setCustomId("reowrlemvwkxjlmkxjlkmfbxklb")
        .setMinValues(0);
      const list: Array<string> =
        interaction.message.embeds[0].description?.split("\n") || [""];
      row.setMaxValues(list.length);
      let num = 0;
      for (const desc of list) {
        num = num + 1;
        list[num - 1] = desc
          .replace(`${num}: `, "")
          .replace("<@&", "")
          .replace(">", "");
        row.addOptions({
          label: `${num}`,
          value: desc
            .replace(`${num}: `, "")
            .replace("<@&", "")
            .replace(">", ""),
        });
      }
      await interaction.reply({
        content: "何番目のロールが欲しいですか？選んでください。",
        components: [new MessageActionRow().addComponents(row)],
      });
      const collector = new InteractionCollector(this.container.client, {
        filter: (interaction) =>
          interaction.isSelectMenu() &&
          interaction.customId === "reowrlemvwkxjlmkxjlkmfbxklb",
        time: 30000,
      });
      collector.on("collect", async (i: Interaction<CacheType>) => {
        if (!i.isSelectMenu()) return;
        for (const id of i.values) {
          await i.guild?.members.cache
            .get(i.user.id)
            ?.roles.add(id)
            .then(async () => {
              if (i.deferred || i.replied) {
                await i.followUp({
                  content: "付与しました。",
                  ephemeral: true,
                });
              } else {
                await i.reply({ content: "付与しました。", ephemeral: true });
              }
            })
            .catch(async () => {
              if (i.deferred || i.replied) {
                await i.followUp({
                  content: "付与できました。",
                  ephemeral: true,
                });
              } else {
                await i.reply({ content: "付与できました。", ephemeral: true });
              }
            });
        }
      });
    }
  }
}
