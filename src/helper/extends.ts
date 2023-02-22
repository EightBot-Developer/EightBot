import {
  Collection,
  ColorResolvable,
  CommandInteraction,
  EmbedBuilder,
  Guild,
  Message,
  MessageComponentInteraction,
  User,
} from "discord.js";

declare module "discord.js" {
  interface Client {
    rebootFlag: number;
    contextmenu: Collection<any, any>;
    slash: Collection<any, any>;
    cooldowns: Collection<any, any>;
  }
  interface Message {
    sendEmbedEmoji(
      emoji: string,
      title: string,
      msg: string,
      color: ColorResolvable | undefined,
      replied: boolean | undefined
    );
    error(title: string, msg: string);
    ok(title: string, msg: string);
  }
  interface Guild {
    owner();
  }
  interface CommandInteraction {
    error(title: string, msg: string, deferred?: boolean);
    ok(title: string, msg: string, deferred?: boolean);
    errorUpdate(title: string, msg: string);
  }
  interface MessageComponentInteraction {
    errorUpdate(title: string, msg: string);
  }
  interface User {
    url(): string;
  }
}
/**
 *
 * @param {string} emoji
 * @param {string} title
 * @param {string} msg
 * @param {ColorResolvable | undefined} color
 * @param {boolean | undefined} replied
 */
Message.prototype.sendEmbedEmoji = function (
  emoji: string,
  title: string,
  msg: string,
  color: ColorResolvable | undefined = "Blue",
  replied: boolean | undefined
) {
  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(`${emoji}${msg}`)
    .setColor(color);
  if (replied) {
    return this.reply({ embeds: [embed] });
  } else {
    return this.channel.send({ embeds: [embed] });
  }
};

/**
 *
 * @param {string} title
 * @param {string} msg
 */
Message.prototype.error = function (title: string, msg: string) {
  return this.sendEmbedEmoji("❌", title, msg, 0xff3300);
};

/**
 *
 * @param {string} title
 * @param {string} msg
 */
Message.prototype.ok = function (title: string, msg: string) {
  return this.sendEmbedEmoji("✅", title, msg, 0x0ffc23);
};

Guild.prototype.owner = function () {
  return this.members.cache.get(this.ownerId);
};
/**
 *
 * @param {string} title
 * @param {string} msg
 * @param {boolean} deferred
 */
CommandInteraction.prototype.error = function (
  title: string,
  msg: string,
  deferred?: boolean
) {
  if (!deferred)
    return this.reply({
      embeds: [
        {
          title: `${title}`,
          description: `❌${msg}`,
          color: 0xff3300,
        },
      ],
      ephemeral: true,
      fetchReply: true,
    });
  return this.followUp({
    embeds: [
      {
        title: `${title}`,
        description: `❌${msg}`,
        color: 0xff3300,
      },
    ],
    ephemeral: true,
    fetchReply: true,
  });
};
/**
 *
 * @param {string} title
 * @param {string} msg
 * @param {boolean} deferred
 */
CommandInteraction.prototype.ok = function (
  title: string,
  msg: string,
  deferred?: boolean
) {
  if (!deferred)
    return this.reply({
      embeds: [
        {
          title: `${title}`,
          description: `✅${msg}`,
          color: 0x0ffc23,
        },
      ],
      fetchReply: true,
    });
  return this.followUp({
    embeds: [
      {
        title: `${title}`,
        description: `✅${msg}`,
        color: 0x0ffc23,
      },
    ],
    fetchReply: true,
  });
};
/**
 *
 * @param {string} title
 * @param {string} msg
 */
MessageComponentInteraction.prototype.errorUpdate = function (
  title: string,
  msg: string
) {
  return this.update({
    embeds: [
      {
        title: title,
        description: `:x:${msg}`,
        color: 0xff3300,
      },
    ],
    components: [],
  });
};
/**
 *
 * @param {string} title
 * @param {string} msg
 */
CommandInteraction.prototype.errorUpdate = function (
  title: string,
  msg: string
) {
  return this.editReply({
    embeds: [
      {
        title: title,
        description: `:x:${msg}`,
        color: 0xff3300,
      },
    ],
  });
};

User.prototype.url = function () {
  return `https://discord.com/users/${this.id}`;
};
