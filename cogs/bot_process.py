import discord
from discord.ext import commands
from replit import db


def bot_command_count_get(data):
    return db[f"bot_command_{data}_count_db"]


def bot_command_count(data):
    try:
        db[f"bot_command_{data}_count_db"] = int(bot_command_count_get(data)) + 1
    except KeyError:
        db[f"bot_command_{data}_count_db"] = 0 + 1


def bot_command_all_count_db_get():
    return db["bot_command_all_count_db"]


def bot_command_count_p1():
    try:
        db["bot_command_all_count_db"] = int(bot_command_all_count_db_get()) + 1
        return
    except KeyError:
        db["bot_command_all_count_db"] = 0 + 1


class bot_process(commands.Cog):
    def __init__(self, bot: commands.Bot) -> None:
        self.bot: commands.Bot = bot

    @commands.Cog.listener(name="on_interaction")
    async def interaction(self, i: discord.Interaction):
        if i.type == discord.InteractionType.application_command:
            bot_command_count_p1()
            if i.command:
                bot_command_count(data=i.command.name)
            else:
                return


async def setup(bot: commands.Bot) -> None:
    await bot.add_cog(bot_process(bot))
