import { Interaction } from "../deps/deps.ts";
import { get } from "https://deno.land/std@0.174.0/node/https.ts";
export class URLShort {
  // deno-lint-ignore ban-types
  shorten: Function;

  constructor() {
    this.shorten = function (
      url: string | number | boolean,
      cb: (arg0: string) => void
    ) {
      get(
        "https://is.gd/create.php?format=simple&url=" + encodeURIComponent(url),
        function (res) {
          let body = "";
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

  run(interaction: Interaction) {
    if (!interaction.isApplicationCommand()) return;
    this.shorten(
      interaction.options[0].value || "",
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
              {
                type: "ACTION_ROW",
                components: [
                  {
                    type: "BUTTON",
                    label: "短縮したURLを開く。",
                    style: "LINK",
                    url: res,
                  },
                ],
              },
            ],
          });
        }
      }
    );
  }
}
