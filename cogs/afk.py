from discord.ext import commands
from discord import app_commands
from replit import db
import discord


def afk_set_db(key, data):
    db[f"afk_{key}"] = data


def afk_get(key):
    return db[f"afk_{key}"]


class afk(commands.Cog):
    def __init__(self, bot: commands.Bot) -> None:
        self.bot: commands.Bot = bot

    @app_commands.describe(reason="afkになる理由")
    @app_commands.command(name="afk_set", description="afkをセット又は解除します。")
    async def afks(self, i: discord.Interaction, reason: str):
        try:
            afk_set_db(int(i.user.id), reason)
            await i.response.send_message("afkをセットしました！")
        except:
            await i.response.send_message("afkをセットできませんでした。", ephemeral=True)

    @app_commands.command(name="afk_kaizyo", description="afkを解除します")
    async def afkk(self, i: discord.Interaction):
        try:
            afk_set_db(int(i.user.id), False)
            await i.response.send_message("afkを解除しました！")
        except:
            await i.response.send_message("afkを解除できませんでした。", ephemeral=True)

    @commands.Cog.listener(name='on_message')
    async def afk_msg(self, message: discord.Message):
        try:
            if message.mentions:
                for d in message.mentions:
                    if afk_get[int(d.id)]:
                        await message.channel.send("このユーザーはafkです。(こののメッセージは10秒後に削除されます。)", delete_after=10)
        except:
            pass


async def setup(bot: commands.Bot) -> None:
    await bot.add_cog(afk(bot))
