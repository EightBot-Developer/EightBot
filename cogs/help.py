import discord
from discord.ext import commands
import Paginator
from discord import app_commands

a = "Tips: /help コマンド名でコマンドを検索できます。"
cmd = []

class Help(commands.Cog):
    def __init__(self, bot: commands.Bot) -> None:
        self.bot: commands.Bot = bot
        for command in self.bot.tree.walk_commands():
            cmd.append(app_commands.Choice(name=command.name, value=command.name))

    @discord.app_commands.choices(
        cmd=cmd
    )
    @app_commands.command(name="help", description="helpを表示します。")
    async def help(self, i: discord.Interaction, cmd: str = None) -> None:
        if not cmd:
            he = discord.Embed(title="ページ2", color=0x3498DB)
            he.set_footer(text=a)
            ee = discord.Embed(
                    title="ページ1",
                    color=0x3498DB,
                ).set_footer(text=a)
            num = 0
            for command in self.bot.tree.walk_commands():
                num = num + 1
                if num > 24:
                    he.add_field(name=command.name, value=command.description)
                else:
                    ee.add_field(name=command.name, value=command.description)
            embeds = [
                ee,
                he,
            ]
            return await Paginator.Simple().start(i, pages=embeds)
        elif cmd:
            if self.bot.tree.get_command(cmd):
                return await i.response.send_message(
                    embed=discord.Embed(
                        title=self.bot.tree.get_command(cmd).name,
                        description=self.bot.tree.get_command(cmd).description,
                        color=0x3498DB,
                    )
            )
        else:
            return await i.response.send_message(
                embed=discord.Embed(
                    title="エラー",
                    description="検索した名前のコマンドは存在しません。",
                    color=0x3498DB,
                )
            )


async def setup(bot: commands.Bot) -> None:
    await bot.add_cog(Help(bot))
