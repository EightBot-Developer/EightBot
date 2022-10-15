import discord
from discord.ext import commands
from discord import app_commands


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
        await i.response.send_message(
            f"https://gsapi.cbrx.io/image?top={top}&bottom={bottom}&type={type}&q={quality}&hoshii={hoshii}&noalpha={noalpha}&rainbow={rainbow}"
        )


async def setup(bot: commands.Bot) -> None:
    await bot.add_cog(gosentyouen(bot))
