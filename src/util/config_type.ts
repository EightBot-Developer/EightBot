export type Config = {
  clientId: string;
  executable: {
    admin: string[];
  };
  defaultCooldown: number;
  logChannelId: string;
  token: string;
  clientSecret: string;
  siteUrl: string;
  api: {
    a3rt: string;
  };
};
