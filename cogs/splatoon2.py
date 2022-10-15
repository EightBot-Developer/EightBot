import discord
from discord.ext import commands
from discord import app_commands


class splatoon_cog_one(commands.Cog):
    def __init__(self, bot: commands.Bot) -> None:
        self.bot: commands.Bot = bot

    # 近日追加。


async def setup(bot: commands.Bot) -> None:
    await bot.add_cog(splatoon_cog_one(bot))
