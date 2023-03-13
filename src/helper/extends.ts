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
    slash: Collection<any, any>;
    cooldowns: Collection<any, any>;
  }
  interface User {
    url(): string;
  }
}

User.prototype.url = function () {
  return `https://discord.com/users/${this.id}`;
};
