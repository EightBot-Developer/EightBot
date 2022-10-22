from discord.ext import commands
from discord import app_commands
import discord


class ping(commands.Cog):
    def __init__(self, bot: commands.Bot) -> None:
        self.bot: commands.Bot = bot

    @app_commands.command(name="ping", description="ping値を測定します。")
    async def pingpong(self, i: discord.Interaction):
        await i.response.send_message(f'{round(self.bot.latency * 1000)}ms')


async def setup(bot: commands.Bot) -> None:
    await bot.add_cog(ping(bot))
