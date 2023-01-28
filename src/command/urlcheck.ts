import { Interaction } from "../deps/deps.ts";

export class URLCheck {
  constructor() {}
  async run(interaction: Interaction) {
    if (!interaction.isApplicationCommand()) return;
    try {
      await interaction.defer();
      const url = interaction.options[0].value || "";
      await fetch(
        `https://safeweb.norton.com/report/show?url=${encodeURI(url)}&ulang=jpn`
      )
        .then((res) => res.text())
        .then(async (norton) => {
          //NortonSafeWebにアクセス
          if (norton.indexOf("安全性") != -1) {
            await interaction.editResponse({
              embeds: [
                {
                  title: "結果は安全です。",
                  description: `ノートン セーフウェブが ${url} を分析して安全性とセキュリティの問題を調べました。`,
                  footer: {
                    text: "Powered by Norton Safeweb",
                  },
                  color: 0x00ff00,
                },
              ],
            });
          } else if (norton.indexOf("［注意］") != -1) {
            await interaction.editResponse({
              embeds: [
                {
                  title: "結果は注意です。",
                  description: `［注意］の評価を受けた Web サイトは少数の脅威または迷惑を伴いますが、赤色の［警告］に相当するほど危険とは見なされません。サイトにアクセスする場合には注意が必要です。`,
                  footer: {
                    text: "Powered by Norton Safeweb",
                  },
                  color: 0xf5dd42,
                },
              ],
            });
          } else if (norton.indexOf("警告") != -1) {
            await interaction.editResponse({
              embeds: [
                {
                  title: "結果は警告です。",
                  description: `これは既知の危険な Web ページです。このページを表示**しない**ことを推奨します。`,
                  footer: {
                    text: "Powered by Norton Safeweb",
                  },
                  color: 0xff0000,
                },
              ],
            });
          } else {
            await interaction.editResponse({
              embeds: [
                {
                  title: "結果は未評価です。",
                  description: `このサイトはまだ評価されていません。`,
                  footer: {
                    text: "Powered by Norton Safeweb",
                  },
                  color: 0x546e7a,
                },
              ],
            });
          }
        });
    } catch {
      await interaction.editResponse({
        content: "解析中にエラーが発生しました。",
      });
    }
  }
}
