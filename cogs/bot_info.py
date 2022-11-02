import discord
from discord.ext import commands
from discord import app_commands
from replit import db

def bot_command_count_get(data):
    return db[f"bot_command_{data}_count_db"]

def bot_command_all_count_db_get():
    return db[f"bot_command_all_count_db"]


class bot_info(commands.Cog):
    def __init__(self, bot: commands.Bot) -> None:
        self.bot: commands.Bot = bot

    @app_commands.command(
        name="bot_info",
        description="Botの情報を表示します。"
    )
    async def botinfo(
        self, i: discord.Interaction
    ):
        await i.response.send_message(embed=discord.Embed(title='Botの情報').add_field(name='全コマンドの合計実行数', value=str(bot_command_all_count_db_get())), ephemeral=True)
async def setup(bot: commands.Bot) -> None:
    await bot.add_cog(bot_info(bot))
