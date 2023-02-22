export type Config = {
  clientId: string;
  executable: {
    admin: string[];
    mod: any[];
  };
  defaultCooldown: number;
  logChannelId: string;
  token: string;
  openAIAPIKey: string;
  clientSecret: string;
  siteUrl: string;
};
