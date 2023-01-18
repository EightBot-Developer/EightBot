import { Embed, Interaction, User } from "../deps/deps.ts";

export class Invite {
  constructor() {}
  async run(interaction: Interaction) {
    if (!interaction.isApplicationCommand()) return;
    const user_id: string = interaction.options[0].value;
    const user: User =
      (await interaction.client.users.get(user_id)) || interaction.user;
    if (!user?.bot)
      return await interaction.reply({
        embeds: [
          new Embed()
            .setTitle(`<:x_:1061166079495389196> : 失敗`)
            .setDescription(`指定したBotはユーザーです。`)
            .setColor("RED"),
        ],
        ephemeral: true,
      });
    await interaction.reply({
      embeds: [
        new Embed()
          .setTitle(`${user?.tag}を招待。`)
          .setDescription(
            `以下のボタンをクリックすることで、${user?.tag}を招待出来ます。`
          )
          .setColor("BLUE"),
      ],
      components: [
        {
          type: "ACTION_ROW",
          components: [
            {
              type: "BUTTON",
              label: "管理者権限で招待",
              style: "LINK",
              url: `https://discord.com/api/oauth2/authorize?client_id=${user?.id}&permissions=8&scope=bot%20applications.commands`,
            },
            {
              type: "BUTTON",
              label: "権限を選択して招待",
              style: "LINK",
              url: `https://discord.com/api/oauth2/authorize?client_id=${user?.id}&permissions=4398046511095&scope=bot%20applications.commands`,
            },
            {
              type: "BUTTON",
              label: "権限なしで招待",
              style: "LINK",
              url: `https://discord.com/api/oauth2/authorize?client_id=${user?.id}&permissions=0&scope=bot%20applications.commands`,
            },
          ],
        },
      ],
      ephemeral: true,
    });
  }
}
