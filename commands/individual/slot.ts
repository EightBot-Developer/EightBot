import { Command, ChatInputCommand } from "@sapphire/framework";
import { setTimeout } from "node:timers/promises";
export class Slot extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, { ...options });
  }

  public override registerApplicationCommands(
    registry: ChatInputCommand.Registry
  ) {
    registry.registerChatInputCommand((builder) =>
      builder.setName("slot").setDescription("slotをします。")
    );
  }

  public async chatInputRun(interaction: Command.ChatInputInteraction) {
    let arr = [
      "🍏",
      "🍎",
      "🍐",
      "🍊",
      "🍋",
      "🍉",
      "🍇",
      "🫐",
      "🍅",
      "🥝",
      "🍍",
      "🍒",
      "🍈",
      "🍓",
    ];
    var random = Math.floor(Math.random() * arr.length);
    var result = arr[random];
    var random2 = Math.floor(Math.random() * arr.length);
    var result2 = arr[random2];
    var random3 = Math.floor(Math.random() * arr.length);
    var result3 = arr[random3];
    await interaction.reply(result + result2 + result3);
    let x = 0;
    while (x < 10) {
      x++;
      await setTimeout(1000);
      var random = Math.floor(Math.random() * arr.length);
      var result = arr[random];
      var random2 = Math.floor(Math.random() * arr.length);
      var result2 = arr[random2];
      var random3 = Math.floor(Math.random() * arr.length);
      var result3 = arr[random3];
      await interaction.editReply(result + result2 + result3);
      if (x == 10) {
        if (result === result2 && result2 === result3) {
          await interaction.followUp("あなたは勝利しました。");
        } else {
          await interaction.followUp("あなたは負けました。");
        }
      }
    }
  }
}
