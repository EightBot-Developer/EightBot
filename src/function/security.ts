import { ChannelType, EmbedBuilder, Message } from "discord.js";
import Keyv from "keyv";
import { TokenSecurityLevel } from "../lib/security.js";
const token_db = new Keyv("sqlite://db/security.sqlite", {
  table: "token_channels",
});
const bot_log = new Keyv("sqlite://db/security_log.sqlite", {
  table: "channels",
});

export async function security_func(message: Message) {
  // token block
  const channels: Array<String> = await token_db.get("channels");
  channels.forEach(async (value) => {
    if (value === message.channelId) {
      const level: string = await token_db.get(message.channelId);
      if (
        message.content.match(
          /[0-9a-zA-Z_\-]{24}\.[0-9a-zA-Z_\-]{6}\.[0-9a-zA-Z_\-]{38}/
        ) ||
        message.content.match(
          /[0-9a-zA-Z_\-]{24}\.[0-9a-zA-Z_\-]{6}\.[0-9a-zA-Z_\-]{27}/
        )
      ) {
        switch (level) {
          case TokenSecurityLevel.Ban:
            const ch: boolean = await bot_log.get(message.channelId);
            if (!ch)
              return await message.member.ban({
                deleteMessageSeconds: 604800,
                reason:
                  "EightBot トークン検知システムで検知したため、Banしました。",
              });
            await message.member
              .ban({
                deleteMessageSeconds: 604800,
                reason:
                  "EightBot トークン検知システムで検知したため、Banしました。",
              })
              .then(async (m) => {
                const channel = message.client.channels.cache.get(
                  message.channelId
                );
                if (channel.isTextBased()) {
                  channel.send({
                    embeds: [
                      new EmbedBuilder()
                        .setAuthor({
                          name: `${m.user.tag} (${m.user.id})`,
                          iconURL: m.user.avatarURL(),
                        })
                        .setColor("Red")
                        .setTimestamp()
                        .addFields(
                          {
                            name: "Banされたユーザー",
                            value: m.user.tag + "" + ` (${m.user.id})`,
                            inline: false,
                          },
                          {
                            name: "理由",
                            value: "Tokenを送信したため。",
                            inline: false,
                          }
                        )
                        .setFooter({ text: `EightBot Security` }),
                    ],
                  });
                }
              });
            break;
          case TokenSecurityLevel.Kick:
            const ch2: boolean = await bot_log.get(message.channelId);
            if (!ch2)
              return await message.member.kick(
                "EightBot トークン検知システムで検知したため、Kickしました。"
              );
            await message.member
              .kick(
                "EightBot トークン検知システムで検知したため、Kickしました。"
              )
              .then(async (m) => {
                const channel = message.client.channels.cache.get(
                  message.channelId
                );
                if (channel.isTextBased()) {
                  channel.send({
                    embeds: [
                      new EmbedBuilder()
                        .setAuthor({
                          name: `${m.user.tag} (${m.user.id})`,
                          iconURL: m.user.avatarURL(),
                        })
                        .setColor("Red")
                        .setTimestamp()
                        .addFields(
                          {
                            name: "Kickされたユーザー",
                            value: m.user.tag + "" + ` (${m.user.id})`,
                            inline: false,
                          },
                          {
                            name: "理由",
                            value: "Tokenを送信したため。",
                            inline: false,
                          }
                        )
                        .setFooter({ text: `EightBot Security` }),
                    ],
                  });
                }
              });
            break;
          case TokenSecurityLevel.MessageDelete:
            const ch3: boolean = await bot_log.get(message.channelId);
            if (!ch3) return await message.delete();
            await message.delete().then(async (m) => {
              const channel = message.client.channels.cache.get(
                message.channelId
              );
              if (channel.isTextBased()) {
                channel.send({
                  embeds: [
                    new EmbedBuilder()
                      .setAuthor({
                        name: `${m.author.tag} (${m.author.id})`,
                        iconURL: m.author.avatarURL(),
                      })
                      .setColor("Red")
                      .setTimestamp()
                      .addFields(
                        {
                          name: "メッセージを削除されたユーザー",
                          value: m.author.tag + "" + ` (${m.author.id})`,
                          inline: false,
                        },
                        {
                          name: "理由",
                          value: "Tokenを送信したため。",
                          inline: false,
                        }
                      )
                      .setFooter({ text: `EightBot Security` }),
                  ],
                });
              }
            });
            break;
          case TokenSecurityLevel.MessageWarn:
            const ch4: boolean = await bot_log.get(message.channelId);
            if (!ch4)
              return await message.reply({
                content: "Tokenを送信しないでください。",
              });
            await message.delete().then(async (m) => {
              const channel = message.client.channels.cache.get(
                message.channelId
              );
              if (channel.isTextBased()) {
                channel.send({
                  embeds: [
                    new EmbedBuilder()
                      .setAuthor({
                        name: `${m.author.tag} (${m.author.id})`,
                        iconURL: m.author.avatarURL(),
                      })
                      .setColor("Red")
                      .setTimestamp()
                      .addFields(
                        {
                          name: "TOKENを送信したユーザー",
                          value: m.author.tag + "" + ` (${m.author.id})`,
                          inline: false,
                        },
                        {
                          name: "理由",
                          value: "Tokenを送信したため。",
                          inline: false,
                        }
                      )
                      .setFooter({ text: `EightBot Security` }),
                  ],
                });
              }
            });
            break;
          case TokenSecurityLevel.Timeout:
            const ch5: boolean = await bot_log.get(message.channelId);
            if (!ch5)
              return await message.member.timeout(
                604800,
                "EightBot トークン検知システムで検知したため、Timeoutしました。"
              );
            await message.member
              .timeout(
                604800,
                "EightBot トークン検知システムで検知したため、Timeoutしました。"
              )
              .then(async (m) => {
                const channel = message.client.channels.cache.get(
                  message.channelId
                );
                if (channel.isTextBased()) {
                  channel.send({
                    embeds: [
                      new EmbedBuilder()
                        .setAuthor({
                          name: `${m.user.tag} (${m.user.id})`,
                          iconURL: m.user.avatarURL(),
                        })
                        .setColor("Red")
                        .setTimestamp()
                        .addFields(
                          {
                            name: "タイムアウトされたユーザー",
                            value: m.user.tag + "" + ` (${m.user.id})`,
                            inline: false,
                          },
                          {
                            name: "理由",
                            value: "Tokenを送信したため。",
                            inline: false,
                          }
                        )
                        .setFooter({ text: `EightBot Security` }),
                    ],
                  });
                }
              });
            break;
          default:
            break;
        }
      }
    }
  });
}
