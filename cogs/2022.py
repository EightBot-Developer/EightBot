import discord
from discord.ext import commands
from discord import app_commands
import time


class count_down(commands.Cog):
    def __init__(self, bot: commands.Bot) -> None:
        self.bot: commands.Bot = bot

    @app_commands.command(name="2022年が終わるまであとどのくらい")
    async def count(
        self,
        i: discord.Interaction,
    ):
        """2022年が終わるまであとどのくらい"""
        c = 1672498800 - int(time.time())
        await i.response.send_message(
            f"2022年が終わるまであと{c}秒です。"
            + f"\n2022年が終わるまであと約{int(c /60 )}分です。"
            + f"\n2022年が終わるまであと約{int(c /3600  )}時間です。"
            + f"\n2022年が終わるまであと約{int(c /86400 )}日です。"
        )


async def setup(bot: commands.Bot) -> None:
    await bot.add_cog(count_down(bot))
