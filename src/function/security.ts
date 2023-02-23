import { EmbedBuilder, Message } from "discord.js";
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

          default:
            break;
        }
      }
    }
  });
}
/*import { GuildMember, Events } from "discord.js";

export default {
  name: Events.GuildMemberAdd,
  async execute(member: GuildMember) {
    const calc =
      Math.floor(new Date().getTime() / 1000) -
      Math.floor(member.user.createdAt.getTime() / 1000);
    if (calc < 604800) {
      member.kick("アカウント作成から1週間経っていないので。- By EightBot");
    }
  },
};

automod

 */
