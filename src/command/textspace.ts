import { Interaction } from "../deps/deps.ts";

export class TextSpace {
  constructor() {}
  async run(interaction: Interaction) {
    if (!interaction.isApplicationCommand()) return;
    const op =
      interaction.targetMessage?.content || "メッセージの内容がありません。";
    const result = op.split("");
    let newText = "";

    for (let i = 0; i < result.length; i++) {
      newText += result[i] + "　";
    }
    await interaction.reply({ content: newText, ephemeral: true });
  }
}
