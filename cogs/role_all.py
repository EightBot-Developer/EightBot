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
        app_commands.Choice(name='はい', value="y"),
        app_commands.Choice(name='いいえ', value="f"),
    ])
    @app_commands.command(name="role_all_add", description="全メンバーにロールを付与します。")
    async def roleall_add(self, i: discord.Interaction, role: discord.Role, bot: str):
        if bot == 'y':
            for member in i.guild.members:
                await member.add_roles(role)
        elif bot == 'f':
            for member in i.guild.members:
                if not member.bot:
                    await member.add_roles(role)

    @app_commands.describe(bot='Botのロールも除去する?')
    @app_commands.choices(bot=[
        app_commands.Choice(name='はい', value='y'),
        app_commands.Choice(name='いいえ', value='f'),
    ])
    @app_commands.command(name="role_all_remove", description="全員からロールを除去します。")
    async def roleall_remove(self, i: discord.Interaction, role: discord.Role, bot: str):
        if bot == 'y':
            for member in i.guild.members:
                await member.remove_roles(role)
        elif bot == 'f':
            for member in i.guild.members:
                if not member.bot:
                    await member.remove_roles(role)


async def setup(bot: commands.Bot) -> None:
    await bot.add_cog(roleall(bot))
