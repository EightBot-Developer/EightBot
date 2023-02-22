import { Client } from "discord.js";
import express, { Application, Request, Response } from "express";
import config from "../config.js";
import fetch from "node-fetch";
const oauth = {
  clientid: config.clientId,
  clientsecret: config.clientSecret,
  siteurl: config.siteUrl,
  scope: "guilds%20identify",
};
export function run(client: Client) {
  const app: Application = express();
  app.get("/", (req: Request, res: Response) => {
    res.send("test");
  }); // testしてみる
  app
    .get("/login", async (req, res) => {
      res.redirect(
        `https://discord.com/api/oauth2/authorize?client_id=${oauth.clientid}&redirect_uri=${oauth.siteurl}&response_type=code&scope=${oauth.scope}`
      );
    })
    .get("/token/*", async (req, resolve) => {
      if (!req.query.code)
        return resolve.send(
          "パラメーターを読み込むことが出来ません。最初からやり直して下さい。(003)"
        );
      let headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const params = new URLSearchParams();
      params.append("client_id", oauth.clientid);
      params.append("client_secret", oauth.clientsecret);
      params.append("grant_type", "authorization_code");
      params.append("code", String(req.query.code));
      params.append("redirect_uri", oauth.siteurl);
      params.append("scope", oauth.scope);
      const post = await fetch(`https://discord.com/api/oauth2/token`, {
        body: params,
        method: "post",
        headers: headers,
      }).catch((e) =>
        resolve.send(`エラーが発生しました。最初からやり直して下さい。(004)`)
      );
      const json: any = await post.json();
      console.log(json);
      if (!json?.access_token) return;
      const content: any = await fetch(
        "https://discord.com/api/v10/users/@me",
        {
          headers: {
            Authorization: `Bearer ${json.access_token}`,
          },
        }
      ).catch((e) => {
        resolve.send("エラーが発生しました。最初からやり直して下さい。(005)");
        console.log(e);
      });
      console.log(await content.json());
    });
  app.listen(8080);
}
