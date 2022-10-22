from discord.ext import commands
from discord import app_commands
import discord
import string
import random
import requests  #Todo: aiohttpを使うようにする


class voice_text(commands.Cog):
    def __init__(self, bot: commands.Bot) -> None:
        self.bot: commands.Bot = bot

    def voicesave(text):
        url = f"https://www.google.com/speech-api/v1/synthesize?text={text}&nc=mpeg&lang=ja&speed=0.5&client=lr-language-tts"
        randomstring = "".join(
            random.choices(string.ascii_letters + string.digits, k=10))
        name = "../voice/" + randomstring + ".mp3"
        response = requests.get(url, timeout=100)
        with open(name, "wb") as file:
            file.write(response.content)

    @app_commands.describe(text="喋らせるテキスト")
    @app_commands.command(name="voice_text", description="googleの声が出力できます。")
    async def voice(self, i: discord.Interaction, text: str):
        save = voicesave(text)
        await i.response.send_message(file=discord.File(save))


async def setup(bot: commands.Bot) -> None:
    await bot.add_cog(voice_text(bot))
