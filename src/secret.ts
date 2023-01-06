import { dotenv } from "./deps.ts";

dotenv.loadSync({
  export: true,
  envPath: "./env/.env",
});
export const Secret = {
  DISCORD_TOKEN: Deno.env.get("DISCORD_TOKEN")!,
};
