import config from "../config.js";

import {
  Collection,
  Events,
  SnowflakeUtil,
  PermissionFlagsBits,
  EmbedBuilder,
  BaseInteraction,
} from "discord.js";

export default {
  name: Events.InteractionCreate,
  async execute(interaction: BaseInteraction) {
    if (interaction.isCommand()) {
      const { commandName, options: args } = interaction;

      const command =
        interaction.client.slash.get(commandName) ||
        interaction.client.slash.find(
          (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
        );

      if (!command) {
        return await interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle(
                "<:x_:1061166079495389196> | 失敗 - ❌コマンドが見つかりません"
              )
              .setDescription("コマンドが存在しません。")
              .setColor("Blue"),
          ],
          ephemeral: true,
        });
      }

      if (interaction.client.rebootFlag === 1)
        return await interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle("<:x_:1061166079495389196> | 失敗 - ⏲起動中")
              .setDescription(
                "現在起動中です。\n起動完了までしばらくお待ちください…"
              )
              .setColor("Blue"),
          ],
          ephemeral: true,
        });

      if (command.guildOnly && !interaction.guild) {
        return await interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle(
                "<:x_:1061166079495389196> | 失敗 - 🧩サーバー専用コマンド"
              )
              .setDescription("このコマンドはサーバー内でしか使用できません。")
              .setColor("Blue"),
          ],
          ephemeral: true,
        });
      }

      if (command.adminOnly) {
        if (!config.executable.admin.includes(interaction.user.id)) {
          return await interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle(
                  "<:x_:1061166079495389196> | 失敗 - 🌟管理者専用コマンド"
                )
                .setDescription("あなたはこのコマンドを実行できません")
                .setColor("Blue"),
            ],
            ephemeral: true,
          });
        }
      }

      const { cooldowns } = interaction.client;

      if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Collection());
      }

      const now = Date.now();
      const timestamps = cooldowns.get(command.name);
      const cooldownAmount =
        (command.cooldown || config.defaultCooldown) * 1000;

      if (timestamps.has(interaction.user.id)) {
        const expirationTime =
          timestamps.get(interaction.user.id) + cooldownAmount;

        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;

          return await interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle(
                  "<:x_:1061166079495389196> | 失敗 - 🕑コマンドクールダウン"
                )
                .setDescription(
                  `クールダウン中です\nあと\`${timeLeft.toFixed(
                    1
                  )}\`秒お待ちください。`
                )
                .setColor("Blue"),
            ],
            ephemeral: true,
          });
        }
      }

      timestamps.set(interaction.user.id, now);
      setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
      try {
        await command
          .execute(interaction, interaction.client, args)
          ?.catch(async (error) => {
            console.error(error);
            const errorId = SnowflakeUtil.generate();
            if (!interaction.replied && !interaction.deferred) {
              await interaction.reply({
                embeds: [
                  new EmbedBuilder()
                    .setTitle("<:x_:1061166079495389196> | 失敗 - ❌エラー")
                    .setDescription(
                      "エラーが発生しました。\n下のエラーIDを控えて、サポートサーバーでお問い合わせください。\nエラーID: " +
                        errorId +
                        "`\n開発者用エラーメッセージ:```js\n" +
                        error +
                        "\n```"
                    )
                    .setColor("Blue"),
                ],
              });
            } else if (interaction.deferred) {
              await interaction.reply({
                embeds: [
                  new EmbedBuilder()
                    .setTitle("<:x_:1061166079495389196> | 失敗 - ❌エラー")
                    .setDescription(
                      "エラーが発生しました。\n下のエラーIDを控えて、サポートサーバーでお問い合わせください。\nエラーID: " +
                        errorId +
                        "`\n開発者用エラーメッセージ:```js\n" +
                        error +
                        "\n```"
                    )
                    .setColor("Blue"),
                ],
              });
            } else {
              await interaction.reply({
                embeds: [
                  new EmbedBuilder()
                    .setTitle("<:x_:1061166079495389196> | 失敗 - ❌エラー")
                    .setDescription(
                      "エラーが発生しました。\n下のエラーIDを控えて、サポートサーバーでお問い合わせください。\nエラーID: " +
                        errorId +
                        "`\n開発者用エラーメッセージ:```js\n" +
                        error +
                        "\n```"
                    )
                    .setColor("Blue"),
                ],
              });
            }
            const ch = interaction.client.channels.cache.get(
              config.logChannelId
            );
            if (ch.isTextBased()) {
              await ch.send({
                content: `<@510590521811402752> 対応してください`,
                embeds: [
                  {
                    title: "エラーが発生しています",
                    fields: [
                      {
                        name: "エラーID",
                        value: String(errorId),
                      },
                      {
                        name: "エラー",
                        value:
                          "```js\n" +
                          (await import("util")).inspect(error).slice(0, 1000) +
                          "\n```",
                      },
                    ],
                  },
                ],
              });
            }
          });
      } catch (error) {
        console.error(error);
        const errorId = SnowflakeUtil.generate();
        await interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle("<:x_:1061166079495389196> | 失敗 - ❌エラー")
              .setDescription(
                "エラーが発生しました。開発者側のミスの可能性が高いです。\n下のエラーIDを控えて、サポートサーバーでお問い合わせください。\nエラーID: " +
                  errorId +
                  "`\n開発者用エラーメッセージ:```js\n" +
                  error +
                  "\n```"
              )
              .setColor("Blue"),
          ],
        });
        const ch = interaction.client.channels.cache.get(config.logChannelId);
        if (ch.isTextBased()) {
          await ch.send({
            content: `<@510590521811402752> 対応してください`,
            embeds: [
              {
                title: "エラーが発生しています",
                fields: [
                  {
                    name: "エラーID",
                    value: String(errorId),
                  },
                  {
                    name: "エラー",
                    value:
                      "```js\n" +
                      (await import("util")).inspect(error).slice(0, 1000) +
                      "\n```",
                  },
                ],
              },
            ],
          });
        }
      }
    }
  },
};
