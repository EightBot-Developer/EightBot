/* eslint-disable no-case-declarations */
import { time } from "discord.js";
import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";

let selectNum = 1;
export default {
  command: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("ユーザーの情報を表示します。")
    .addUserOption((input) =>
      input.setName("ユーザー").setDescription("ユーザー")
    ),
  async execute(i: ChatInputCommandInteraction) {
    try {
      const user = i.options.getUser("ユーザー");
      if (!user) selectNum = 3;
      if (!i.guild.members.cache.get(user.id)) selectNum = 2;
      if (!i.guild.members.cache.get(i.user.id)) selectNum = 4;
      switch (selectNum) {
        case 1:
          const member = i.guild.members.cache.get(user.id);
          const flags = user.flags.toArray();
          const newFlags: Array<string> = [];
          flags.forEach((value: string) => {
            newFlags.push(
              value
                .replaceAll(
                  "VerifiedDeveloper",
                  "<:verified_bot_developer:1027515484993749002>"
                )
                .replaceAll(
                  "PremiumEarlySupporter",
                  "<:Discord_Early_Supporter:1027518349544005673>"
                )
                .replaceAll(
                  "ActiveDeveloper",
                  "<:ActiveDevloper:1082582737241776180>"
                )
                .replaceAll("Staff", "<:Discord_Staff:1027518926957064212>")
                .replaceAll("Partner", "<:Partner_server:1028500801313833050>")
                .replaceAll(
                  "Hypesquad",
                  "<:Discord_Hypesquad_Event:1027518774431191060>"
                )
                .replaceAll(
                  "BugHunterLevel1",
                  "<:Discord_Bug_Hunter:1027518144652255272>"
                )
                .replaceAll(
                  "BugHunterLevel2",
                  "<:Discord_Bug_Hunter:1027518144652255272>"
                )
                .replaceAll(
                  "HypeSquadOnlineHouse1",
                  "<:Discord_Hypesquad_Bravery:1027518564724379698>"
                )
                .replaceAll(
                  "HypeSquadOnlineHouse2",
                  "<:Discord_Hypesquad_Brilliance:1027518693128810496>"
                )
                .replaceAll(
                  "HypeSquadOnlineHouse3",
                  "<:Discord_Hypesquad_Balance:1027518440912728104>"
                )
                .replaceAll("VerifiedBot", "")
                .replaceAll(
                  "CertifiedModerator",
                  "<:DiscordCertifiedModerator:1082847714162786305>"
                )
            );
          });
          const flagText = newFlags.join(" ");
          await i.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle("基本情報 - ユーザー情報")
                .setThumbnail(user.avatarURL() || user.defaultAvatarURL)
                .addFields(
                  { name: "名前", value: user.tag },
                  { name: "ID", value: user.id },
                  {
                    name: "アイコンのURL",
                    value: user.avatarURL() || user.defaultAvatarURL,
                  },
                  { name: "Bot", value: user.bot ? "はい" : "いいえ" },
                  { name: "System", value: user.system ? "はい" : "いいえ" },
                  {
                    name: "バッジ",
                    value: flagText === "" ? "なし" : flagText,
                  },
                  {
                    name: "アカウント作成日時",
                    value: time(user.createdAt, "F"),
                  }
                )
                .setColor("Blue"),
              new EmbedBuilder()
                .setTitle("サーバーメンバー情報 - ユーザー情報")
                .setThumbnail(member.displayAvatarURL())
                .addFields(
                  { name: "ニックネーム又は名前", value: member.displayName },
                  {
                    name: "タイムアウトが削除される日時",
                    value: member.communicationDisabledUntil
                      ? time(member.communicationDisabledUntil, "F")
                      : "タイムアウトされていません。",
                  },
                  { name: "参加日時", value: time(member.joinedAt) },
                  { name: "System", value: user.system ? "はい" : "いいえ" },
                  {
                    name: "アカウント作成日時",
                    value: time(user.createdAt, "F"),
                  }
                )
                .setColor("Blue"),
            ],
          });
          break;
        case 2:
          const flags2 = user.flags.toArray();
          const newFlags2: Array<string> = [];
          flags2.forEach((value: string) => {
            newFlags2.push(
              value
                .replaceAll(
                  "VerifiedDeveloper",
                  "<:verified_bot_developer:1027515484993749002>"
                )
                .replaceAll(
                  "PremiumEarlySupporter",
                  "<:Discord_Early_Supporter:1027518349544005673>"
                )
                .replaceAll(
                  "ActiveDeveloper",
                  "<:ActiveDevloper:1082582737241776180>"
                )
                .replaceAll("Staff", "<:Discord_Staff:1027518926957064212>")
                .replaceAll("Partner", "<:Partner_server:1028500801313833050>")
                .replaceAll(
                  "Hypesquad",
                  "<:Discord_Hypesquad_Event:1027518774431191060>"
                )
                .replaceAll(
                  "BugHunterLevel1",
                  "<:Discord_Bug_Hunter:1027518144652255272>"
                )
                .replaceAll(
                  "BugHunterLevel2",
                  "<:Discord_Bug_Hunter:1027518144652255272>"
                )
                .replaceAll(
                  "HypeSquadOnlineHouse1",
                  "<:Discord_Hypesquad_Bravery:1027518564724379698>"
                )
                .replaceAll(
                  "HypeSquadOnlineHouse2",
                  "<:Discord_Hypesquad_Brilliance:1027518693128810496>"
                )
                .replaceAll(
                  "HypeSquadOnlineHouse3",
                  "<:Discord_Hypesquad_Balance:1027518440912728104>"
                )
                .replaceAll("VerifiedBot", "")
                .replaceAll(
                  "CertifiedModerator",
                  "<:DiscordCertifiedModerator:1082847714162786305>"
                )
            );
          });
          const flagText2 = newFlags2.join(" ");
          await i.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle("基本情報 - ユーザー情報")
                .setThumbnail(user.avatarURL() || user.defaultAvatarURL)
                .addFields(
                  { name: "名前", value: user.tag },
                  { name: "ID", value: user.id },
                  {
                    name: "アイコンのURL",
                    value: user.avatarURL() || user.defaultAvatarURL,
                  },
                  { name: "Bot", value: user.bot ? "はい" : "いいえ" },
                  { name: "System", value: user.system ? "はい" : "いいえ" },
                  {
                    name: "バッジ",
                    value: flagText2 === "" ? "なし" : flagText2,
                  },
                  {
                    name: "アカウント作成日時",
                    value: time(user.createdAt, "F"),
                  }
                )
                .setColor("Blue"),
            ],
          });
          break;
        case 3:
          const flags3 = i.user.flags.toArray();
          const newFlags3: Array<string> = [];
          flags3.forEach((value: string) => {
            newFlags3.push(
              value
                .replaceAll(
                  "VerifiedDeveloper",
                  "<:verified_bot_developer:1027515484993749002>"
                )
                .replaceAll(
                  "PremiumEarlySupporter",
                  "<:Discord_Early_Supporter:1027518349544005673>"
                )
                .replaceAll(
                  "ActiveDeveloper",
                  "<:ActiveDevloper:1082582737241776180>"
                )
                .replaceAll("Staff", "<:Discord_Staff:1027518926957064212>")
                .replaceAll("Partner", "<:Partner_server:1028500801313833050>")
                .replaceAll(
                  "Hypesquad",
                  "<:Discord_Hypesquad_Event:1027518774431191060>"
                )
                .replaceAll(
                  "BugHunterLevel1",
                  "<:Discord_Bug_Hunter:1027518144652255272>"
                )
                .replaceAll(
                  "BugHunterLevel2",
                  "<:Discord_Bug_Hunter:1027518144652255272>"
                )
                .replaceAll(
                  "HypeSquadOnlineHouse1",
                  "<:Discord_Hypesquad_Bravery:1027518564724379698>"
                )
                .replaceAll(
                  "HypeSquadOnlineHouse2",
                  "<:Discord_Hypesquad_Brilliance:1027518693128810496>"
                )
                .replaceAll(
                  "HypeSquadOnlineHouse3",
                  "<:Discord_Hypesquad_Balance:1027518440912728104>"
                )
                .replaceAll("VerifiedBot", "")
                .replaceAll(
                  "CertifiedModerator",
                  "<:DiscordCertifiedModerator:1082847714162786305>"
                )
            );
          });
          const flagText3 = newFlags3.join(" ");
          await i.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle("基本情報 - ユーザー情報")
                .setThumbnail(i.user.avatarURL() || i.user.defaultAvatarURL)
                .addFields(
                  { name: "名前", value: i.user.tag },
                  { name: "ID", value: i.user.id },
                  {
                    name: "アイコンのURL",
                    value: i.user.avatarURL() || i.user.defaultAvatarURL,
                  },
                  { name: "Bot", value: i.user.bot ? "はい" : "いいえ" },
                  { name: "System", value: i.user.system ? "はい" : "いいえ" },
                  {
                    name: "バッジ",
                    value: flagText3 === "" ? "なし" : flagText3,
                  },
                  {
                    name: "アカウント作成日時",
                    value: time(i.user.createdAt, "F"),
                  }
                )
                .setColor("Blue"),
            ],
          });
          break;
        case 4:
          const flags4 = i.user.flags.toArray();
          const newFlags4: Array<string> = [];
          flags4.forEach((value: string) => {
            newFlags4.push(
              value
                .replaceAll(
                  "VerifiedDeveloper",
                  "<:verified_bot_developer:1027515484993749002>"
                )
                .replaceAll(
                  "PremiumEarlySupporter",
                  "<:Discord_Early_Supporter:1027518349544005673>"
                )
                .replaceAll(
                  "ActiveDeveloper",
                  "<:ActiveDevloper:1082582737241776180>"
                )
                .replaceAll("Staff", "<:Discord_Staff:1027518926957064212>")
                .replaceAll("Partner", "<:Partner_server:1028500801313833050>")
                .replaceAll(
                  "Hypesquad",
                  "<:Discord_Hypesquad_Event:1027518774431191060>"
                )
                .replaceAll(
                  "BugHunterLevel1",
                  "<:Discord_Bug_Hunter:1027518144652255272>"
                )
                .replaceAll(
                  "BugHunterLevel2",
                  "<:Discord_Bug_Hunter:1027518144652255272>"
                )
                .replaceAll(
                  "HypeSquadOnlineHouse1",
                  "<:Discord_Hypesquad_Bravery:1027518564724379698>"
                )
                .replaceAll(
                  "HypeSquadOnlineHouse2",
                  "<:Discord_Hypesquad_Brilliance:1027518693128810496>"
                )
                .replaceAll(
                  "HypeSquadOnlineHouse3",
                  "<:Discord_Hypesquad_Balance:1027518440912728104>"
                )
                .replaceAll("VerifiedBot", "")
                .replaceAll(
                  "CertifiedModerator",
                  "<:DiscordCertifiedModerator:1082847714162786305>"
                )
            );
          });
          const flagText4 = newFlags4.join(" ");
          await i.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle("基本情報 - ユーザー情報")
                .setThumbnail(i.user.avatarURL() || i.user.defaultAvatarURL)
                .addFields(
                  { name: "名前", value: i.user.tag },
                  { name: "ID", value: i.user.id },
                  {
                    name: "アイコンのURL",
                    value: i.user.avatarURL() || i.user.defaultAvatarURL,
                  },
                  { name: "Bot", value: i.user.bot ? "はい" : "いいえ" },
                  { name: "System", value: i.user.system ? "はい" : "いいえ" },
                  {
                    name: "バッジ",
                    value: flagText4 === "" ? "なし" : flagText4,
                  },
                  {
                    name: "アカウント作成日時",
                    value: time(i.user.createdAt, "F"),
                  }
                )
                .setColor("Blue"),
            ],
          });

          break;
        default:
          break;
      }
    } catch (e) {
      console.log(e);
      await i.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("<:x_:1061166079495389196> | 失敗")
            .setDescription("Userの取得に失敗しました。")
            .setColor("Blue"),
        ],
      });
    }
  },
};
