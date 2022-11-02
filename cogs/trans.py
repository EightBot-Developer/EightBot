from discord.ext import commands
from discord import app_commands
import discord
import async_google_trans_new


class trans_kinou(commands.Cog):
    def __init__(self, bot: commands.Bot) -> None:
        self.bot: commands.Bot = bot

    @app_commands.describe(text="翻訳するテキスト", lang="翻訳をする言語")
    @app_commands.choices(
        lang=[
            app_commands.Choice(name="アルメニア語", value="hy"),
            app_commands.Choice(name="中国語（簡体）", value="zh"),
            app_commands.Choice(name="オランダ語", value="nl"),
            app_commands.Choice(name="英語", value="en"),
            app_commands.Choice(name="エスペラント語", value="eo"),
            app_commands.Choice(name="フランス語", value="fr"),
            app_commands.Choice(name="グルジア語", value="ka"),
            app_commands.Choice(name="ドイツ語", value="de"),
            app_commands.Choice(name="ギリシャ語", value="el"),
            app_commands.Choice(name="イタリア語", value="it"),
            app_commands.Choice(name="日本語", value="ja"),
            app_commands.Choice(name="韓国語", value="ko"),
            app_commands.Choice(name="クルド語", value="ku"),
            app_commands.Choice(name="ペルシャ語", value="fa"),
            app_commands.Choice(name="ポーランド語", value="pl"),
            app_commands.Choice(name="ポルトガル語（ポルトガル、ブラジル）", value="pt"),
            app_commands.Choice(name="ルーマニア語", value="ro"),
            app_commands.Choice(name="スペイン語", value="es"),
            app_commands.Choice(name="スウェーデン語", value="sv"),
            app_commands.Choice(name="トルコ語", value="tr"),
            app_commands.Choice(name="ウルドゥー語", value="ur"),
        ]
    )
    @app_commands.command(name="google_trans", description="Google翻訳をします。")
    async def trans_cmd(self, i: discord.Interaction, lang: str, text: str):
        g = async_google_trans_new.AsyncTranslator()
        await i.response.send_message(content=await g.translate(text, lang))


async def setup(bot: commands.Bot) -> None:
    await bot.add_cog(trans_kinou(bot))
