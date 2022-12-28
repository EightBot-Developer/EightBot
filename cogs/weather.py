import discord
from discord.ext import commands
from discord import app_commands
import aiohttp


class weather(commands.Cog):
    def __init__(self, bot: commands.Bot) -> None:
        self.bot: commands.Bot = bot

    @app_commands.choices(
        city=[
            app_commands.Choice(name="札幌", value="016010"),
            app_commands.Choice(name="青森", value="020010"),
            app_commands.Choice(name="秋田", value="050010"),
            app_commands.Choice(name="山形", value="060010"),
            app_commands.Choice(name="福島", value="070010"),
            app_commands.Choice(name="埼玉", value="110010"),
            app_commands.Choice(name="千葉", value="120010"),
            app_commands.Choice(name="東京", value="130010"),
            app_commands.Choice(name="新潟", value="150010"),
            app_commands.Choice(name="金沢", value="170010"),
            app_commands.Choice(name="福井", value="180010"),
            app_commands.Choice(name="長野", value="200010"),
            app_commands.Choice(name="岐阜", value="210010"),
            app_commands.Choice(name="静岡", value="220010"),
            app_commands.Choice(name="京都", value="260010"),
            app_commands.Choice(name="大阪", value="270000"),
            app_commands.Choice(name="神戸", value="280010"),
            app_commands.Choice(name="奈良", value="290010"),
            app_commands.Choice(name="和歌山", value="300010"),
            app_commands.Choice(name="鳥取", value="310010"),
            app_commands.Choice(name="岡山", value="330010"),
            app_commands.Choice(name="広島", value="340010"),
            app_commands.Choice(name="山口", value="350020"),
            app_commands.Choice(name="徳島", value="360010"),
            app_commands.Choice(name="福岡", value="400010"),
        ]
    )
    @app_commands.command(name="weather")
    async def weather(self, i: discord.Interaction, city: str):

        """天気を表示します。"""
        base = "https://weather.tsukumijima.net/api/forecast/city"
        async with aiohttp.ClientSession() as session:
            headers = {"User-Agent": "EightBot/2.2(DiscordBot)"}
            async with session.get(f"{base}/{city}", headers=headers) as r:
                if r.status == 200:
                    js = await r.json()
                    f = js["forecasts"][0]
                    embed = discord.Embed(
                        title=js["title"],
                        description=js["description"]["bodyText"],
                        color=0x3498DB,
                    )
                    embed.add_field(
                        name=f["date"] + "の天気。", value="天気は" + f["telop"] + "です。"
                    )
                    await i.response.send_message(embed=embed)
                else:
                    await i.response.send_message("取得できません。")


async def setup(bot: commands.Bot) -> None:
    await bot.add_cog(weather(bot))
