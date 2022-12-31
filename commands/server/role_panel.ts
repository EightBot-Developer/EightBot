import { Command, ChatInputCommand } from "@sapphire/framework";
import { MessageActionRow, MessageSelectMenu } from "discord.js";
import Keyv from "keyv";

export class BanMember extends Command {
  role: Keyv;

  public constructor(context: Command.Context, options: Command.Options) {
    super(context, { ...options });
  }

  public override registerApplicationCommands(
    registry: ChatInputCommand.Registry
  ) {
    registry.registerChatInputCommand((builder) =>
      builder.setName("role_panel").setDescription("ロールパネル")
    );
    this.role = new Keyv("sqlite://db/role_panel.sqlite", {
      table: "role_panel_mesg",
    });
    this.role.on("error", (e) => this.container.logger.info(e));
  }

  public async chatInputRun(interaction: Command.ChatInputInteraction) {
    if (!interaction.guild)
      return await interaction.reply({
        content: "ここはサーバーではありません。",
        ephemeral: true,
      });
    function buildComponents(roles, customId) {
      return [
        new MessageActionRow().addComponents(
          new MessageSelectMenu()
            .setCustomId(customId)
            .setMinValues(0)
            .setMaxValues(roles.length)
            .addOptions(
              roles.map(([role, selected]) => ({
                label: role.name,
                value: role.id,
                default: selected,
              }))
            )
        ),
      ];
    }
    await interaction.reply({
      content: "セレクトメニューをクリックしてロールを選んでね。",
    });
    const msg = await interaction.channel?.send({
      content: "ロールパネルに追加するロールを選択してください。",
      components: buildComponents(
        [...interaction.guild.roles.cache.values()]
          .slice(0, 25)
          .map((e) => [e, false]),
        "role_panel_adds_seleectttt"
      ),
    });
    await this.role.set(msg?.id || "", interaction.user.id);
  }
}
