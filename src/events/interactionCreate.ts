import config from "../config.js";

import {
  Collection,
  Events,
  SnowflakeUtil,
  PermissionFlagsBits,
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
        interaction.error(
          "❌コマンドがありません",
          `そのコマンドは存在しません。`
        );
        return;
      }

      if (
        interaction.client.rebootFlag === 1 &&
        !config.executable.mod.includes(interaction.user.id)
      )
        return interaction.error(
          "⏲起動中",
          "現在起動中です。\n起動完了までしばらくお待ちください…"
        );

      if (command.guildOnly && !interaction.guild) {
        return interaction.error(
          "🧩サーバー専用コマンド",
          "このコマンドはサーバー内でしか使用できません。"
        );
      }

      if (command.permissions) {
        const authorPerms = interaction.channel.permissionsFor(
          interaction.user
        );
        if (
          !authorPerms ||
          !command.permissions.every((perm) =>
            authorPerms.has(PermissionFlagsBits[perm])
          )
        ) {
          return interaction.error(
            "🧰権限不足",
            "あなたにこのコマンドを実行する権限がありません\nこのコマンドを実行するにはあなたに`" +
              command.permissions.join(", ") +
              "`の権限が必要です"
          );
        }
      }

      if (command.modOnly) {
        if (!config.executable.mod.includes(interaction.user.id)) {
          return interaction.error(
            "👮モデレーター専用コマンド",
            "あなたはこのコマンドを実行できません"
          );
        }
      }

      if (command.adminOnly) {
        if (!config.executable.admin.includes(interaction.user.id)) {
          return interaction.error(
            "🌟管理者専用コマンド",
            "あなたはこのコマンドを実行できません"
          );
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
          return interaction.error(
            "💧コマンドクールダウン",
            `クールダウン中です\nあと\`${timeLeft.toFixed(1)}\`秒お待ちください`
          );
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
              interaction.error(
                "❌エラー",
                "原因不明のエラーが発生しました。\n下のエラーIDを控えて、サポートサーバーでお問い合わせください。\n\nエラーID:`" +
                  errorId +
                  "`\n開発者用エラーメッセージ:```js\n" +
                  error +
                  "\n```"
              );
            } else if (interaction.deferred) {
              interaction.error(
                "❌エラー",
                "原因不明のエラーが発生しました。\n下のエラーIDを控えて、サポートサーバーでお問い合わせください。\n\nエラーID:`" +
                  errorId +
                  "`\n開発者用エラーメッセージ:```js\n" +
                  error +
                  "\n```",
                true
              );
            } else {
              interaction.errorUpdate(
                "❌エラー",
                "原因不明のエラーが発生しました。\n下のエラーIDを控えて、サポートサーバーでお問い合わせください。\n\nエラーID:`" +
                  errorId +
                  "`\n開発者用エラーメッセージ:```js\n" +
                  error +
                  "\n```"
              );
            }
            const ch = interaction.client.channels.cache.get(
              config.logChannelId
            );
            if (ch.isTextBased()) {
              await ch.send({
                content: `${config.executable.admin
                  .map((x) => `<@${x}>`)
                  .join(",")}`,
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
                          require("util").inspect(error).slice(0, 1000) +
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
        interaction.error(
          "❌エラー",
          "原因不明のエラーが発生しました。\n下のエラーIDを控えて、サポートサーバーでお問い合わせください。\n\nエラーID:`" +
            errorId +
            "`\n開発者用エラーメッセージ:```js\n" +
            error +
            "\n```"
        );
        const ch = interaction.client.channels.cache.get(config.logChannelId);
        if (ch.isTextBased()) {
          await ch.send({
            content: `${config.executable.admin
              .map((x) => `<@${x}>`)
              .join(",")}`,
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
                      require("util").inspect(error).slice(0, 1000) +
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
