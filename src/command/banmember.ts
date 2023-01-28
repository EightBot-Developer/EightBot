import { Embed, Interaction } from "../deps/deps.ts";

export class BanMember {
  constructor() {}
  async run(interaction: Interaction) {
    if (!interaction.isApplicationCommand()) return;
    if (interaction.guild) {
      const bans = await interaction.guild.bans.all();
      const str =
        bans.map((ban) => ban.user.tag).join(", ") ||
        "Banされたユーザーがいません。";
      if (str.length > 4096) {
        const str2 = str.substring(4096, str.length);
        await interaction.reply({
          embeds: [
            new Embed()
              .setTitle("Banされたユーザー一覧")
              .setDescription(str)
              .setColor(0x3498db),
            new Embed()
              .setTitle("Banされたユーザー一覧")
              .setDescription(str2)
              .setColor(0x3498db),
          ],
        });
      } else {
        await interaction.reply({
          embeds: [
            new Embed()
              .setTitle("Banされたユーザー一覧")
              .setDescription(str)
              .setColor(0x3498db),
          ],
        });
      }
    } else {
      await interaction.reply({
        content: "ここはサーバーではありません。",
        ephemeral: true,
      });
    }
  }
}
