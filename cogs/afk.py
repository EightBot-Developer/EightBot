from discord.ext import commands
from discord import app_commands
from Eight_Modules.db import Database
import discord

db = Database(database_name="afk")


class afk(commands.Cog):
    def __init__(self, bot: commands.Bot) -> None:
        self.bot: commands.Bot = bot

    @app_commands.describe(reason="afkになる理由")
    @app_commands.command(name="afk_set", description="afkをセット又は解除します。")
    async def afk_set(self, i: discord.Interaction, reason: str):
        await db.set(i.user.id, reason)
        await i.response.send_message(
            embed=discord.Embed(
                title="<:check_mark:985366958537076766> : 成功",
                description="afkをセットしました。",
                color=0x3498DB,
            ),
            ephemeral=True,
        )

    @app_commands.command(name="afk_unset", description="afkを解除します")
    async def afk_unset(self, i: discord.Interaction):
        if await db.get(i.user.id):
            await db.set(i.user.id, False)
            await i.response.send_message(
                embed=discord.Embed(
                    title="<:check_mark:985366958537076766> : 成功",
                    description="afkを解除しました。",
                    color=0x3498DB,
                ),
                ephemeral=True,
            )

    @commands.Cog.listener(name="on_message")
    async def afk_msg(self, message: discord.Message):
        if message.mentions != []:
            for user in message.mentions:
                if await db.get(user.id):
                    await message.channel.send(
                        "このユーザーはafkです。(こののメッセージは10秒後に削除されます。)", delete_after=10
                    )


async def setup(bot: commands.Bot) -> None:
    await bot.add_cog(afk(bot))
