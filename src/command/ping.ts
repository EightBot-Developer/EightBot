import { Client, Embed, Interaction } from "../deps/deps.ts";

export class Ping {
  constructor() {}
  async run(client: Client, interaction: Interaction) {
    if (!interaction.isApplicationCommand()) return;
    await interaction.reply({
      embeds: [
        new Embed()
          .setTitle("🏓Pong!")
          .setDescription(`${client.gateway.ping}ms!`)
          .setColor("BLUE"),
      ],
      ephemeral: true,
    });
  }
}
