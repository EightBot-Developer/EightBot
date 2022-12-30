import https from "node:https";
import { Command, ChatInputCommand } from "@sapphire/framework";
import { MessageActionRow, MessageButton } from "discord.js";
export class URLShort extends Command {
  shorten: Function;
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, { ...options });
    this.shorten = function (
      url: string | number | boolean,
      cb: (arg0: string) => void
    ) {
      https.get(
        "https://is.gd/create.php?format=simple&url=" + encodeURIComponent(url),
        function (res) {
          var body = "";
          res.on("data", function (chunk) {
            body += chunk;
          });
          res.on("end", function () {
            cb(body);
          });
        }
      );
    };
  }

  public override registerApplicationCommands(
    registry: ChatInputCommand.Registry
  ) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName("url_short")
        .setDescription("URLを短縮します。")
        .addStringOption((input) =>
          input.setName("url").setDescription("短縮するurl").setRequired(true)
        )
    );
  }

  public async chatInputRun(interaction: Command.ChatInputInteraction) {
    this.shorten(
      interaction.options.getString("url") || "",
      async function (res: string) {
        if (
          res ===
          "Error: Sorry, the URL you entered is on our internal blacklist. It may have been used abusively in the past, or it may link to another URL redirection service."
        ) {
          await interaction.reply(
            "is.gdのブラックリストに入っているURLを短縮しようとしています。"
          );
        } else if (res === "Error: Please enter a valid URL to shorten") {
          await interaction.reply("無効なURLを短縮しようとしています。");
        } else if (res.startsWith("https://is.gd/")) {
          await interaction.reply({
            content: `[短縮しました。](${res})`,
            components: [
              new MessageActionRow().addComponents(
                new MessageButton()
                  .setStyle("LINK")
                  .setURL(res)
                  .setLabel("短縮したURLを開く。")
              ),
            ],
          });
        }
      }
    );
  }
}
