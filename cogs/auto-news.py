import discord
from discord.ext import commands


class auto_news(commands.Cog):
    def __init__(self, bot: commands.Bot) -> None:
        self.bot: commands.Bot = bot

    @commands.Cog.listener(name="on_message")
    async def msg_auto_news(self, msg: discord.Message):
        if msg.channel.type == discord.ChannelType.news:
            if msg.channel.topic:
                if msg.channel.topic.startswith("eight-auto-news"):
                    await msg.publish()
                    await msg.add_reaction("✅")
                    return
                else:
                    return
            else:
                return
        else:
            return


async def setup(bot: commands.Bot) -> None:
    await bot.add_cog(auto_news(bot))
