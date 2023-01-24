import { Interaction } from "../deps/deps.ts";

export class DownCheck {
  constructor() {}
  async run(interaction: Interaction) {
    if (!interaction.isApplicationCommand()) return;
    const n = interaction.options[0].value;
    await interaction.reply("現在解析中です。");
    await fetch(`https://downdetector.jp/shougai/${n}`)
      .then((res) => res.text())
      .then(async (dd) => {
        if (dd.indexOf("現在問題がない") != -1) {
          await interaction.editResponse({
            content: "解析が完了しました。",
            embeds: [
              {
                title: "ダウンチェック",
                description: `${n}には現在障害が発生していません。`,
                color: 0x00ff00,
              },
            ],
          });
          return;
        } else if (dd.indexOf("で起こり得る問題") != -1) {
          await interaction.editResponse({
            content: "解析が完了しました。",
            embeds: [
              {
                title: "ダウンチェック",
                description: `${n}には現在障害が発生している可能性があります`,
                color: 0xf5dd42,
              },
            ],
          });
          return;
        } else if (dd.indexOf("での問題を示し") != -1) {
          await interaction.editResponse({
            content: "解析が完了しました。",
            embeds: [
              {
                title: "ダウンチェック",
                description: `${n}には現在障害が発生しています。`,
                color: 0xff0000,
              },
            ],
          });
          return;
        } else if (dd.indexOf("ページが見つかりません") != -1) {
          await interaction.editResponse({
            content: "解析が完了しました。",
            embeds: [
              {
                title: "ダウンチェック",
                description: `${n}というサービスが見つかりませんでした`,
                color: 0x546e7a,
              },
            ],
          });
          return;
        }
      });
  }
}
