import { Command, ChatInputCommand } from "@sapphire/framework";
import {
  MessageActionRow,
  Modal,
  TextInputComponent,
  ModalActionRowComponent,
} from "discord.js";
export class PingCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, { ...options });
  }

  public override registerApplicationCommands(
    registry: ChatInputCommand.Registry
  ) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName("poll")
        .setDescription("簡易投票を作成します。")
        .addIntegerOption((option) =>
          option
            .setName("選択肢の数")
            .setDescription("選択肢の数を入力してください。")
            .addChoices({ name: "2", value: 2 }, { name: "3", value: 3 })
            .setRequired(true)
        )
    );
  }

  public async chatInputRun(interaction: Command.ChatInputInteraction) {
    const modal = new Modal().setCustomId("poll_MODAL").setTitle("poll作成");
    const i = interaction.options.getInteger("選択肢の数");
    const title = new TextInputComponent()
      .setCustomId("title")
      .setLabel("タイトル")
      .setStyle("PARAGRAPH")
      .setRequired(true);
    if (i === 2) {
      const o = new TextInputComponent()
        .setCustomId("1")
        .setLabel("選択肢1")
        .setRequired(true)
        .setStyle("SHORT");
      const t = new TextInputComponent()
        .setCustomId("2")
        .setLabel("選択肢2")
        .setRequired(true)
        .setStyle("SHORT");
      modal.addComponents(
        new MessageActionRow<ModalActionRowComponent>().addComponents(title),
        new MessageActionRow<ModalActionRowComponent>().addComponents(o),
        new MessageActionRow<ModalActionRowComponent>().addComponents(t)
      );
      return await interaction.showModal(modal);
    } else if (i === 3) {
      const o = new TextInputComponent()
        .setCustomId("1")
        .setLabel("選択肢1")
        .setRequired(true)
        .setStyle("SHORT");
      const t = new TextInputComponent()
        .setCustomId("2")
        .setLabel("選択肢2")
        .setRequired(true)
        .setStyle("SHORT");
      const t2 = new TextInputComponent()
        .setCustomId("3")
        .setLabel("選択肢3")
        .setRequired(true)
        .setStyle("SHORT");
      modal.addComponents(
        new MessageActionRow<ModalActionRowComponent>().addComponents(title),
        new MessageActionRow<ModalActionRowComponent>().addComponents(o),
        new MessageActionRow<ModalActionRowComponent>().addComponents(t),
        new MessageActionRow<ModalActionRowComponent>().addComponents(t2)
      );
      return await interaction.showModal(modal);
    } else {
      return await interaction.reply({
        content: "不明なエラーが発生しました。",
        ephemeral: true,
      });
    }
  }
}
