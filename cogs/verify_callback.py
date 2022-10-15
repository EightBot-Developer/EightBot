import discord
from discord.ext import commands
import json
from replit import db


def verify_db_get(key):
    return db[f"verify_1_db_{key}"]


class Verify_interaction(commands.Cog):
    def __init__(self, bot: commands.Bot) -> None:
        self.bot: commands.Bot = bot

    @commands.Cog.listener()
    async def on_interaction(self, i: discord.Interaction):
      try:
        get = json.dumps(i.data)
        json_get = json.loads(get)
        if json_get["custom_id"] == "verify_type_1":
            data = verify_db_get(int(i.message.id))
            await i.guild.get_member(i.user.id).add_roles(
                i.guild.get_role(int(data["role_id"]))
            )
            await i.response.send_message("ロールを付与しました。", ephemeral=True)
      except:
        pass


async def setup(bot: commands.Bot) -> None:
    await bot.add_cog(Verify_interaction(bot))
