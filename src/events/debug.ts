import chalk from "chalk";
import { Events } from "discord.js";
import { timeToJSTTimestamp, timeToJST } from "../util/function.js";
import { appendFile, writeFile } from "node:fs";

/**
 * @param {number} ms
 */
async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
let debug_file = false;
let time = null;
export default {
  name: Events.Debug,
  async execute(msg: string) {
    if (!debug_file) {
      debug_file = true;
      time = timeToJSTTimestamp(Date.now()).getTime();
      writeFile(
        "./log/" + time + ".txt",
        `Log[${timeToJST(Date.now(), true)}]: ${msg}\n`,
        function (err) {
          if (err) {
            return console.log(
              chalk.red(`Error[${timeToJST(Date.now(), true)}]: `) + err.stack
            );
          }
          console.log(
            chalk.green(`Log[${timeToJST(Date.now(), true)}]`) +
              ": Log File Create!"
          );
        }
      );
    } else {
      appendFile(
        "./log/" + time + ".txt",
        `Log[${timeToJST(Date.now(), true)}]: ${msg}\n`,
        (err) => {
          if (err)
            return console.log(
              chalk.red(`Error[${timeToJST(Date.now(), true)}]: `) + err.stack
            );
        }
      );
    }
    console.log(
      chalk.green(`Log[${timeToJST(Date.now(), true)}]`) + ": " + msg
    );
  },
};
