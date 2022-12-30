import { Command, ChatInputCommand } from "@sapphire/framework";

export class UrlCheck extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, { ...options });
  }

  public override registerApplicationCommands(
    registry: ChatInputCommand.Registry
  ) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName("url_check")
        .setDescription("URLが安全かチェックします。")
        .addStringOption((input) =>
          input
            .setName("url")
            .setDescription("チェックしたいurl")
            .setRequired(true)
        )
    );
  }

  public async chatInputRun(interaction: Command.ChatInputInteraction) {
    try{
    const url = interaction.options.getString("url") || "";
    await fetch(`https://safeweb.norton.com/report/show?url=${encodeURI(url)}&ulang=jpn`).then(res => res.text()).then(async norton => { //NortonSafeWebにアクセス
    if (norton.indexOf("安全性") != -1) {
await interaction.reply({embeds: [{
               title: "結果は安全です。",
               description: `ノートン セーフウェブが ${url} を分析して安全性とセキュリティの問題を調べました。`,
               footer: {
                   text: "Powered by Norton Safeweb"
               },
               color: 0xffd700
               }]})
        } else if (norton.indexOf("［注意］") != -1) {
        await interaction.reply({embeds: [{
               title: "結果は注意です。",
               description: `［注意］の評価を受けた Web サイトは少数の脅威または迷惑を伴いますが、赤色の［警告］に相当するほど危険とは見なされません。サイトにアクセスする場合には注意が必要です。`,
                   footer: {
                   text: "Powered by Norton Safeweb"
               },
               color: 0xffd700
        }]})
        } else if (norton.indexOf("警告") != -1) {
        await interaction.reply({embeds: [{
               title: "結果は警告です。",
               description: `これは既知の危険な Web ページです。このページを表示**しない**ことを推奨します。`,
                   footer: {
                   text: "Powered by Norton Safeweb"
               },
               color: 0xffd700
               }]})
        } else {
            await interaction.reply({embeds: [{
               title: "結果は未評価です。",
               description: `このサイトはまだ評価されていません。`,
                   footer: {
                   text: "Powered by Norton Safeweb"
               },
               color: 0xffd700
               }]})
        }
       });
   } catch  {
    interaction.reply("解析中にエラーが発生しました。")
   }
  }
}
