import discord
from discord.ext import commands
from discord import app_commands
import urllib.parse


class gosentyouen(commands.Cog):
    def __init__(self, bot: commands.Bot) -> None:
        self.bot: commands.Bot = bot

    @app_commands.choices(
        type=[
            app_commands.Choice(name="png(お勧め)", value="png"),
            app_commands.Choice(name="jpg", value="jpg"),
            app_commands.Choice(name="webp", value="webp"),
        ]
    )
    @app_commands.choices(
        hoshii=[
            app_commands.Choice(name="固定する", value="true"),
            app_commands.Choice(name="固定しない", value="false"),
        ]
    )
    @app_commands.choices(
        quality=[
            app_commands.Choice(name="低", value="30"),
            app_commands.Choice(name="中", value="70"),
            app_commands.Choice(name="高", value="100"),
        ]
    )
    @app_commands.choices(
        noalpha=[
            app_commands.Choice(name="白にする", value="true"),
            app_commands.Choice(name="白にしない", value="false"),
        ]
    )
    @app_commands.choices(
        rainbow=[
            app_commands.Choice(name="虹色にする", value="true"),
            app_commands.Choice(name="虹色にしない", value="false"),
        ]
    )
    @app_commands.describe(
        hoshii="下部文字列を「欲しい！」に固定する",
        noalpha="背景色を白にする",
        rainbow="虹色にする",
        type="画像拡張子",
        quality="画質(1-100)",
        bottom="下部文字列",
        top="上部文字列",
    )
    @app_commands.command(name="5000", description="5000兆円ほしいを生成します。")
    async def gosen(
        self,
        i: discord.Interaction,
        top: str,
        bottom: str,
        type: str,
        quality: str,
        hoshii: str,
        noalpha: str,
        rainbow: str,
    ):
        base_url = f"https://gsapi.cbrx.io/image?top={top}&bottom={bottom}"
        url = (
            base_url
            + f"&type={type}&q={quality}"
            + f"&hoshii={hoshii}&noalpha={noalpha}&rainbow={rainbow}"
        )
        parse_url = urllib.parse.quote(url)
        embed = discord.Embed(title="5000兆円ほしい!!", color=0x3498DB)
        embed.set_image(url=parse_url)
        embed.set_footer(text="生成: 5000choyen-api")
        await i.response.send_message(embed=embed)


async def setup(bot: commands.Bot) -> None:
    await bot.add_cog(gosentyouen(bot))
