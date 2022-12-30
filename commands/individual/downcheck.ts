import { Command, ChatInputCommand } from "@sapphire/framework";
export class DownCheck extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, { ...options });
  }

  public override registerApplicationCommands(
    registry: ChatInputCommand.Registry
  ) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName("downcheck")
        .setDescription("入力したサービスがダウンしているか調べます。")
        .addStringOption((input) =>
          input
            .setName("サービス名")
            .setDescription("ダウンしているか調べるサービスの名前。")
            .setRequired(true)
        )
    );
  }

  public async chatInputRun(interaction: Command.ChatInputInteraction) {
    await interaction.reply("現在解析中です。");
    await fetch(
      `https://downdetector.jp/shougai/${interaction.options.getString(
        "サービス名"
      )}`
    )
      .then((res) => res.text())
      .then(async (dd) => {
        if (dd.indexOf("現在問題がない") != -1) {
          await interaction.editReply({
            content: "解析が完了しました。",
            embeds: [
              {
                title: "ダウンチェック",
                description: `${interaction.options.getString(
                  "サービス名"
                )}には現在障害が発生していません。`,
                color: 0x00ff00,
              },
            ],
          });
          return;
        } else if (dd.indexOf("で起こり得る問題") != -1) {
          await interaction.editReply({
            content: "解析が完了しました。",
            embeds: [
              {
                title: "ダウンチェック",
                description: `${interaction.options.getString(
                  "サービス名"
                )}には現在障害が発生している可能性があります`,
                color: 0xf5dd42,
              },
            ],
          });
          return;
        } else if (dd.indexOf("での問題を示し") != -1) {
          await interaction.editReply({
            content: "解析が完了しました。",
            embeds: [
              {
                title: "ダウンチェック",
                description: `${interaction.options.getString(
                  "サービス名"
                )}には現在障害が発生しています。`,
                color: 0xff0000,
              },
            ],
          });
          return;
        } else if (dd.indexOf("ページが見つかりません") != -1) {
          await interaction.editReply({
            content: "解析が完了しました。",
            embeds: [
              {
                title: "ダウンチェック",
                description: `${interaction.options.getString(
                  "サービス名"
                )}というサービスが見つかりませんでした`,
                color: 0x546e7a,
              },
            ],
          });
          return;
        }
      });
  }
}
