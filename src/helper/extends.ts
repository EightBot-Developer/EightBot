import { Collection, User } from "discord.js";

declare module "discord.js" {
  interface Client {
    rebootFlag: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    slash: Collection<any, any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cooldowns: Collection<any, any>;
  }
  interface User {
    url(): string;
  }
}

User.prototype.url = function () {
  return `https://discord.com/users/${this.id}`;
};
