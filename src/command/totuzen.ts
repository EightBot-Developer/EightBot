import { Embed, Interaction } from "../deps/deps.ts";

export class Totuzen {
  constructor() {}
  async run(interaction: Interaction) {
    if (!interaction.isApplicationCommand()) return;
    await interaction.defer();
    // deno-lint-ignore no-control-regex
    const ZENREG = /[^\x01-\x7E\xA1-\xDF]/g;

    function repeat(c: string, count: number): string {
      // deno-lint-ignore no-inferrable-types
      let ret: string = "";
      for (let i = 0; i < count; i += 1) {
        ret += c;
      }
      return ret;
    }

    function convert(text: string) {
      const lines = text.split(/\r?\n/).map((ln) => {
        const t = ln.trim();
        return {
          text: t,
          len: t.replace(ZENREG, "aa").length + 2, // 全角は２桁として扱いたい
        };
      });
      const maxLen = lines.reduce((max, c) => (max < c.len ? c.len : max), 0);

      const ret = lines
        .map((ln) => {
          let wk = ln.text;
          if (ln.len < maxLen) {
            const pad = (maxLen - ln.len) / 2;
            wk = repeat(" ", Math.floor(pad)) + wk;
            wk += repeat(" ", Math.ceil(pad)); // 中央寄せの調整を行う
          }
          return wk.replace(/$/g, " ＜").replace(/^/g, "＞ ");
        })
        .join("\n");

      const count = Math.floor(maxLen / 2);
      const header = `＿${repeat("人", count)}＿\n`;
      const footer = `\n￣${repeat("Ｙ", count)}￣`;

      return header + ret + footer;
    }
    await interaction.editResponse({
      embeds: [
        new Embed()
          .setTitle("突然の死")
          .setDescription(convert(interaction.options[0].value))
          .setColor(""),
      ],
      allowedMentions: { parse: [] },
      ephemeral: true,
    });
  }
}
