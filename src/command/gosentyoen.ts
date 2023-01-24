import { Embed, Interaction } from "../deps/deps.ts";

export class Gosentyoen {
  constructor() {}
  async run(interaction: Interaction) {
    if (!interaction.isApplicationCommand()) return;
    const op = interaction.options;
    await interaction.reply({
      embeds: [
        new Embed()
          .setImage(
            encodeURI(
              `https://gsapi.cbrx.io/image?top=${op[0].value}&bottom=${op[1].value}&type=${op[2].value}&quality=${op[3].value}&hoshii=${op[4].value}&noalpha=${op[5].value}&rainbow=${op[6].value}`
            )
          )
          .setTitle("5000兆円ほしい!!")
          .setFooter({ text: "5000choyen-apiで生成しています。" })
          .setColor("BLUE"),
      ],
    });
  }
}
