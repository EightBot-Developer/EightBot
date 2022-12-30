import { Command, ChatInputCommand } from "@sapphire/framework";
import { MessageButton, MessageActionRow } from "discord.js";
export class Google extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, { ...options });
  }

  public override registerApplicationCommands(
    registry: ChatInputCommand.Registry
  ) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName("google")
        .setDescription("google検索をします。")
        .addStringOption((option) =>
          option
            .setName("検索ワード")
            .setDescription("検索する言葉。")
            .setRequired(true)
        )
    );
  }

  public async chatInputRun(interaction: Command.ChatInputInteraction) {
    try {
      await interaction.reply("検索をしています。");
      const cheerio = require("cheerio");

      const urlRegExp =
        /https?:\/\/([\w\-\.\/\?\,\=\#\:\u3000-\u30FE\u4E00-\u9FA0\uFF01-\uFFE3])+\/([\w\-\.\/\=\?\,\#\:\u3000-\u30FE\u4E00-\u9FA0\uFF01-\uFFE3%0-9])+/;

      const baseUrl = "https://www.google.com/search?q=";

      const userAgents = [
        "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/108.0",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/100.0",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 Edg/108.0.1462.54",
      ];

      const blackList = [
        "https://support.google.com/websearch?p=ws_settings_location",
        "https://www.google.com/preferences",
        "https://policies.google.com/privacy",
        "https://policies.google.com/terms",
        "https://support.google.com",
        "https://www.google.com/",
        "https://accounts.google.com",
        "https://www.google.com/imghp",
        "https://www.google.com/webhp",
      ];

      const reducer = async (a, element) => {
        a = await a;
        const matchGroup = element.attribs.href.match(urlRegExp);
        if (!matchGroup) return a;
        const url = decodeURIComponent(matchGroup[0]);
        if (
          blackList.some((pre) => url.startsWith(pre)) ||
          /https:\/\/[a-w]+\.google\.com\/maps\?q=/.test(url)
        )
          return a;
        const cheerioAPI = cheerio.load(element);
        await new Promise((r) => setImmediate(r));
        const title = cheerioAPI("h3").text();
        if (title) return a.main.push({ title, url }), a;
        a.sub.push({ title: cheerioAPI.text() || "No title", url });
        return a;
      };
      const keyword = interaction.options.getString("検索ワード") || "";
      const url = baseUrl + encodeURIComponent(keyword);
      const userAgent =
        userAgents[Math.floor(Math.random() * (userAgents.length - 1))];
      const headers = { "user-agent": userAgent };
      const response = await fetch(url, { headers });
      await new Promise((r) => setImmediate(r));
      const responseText = await response.text();
      await new Promise((r) => setImmediate(r));
      const cheerioAPI = cheerio.load(responseText);
      await new Promise((r) => setImmediate(r));
      const result = await [...cheerioAPI('#main a[href*="http"]')].reduce(
        reducer,
        {
          main: [],
          sub: [],
        }
      );
      await interaction.editReply({
        content: "検索が完了しました。",
        embeds: [
          {
            title: `${keyword}の検索結果`,
            description: `[**${result.main[0].title}**](${result.main[0].url})\n[**${result.main[1].title}**](${result.main[1].url})\n[**${result.main[2].title}**](${result.main[2].url})\n[**${result.main[3].title}**](${result.main[3].url})`,
            color: 0x3498db,
          },
        ],
      });
    } catch {
      await interaction.editReply({
        content: `${interaction.options.getString(
          "検索ワード"
        )}に一致する情報は見つかりませんでした。`,
      });
    }
  }
}
