import { Command, ChatInputCommand } from "@sapphire/framework";
import { Role } from "discord.js";
export class RoleAll extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, { ...options });
  }

  public override registerApplicationCommands(
    registry: ChatInputCommand.Registry
  ) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName("role_all")
        .setDescription("すべてのユーザーにロールをOOするサブコマンド。")
        .addSubcommand((input) =>
          input
            .setName("add")
            .setDescription("すべてのユーザーにロールを付与します。")
            .addRoleOption((input) =>
              input
                .setName("ロール")
                .setDescription("付与するロール")
                .setRequired(true)
            )
            .addStringOption((input) =>
              input
                .setName("botにも付与するか")
                .setDescription("botにも付与するか")
                .addChoices(
                  { name: "はい", value: "true" },
                  { name: "いいえ", value: "false" }
                )
                .setRequired(true)
            )
        )
        .addSubcommand((input) =>
          input
            .setName("remove")
            .setDescription("すべてのユーザーにロールをはく奪します。")
            .addRoleOption((input) =>
              input
                .setName("ロール")
                .setDescription("はく奪するロール")
                .setRequired(true)
            )
            .addStringOption((input) =>
              input
                .setName("botにもはく奪するか")
                .setDescription("botにもはく奪するか")
                .addChoices(
                  { name: "はい", value: "true" },
                  { name: "いいえ", value: "false" }
                )
                .setRequired(true)
            )
        )
    );
  }

  public async chatInputRun(interaction: Command.ChatInputInteraction) {
    if (!interaction.guild)
      return await interaction.reply({
        content: "ここはサーバーではありません。",
        ephemeral: true,
      });
    await interaction.deferReply();

    if (interaction.options.getSubcommand() === "add") {
      const role = interaction.options.getRole("ロール");
      await interaction.guild.members.fetch().then((members) =>
        Promise.all(members.map((member) => member.roles.add(`${role?.id}`)))
          .then(async () => {
            await interaction.editReply({
              content: "ロールの付与に成功しました。",
            });
          })
          .catch(async (e) => {
            console.log(e);
            return await interaction.editReply({
              content: "ロールの付与に失敗しました。",
            });
          })
      );
    } else if (interaction.options.getSubcommand() === "remove") {
      const role = interaction.options.getRole("ロール");
      await interaction.guild.members.fetch().then((members) =>
        Promise.all(members.map((member) => member.roles.remove(`${role?.id}`)))
          .then(async () => {
            return await interaction.editReply({
              content: "ロールの剥奪に成功しました。",
            });
          })
          .catch(async (e) => {
            console.log(e);
            return await interaction.editReply({
              content: "ロールの付与に失敗しました。",
            });
          })
      );
    }
  }
}
