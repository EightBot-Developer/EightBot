import { Embed, Interaction } from "../deps/deps.ts";

export class Totuzen {
  constructor() {}
  async run(interaction: Interaction) {
    if (!interaction.isApplicationCommand()) return;
    await interaction.defer();
    const sep_top = "人";
    const sep_left = "＞　";
    const sep_right = "　＜";
    const sep_bottom = "^Y";
    let top = "＿人人人";
    let bottom = "\r\n￣Y^Y^Y";
    let cnt = 0;
    let str = interaction.options[0].value
      ? interaction.options[0].value
      : "突然の死";
    let line = str.match(/\r\n|\n/g);
    if (!line) line = "";
    line = line.length + 1;
    let i = 0;
    if (line > 1) {
      str = str.split(/\r\n|\r|\n/);
      for (i = 0; i < line; i++) {
        if (cnt < str[i].length) cnt = str[i].length;
        str[i] = sep_left + str[i] + sep_right;
      }
      str = str.join("\r\n");
      str = str.replace(/\r\n$/, "");
    } else {
      cnt = str.length;
      str = sep_left + str + sep_right;
    }
    for (i = 1; i < cnt; i++) {
      top += sep_top;
      bottom += sep_bottom;
    }
    top += "＿\r";
    if (cnt > 1) bottom = bottom.replace(/\^Y$/m, "");
    bottom += "￣";
    str = top + str + bottom;
    await interaction.reply({
      embeds: [
        new Embed().setTitle("突然の死").setDescription(str).setColor("BLUE"),
      ],
      allowedMentions: { parse: [] },
      ephemeral: true,
    });
  }
}
