from discord.ext import commands
from discord import app_commands


class imgcheck(commands.Cog):
    def __init__(self, bot: commands.Bot) -> None:
        self.bot: commands.Bot = bot


# todo


async def setup(bot: commands.Bot) -> None:
    await bot.add_cog(imgcheck(bot))
