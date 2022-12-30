import { Command, ChatInputCommand } from "@sapphire/framework";
import { MessageEmbed, MessageActionRow, MessageButton } from "discord.js";
export class BotInvite extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, { ...options });
  }

  public override registerApplicationCommands(
    registry: ChatInputCommand.Registry
  ) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName("bot_invite")
        .setDescription("指定したBotの招待リンクを生成します。")
        .addUserOption((input) =>
          input.setName("bot").setDescription("Bot").setRequired(true)
        )
    );
  }

  public async chatInputRun(interaction: Command.ChatInputInteraction) {
    const user = interaction.options.getUser("bot");
    if (!user?.bot)
      return await interaction.reply({
        content: "指定したBotはユーザーです。",
        ephemeral: true,
      });
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setLabel("管理者権限で招待")
          .setStyle("LINK")
          .setURL(
            `https://discord.com/api/oauth2/authorize?client_id=${user?.id}&permissions=8&scope=bot%20applications.commands`
          )
      )
      .addComponents(
        new MessageButton()
          .setLabel("権限を選択して招待")
          .setStyle("LINK")
          .setURL(
            `https://discord.com/api/oauth2/authorize?client_id=${user?.id}&permissions=4398046511095&scope=bot%20applications.commands`
          )
      )
      .addComponents(
        new MessageButton()
          .setLabel("権限なしで招待")
          .setStyle("LINK")
          .setURL(
            `https://discord.com/api/oauth2/authorize?client_id=${user?.id}&permissions=0&scope=bot%20applications.commands`
          )
      );
    await interaction.reply({
      embeds: [
        new MessageEmbed()
          .setTitle(`${user?.tag}を招待。`)
          .setDescription(
            `以下のボタンをクリックすることで、${user?.tag}を招待出来ます。`
          )
          .setColor(0x3498db),
      ],
      components: [row],
    });
  }
}
