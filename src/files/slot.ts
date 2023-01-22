import { Interaction, Embed } from "../deps/deps.ts";

export class Slot {
  constructor() {}
  async run(interaction: Interaction) {
    if (!interaction.isApplicationCommand()) return;
    const arr = [
      "🍏",
      "🍎",
      "🍐",
      "🍊",
      "🍋",
      "🍉",
      "🍇",
      "🫐",
      "🍅",
      "🥝",
      "🍍",
      "🍒",
      "🍈",
      "🍓",
      "🍏",
      "🍎",
      "🍐",
      "🍊",
      "🍋",
      "🍉",
      "🍇",
      "🫐",
      "🍅",
      "🥝",
      "🍍",
      "🍒",
      "🍈",
      "🍓",
      "🍏",
      "🍎",
      "🍐",
      "🍊",
      "🍋",
      "🍉",
      "🍇",
      "🫐",
      "🍅",
      "🥝",
      "🍍",
      "🍒",
      "🍈",
      "🍓",
    ];
    const random = Math.floor(Math.random() * arr.length);
    const result = arr[random];
    const random2 = Math.floor(Math.random() * arr.length);
    const result2 = arr[random2];
    const random3 = Math.floor(Math.random() * arr.length);
    const result3 = arr[random3];
    await interaction.reply({
      embeds: [
        new Embed()
          .setTitle("🎰スロット")
          .setDescription("`" + `${result}｜${result2}｜${result3}` + "`")
          .setColor("BLUE"),
      ],
    });
    let x = 0;
    while (x < 10) {
      x++;
      setTimeout(() => {}, 1000);
      const random = Math.floor(Math.random() * arr.length);
      const result = arr[random];
      const random2 = Math.floor(Math.random() * arr.length);
      const result2 = arr[random2];
      const random3 = Math.floor(Math.random() * arr.length);
      const result3 = arr[random3];
      await interaction.editResponse({
        embeds: [
          new Embed()
            .setTitle("🎰スロット")
            .setDescription("`" + `${result}｜${result2}｜${result3}` + "`")
            .setColor("BLUE"),
        ],
      });
      if (x == 10) {
        if (result === result2 && result2 === result3) {
          await interaction.send({ content: "あなたは勝利しました。" });
        } else {
          await interaction.send({ content: "あなたは負けました。" });
        }
      }
    }
  }
}
