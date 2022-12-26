import discord
from discord.ext import commands
from discord import app_commands
import Paginator


class user(commands.Cog):
    def __init__(self, bot: commands.Bot) -> None:
        self.bot: commands.Bot = bot

    @app_commands.describe(user="ユーザー")
    @app_commands.command(name="user", description="指定したユーザーの情報を返します。")
    async def user(self, i: discord.Interaction, user: discord.User):
        await i.response.send_message("利用できません。")
        # TODO


async def setup(bot: commands.Bot) -> None:
    await bot.add_cog(user(bot))
