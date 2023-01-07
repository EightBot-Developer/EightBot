import { ApplicationCommandInteraction, Embed } from "../../deps/deps.ts";
class Command {
  constructor() {}
  async run(interaction: ApplicationCommandInteraction) {
    await interaction.reply({
      embeds: [
        new Embed()
          .setTitle("🏓Pong!")
          .setDescription(`${interaction.client.gateway.ping}ms!`)
          .setColor("BLUE"),
      ],
      ephemeral: true,
    });
  }
}

export default Command;
