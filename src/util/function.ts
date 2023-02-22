import { Client, EmbedBuilder } from "discord.js";
import { createRequire } from "module";
import { Config } from "./config_type.js";
const require = createRequire(import.meta.url);

/**
 * タイムスタンプをJSTタイムスタンプに変換します。
 *
 * @param {number} timestamp
 */
function timeToJSTTimestamp(timestamp: number) {
  var dt = new Date();
  var tz = dt.getTimezoneOffset();
  tz = (tz + 540) * 60 * 1000;
  dt = new Date(timestamp + tz);
  return dt;
}
const _timeToJSTTimestamp = timeToJSTTimestamp;
export { _timeToJSTTimestamp as timeToJSTTimestamp };
/**
 * エラーログ送信
 *
 * @param {Error} error
 * @param {Client} client
 * @param {Config} config
 * @param {string} name
 */
export function ErrorLog(
  error: Error,
  client: Client,
  config: Config,
  name: string
) {
  console.error(`[${timeToJST(Date.now(), true)}] ${error.stack}`);
  const embed = new EmbedBuilder()
    .setTitle("ERROR - " + name)
    .setDescription("```\n" + error.stack + "\n```")
    .setColor("Red")
    .setTimestamp();
  client.channels.fetch(config.logChannelId).then((c) => {
    if (!c.isTextBased()) return;
    c.send({
      content: `\`\`\`js\n${require("util")
        .inspect(error)
        .slice(0, 1800)}\n\`\`\``,
      embeds: [embed],
    });
  });
}
/**
 * エラーログ送信
 *
 * @param {unknown} error
 * @param {Client} client
 * @param {Config} config
 * @param {string} name
 * @param {Promise<unknown>} promise
 */
export function ErrorLog2(
  error: unknown,
  client: Client,
  config: Config,
  name: string,
  promise: Promise<unknown>
) {
  console.error(
    `\u001b[31m[${timeToJST(Date.now(), true)}] ${error}\u001b[0m\n`,
    promise
  );
  const embed = new EmbedBuilder()
    .setTitle("ERROR - " + name)
    .setDescription("```\n" + error + "\n```")
    .setColor("Red")
    .setTimestamp();
  client.channels.fetch(config.logChannelId).then((c) => {
    if (!c.isTextBased()) return;

    c.send({
      content: `\`\`\`js\n${require("util")
        .inspect(error)
        .slice(0, 1800)}\n\`\`\``,
      embeds: [embed],
    });
  });
}
/**
 * JSTタイムスタンプから日付に。
 *
 * @param {number} timestamp
 * @param {boolean} format
 */
export function timeToJST(timestamp: number, format: boolean = false) {
  const dt = timeToJSTTimestamp(timestamp);
  const year = dt.getFullYear();
  const month = dt.getMonth() + 1;
  const date = dt.getDate();
  const hour = dt.getHours();
  const minute = dt.getMinutes();
  const second = dt.getSeconds();

  let return_str;
  if (format == true) {
    return_str = `${year}/${month}/${date} ${hour}:${minute}:${second}`;
  } else {
    return_str = {
      year: year,
      month: month,
      date: date,
      hour: hour,
      minute: minute,
      second: second,
    };
  }
  return return_str;
}
