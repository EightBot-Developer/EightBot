import { Command } from "@sapphire/framework";
import { ApplicationCommandType } from "discord-api-types/v9";
import { MessageEmbed } from "discord.js";
import Keyv from "keyv";
export class PollStop extends Command {
  poll: Keyv;
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, { ...options });
    this.poll = new Keyv("sqlite://db/db.sqlite", { table: "poll" });
    this.poll.on("error", (e) => this.container.logger.error(e));
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerContextMenuCommand((builder) =>
      builder.setName("投票を集計する").setType(ApplicationCommandType.Message)
    );
  }

  public async contextMenuRun(interaction: Command.ContextMenuInteraction) {
    if (!interaction.isMessageContextMenu()) return;
    if (
      interaction.targetMessage.embeds[0].footer?.text.replace(
        "管理id: ",
        ""
      ) !== interaction.user.id
    )
      return await interaction.reply({
        content: "あなたは投票の作成者ではありません。",
        ephemeral: true,
      });
    await this.poll.set(
      `${interaction.targetMessage.id}`,
      "notnotnotnotnotnot"
    );
    if (
      (await this.poll.get(`${interaction.targetMessage.id}`)) ===
      "notnotnotnotnotnot"
    ) {
      if (await this.poll.get(`${interaction.targetMessage.id}_3`)) {
        await interaction.reply({
          embeds: [
            new MessageEmbed()
              .setTitle(
                interaction.targetMessage.embeds[0].title + "の集計結果"
              )
              .setDescription(
                `1番: ${await this.poll.get(
                  `${interaction.targetMessage.id}_1`
                )}票\n2番: ${await this.poll.get(
                  `${interaction.targetMessage.id}_2`
                )}票\n3番: ${await this.poll.get(
                  `${interaction.targetMessage.id}_3`
                )}票`
              )
              .setColor(0x3498db),
          ],
        });
      } else {
        await interaction.reply({
          embeds: [
            new MessageEmbed()
              .setTitle(
                interaction.targetMessage.embeds[0].title + "の集計結果"
              )
              .setDescription(
                `1番: ${await this.poll.get(
                  `${interaction.targetMessage.id}_1`
                )}票\n2番: ${await this.poll.get(
                  `${interaction.targetMessage.id}_2`
                )}票`
              )
              .setColor(0x3498db),
          ],
        });
      }
    } else {
      return await interaction.reply({
        content: "このメッセージはEightBot簡易投票ではありません。",
        ephemeral: true,
      });
    }
  }
}
