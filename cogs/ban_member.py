from discord.ext import commands
from discord import app_commands
import discord


class ban_member(commands.Cog):
    def __init__(self, bot: commands.Bot) -> None:
        self.bot: commands.Bot = bot

    @app_commands.command(name="ban_member", description="Banされたユーザー一覧を表示します。")
    async def ban_members(self, i: discord.Interaction):
        m = []
        async for entry in i.guild.bans(limit=999999):
            m.append(f"{entry.user.name}, ")
        if not len(m) == 0:
            end = len(m) - 1
            m[end] = m[end].split(", ")[0]
            send_content = "".join(m)
        elif len(m) == 0:
            send_content = "Banされたユーザーはいません。"
        try:
            await i.response.send_message(
                embed=discord.Embed(
                    title="Banされたユーザー", description=send_content, color=0x3498DB
                ),
                ephemeral=True,
            )
        except:
            await i.response.send_message(
                embed=discord.Embed(
                    title="Banされたユーザー", description="取得できませんでした。", color=0x3498DB
                ),
                ephemeral=True,
            )


async def setup(bot: commands.Bot) -> None:
    await bot.add_cog(ban_member(bot))
