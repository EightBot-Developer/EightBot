from discord.ext import commands
from discord import app_commands
import discord
import enum


class bot(enum.Enum):
    はい = True
    いいえ = False

class roleall(commands.Cog):
    def __init__(self, bot: commands.Bot) -> None:
        self.bot: commands.Bot = bot
    
    @app_commands.describe(bot='Botにもロールを付与する?')
    @app_commands.choices(bot=[
        app_commands.Choice(name='はい', value=True),
        app_commands.Choice(name='いいえ', value=False),
    ])
    @app_commands.command(name="role_all_add", description="全メンバーにロールを付与します。")
    async def role_all_add(self, i: discord.Interaction, role: discord.Role, bot: bool):
        if bot:
            for member in i.guild.members:
                await member.add_roles(role)
        elif not bot:
            for member in i.guild.members:
                if not member.bot:
                    await member.add_roles(role)
    
    @app_commands.describe(bot='Botのロールも除去する?')
    @app_commands.choices(bot=[
        app_commands.Choice(name='はい', value=True),
        app_commands.Choice(name='いいえ', value=False),
    ])
    @app_commands.command(name="role_all_remove", description="全員からロールを除去します。")
    async def role_all_add(self, i: discord.Interaction, role: discord.Role, bot: bool):
        if bot:
            for member in i.guild.members:
                await member.remove_roles(role)
        elif not bot:
            for member in i.guild.members:
                if not member.bot:
                    await member.remove_roles(role)


async def setup(bot: commands.Bot) -> None:
    await bot.add_cog(roleall(bot))
