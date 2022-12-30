import { Command, ChatInputCommand } from "@sapphire/framework";
import {
  TextInputComponent,
  MessageActionRow,
  ModalActionRowComponent,
  Modal,
} from "discord.js";

export class Embed extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, { ...options });
  }

  public override registerApplicationCommands(
    registry: ChatInputCommand.Registry
  ) {
    registry.registerChatInputCommand((builder) =>
      builder.setName("embed").setDescription("Embedを生成できます。")
    );
  }

  public async chatInputRun(interaction: Command.ChatInputInteraction) {
    const title = new TextInputComponent()
      .setCustomId("em_ti")
      .setLabel("タイトル")
      .setRequired(true)
      .setStyle("PARAGRAPH")
      .setMaxLength(256);
    const description = new TextInputComponent()
      .setCustomId("em_de")
      .setLabel("説明")
      .setRequired(true)
      .setStyle("PARAGRAPH")
      .setMaxLength(4000);
    const modal = new Modal()
      .setCustomId("embed_modal")
      .setTitle("Embed作成")
      .addComponents(
        new MessageActionRow<ModalActionRowComponent>().addComponents(title),
        new MessageActionRow<ModalActionRowComponent>().addComponents(
          description
        )
      );
    await interaction.showModal(modal);
  }
}
