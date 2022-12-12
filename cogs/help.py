import discord
from discord.ext import commands
import Paginator
from discord import app_commands

a = "Tips: /help コマンド名でコマンドを検索できます。"


class Help(commands.Cog):
    def __init__(self, bot: commands.Bot) -> None:
        self.bot: commands.Bot = bot

    @discord.app_commands.choices(
        cmd=[
            discord.app_commands.Choice(name="help", value="help"),
        ]
    )
    @app_commands.command(name="help", description="helpを表示します。")
    async def help(self, i: discord.Interaction, cmd: str = None) -> None:
        if not cmd:
            he = discord.Embed(title="ページ2", color=discord.Colour.blurple())
            he.add_field(name="help", value="helpを表示します。")
            he.set_footer(text=a)
            ee = discord.Embed(
                    title="ページ1",
                    color=discord.Colour.blurple(),
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
        elif cmd == "help":
            return await i.response.send_message(
                embed=discord.Embed(
                    title="help",
                    description="コマンドのヘルプを表示します。",
                    color=discord.Colour.blurple(),
                ).add_field(name="使い方", value="`/help コマンド名(任意)`")
            )
        else:
            return await i.response.send_message(
                embed=discord.Embed(
                    title="エラー",
                    description="検索した名前のコマンドは存在しません。",
                    color=discord.Colour.blurple(),
                )
            )


async def setup(bot: commands.Bot) -> None:
    await bot.add_cog(Help(bot))
