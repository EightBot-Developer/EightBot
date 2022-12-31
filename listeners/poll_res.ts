import { Listener, Events } from "@sapphire/framework";
import { Interaction, CacheType } from "discord.js";
import Keyv from "keyv";

export class PollResponse extends Listener {
  poll: Keyv;
  public constructor(context: Listener.Context, options: Listener.Options) {
    super(context, {
      ...options,
      once: false,
      event: Events.InteractionCreate,
    });
    this.poll = new Keyv("sqlite://db/db.sqlite", { table: "poll" });
    this.poll.on("error", (e) => this.container.logger.error(e));
  }
  public async run(interaction: Interaction<CacheType>) {
    if (!interaction.isButton()) return;
    if (interaction.customId === "1") {
      if (!(await this.poll.get(`${interaction.message.id}`))) {
        return await interaction.reply({
          content: "投票は終了しました。",
          ephemeral: true,
        });
      } else {
        let num: number = await this.poll.get(`${interaction.message.id}_1`);
        num = num + 1;
        await this.poll.set(`${interaction.message.id}_1`, num);
        await interaction.reply({ content: "投票しました。", ephemeral: true });
      }
    } else if (interaction.customId === "2") {
      if (
        (await this.poll.get(`${interaction.message.id}`)) ===
        "notnotnotnotnotnot"
      ) {
        return await interaction.reply({
          content: "投票は終了しました。",
          ephemeral: true,
        });
      } else {
        let num: number = await this.poll.get(`${interaction.message.id}_2`);
        num = num + 1;
        await this.poll.set(`${interaction.message.id}_2`, num);
        await interaction.reply({ content: "投票しました。", ephemeral: true });
      }
    } else if (interaction.customId === "3") {
      if (
        (await this.poll.get(`${interaction.message.id}`)) ===
        "notnotnotnotnotnot"
      ) {
        return await interaction.reply({
          content: "投票は終了しました。",
          ephemeral: true,
        });
      } else {
        let num: number = await this.poll.get(`${interaction.message.id}_3`);
        num = num + 1;
        await this.poll.set(`${interaction.message.id}_3`, num);
        await interaction.reply({ content: "投票しました。", ephemeral: true });
      }
    }
  }
}
