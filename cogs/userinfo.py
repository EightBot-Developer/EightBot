import discord
from discord.ext import commands
from discord import app_commands
import Paginator


class Userinfo(commands.Cog):
    def __init__(self, bot: commands.Bot) -> None:
        self.bot: commands.Bot = bot

    @app_commands.describe(user="ユーザー")
    @app_commands.command(name="userinfo", description="指定したユーザーの情報を返します。")
    async def userinfo(self, i: discord.Interaction, user: discord.User):
        await i.response.send_message("利用できません。")


async def setup(bot: commands.Bot) -> None:
    await bot.add_cog(Userinfo(bot))
