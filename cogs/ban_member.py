from discord.ext import commands
from discord import app_commands
import discord


class ban_member(commands.Cog):
    def __init__(self, bot: commands.Bot) -> None:
        self.bot: commands.Bot = bot

    @app_commands.command(name="ban_member", description="Banされたユーザー一覧を表示します。")
    async def ban_members(self, i: discord.Interaction):
        m = []
        try:
            if i.guild.channels.permissions_for(i.user) == discord.Permissions.ban_members:
                if i.guild.channels.permissions_for(i.guild.get_member(self.bot.user.id)) == discord.Permissions.ban_members:
                    async for entry in i.guild.bans(limit=150):
                        m.append(f"{entry.user.name}, ")
                    send_content = "".join(m)
                    await i.response.send_message(send_content)
                else:
                    await i.response.send_message("データを取得できませんでした(Botの権限がないなどの原因で)", ephemeral=True)
            else:
                await i.response.send_message("データを取得できませんでした(権限がないなどの原因で)", ephemeral=True)
        except:
            await i.response.send_message("データを取得できませんでした(権限がないなどの原因で)", ephemeral=True)


async def setup(bot: commands.Bot) -> None:
    await bot.add_cog(ban_member(bot))
