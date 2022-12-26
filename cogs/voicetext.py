from discord.ext import commands


class voiceText(commands.Cog):
    def __init__(self, bot: commands.Bot) -> None:
        self.bot: commands.Bot = bot


async def setup(bot: commands.Bot) -> None:
    await bot.add_cog(voiceText(bot))
