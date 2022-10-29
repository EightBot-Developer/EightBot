from discord.ext import commands
from discord import app_commands
import discord
import async_google_trans_new
import cld3


class trans_kinou(commands.Cog):
    def __init__(self, bot: commands.Bot) -> None:
        self.bot: commands.Bot = bot
    
    @app_commands.context_menu()
    async def trans(i: discord.Interaction, message: discord.Message):
        cld3_languages = cld3.get_frequent_languages(
        message.content,
        num_langs=3,
        )
        a = 0
        language_list = []
        for l in cld3_languages:
            a = a + 1
            if a == 2:
                continue
            else:
                language_list.append(l[0])
        lang = "en"
        if str(language_list[0]) == "ja":
            lang = "en"
        else:
            lang = "ja"
        g = async_google_trans_new.AsyncTranslator()
        trans_d = await g.translate(message.content, lang)
        await interaction.response.send_message(f'[元メッセージ](https://discord.com/channels/{message.guild.id}/{message.channel.id}/{message.id})', embed=discord.Embed(title='翻訳結果', description=str(trans_d)))


async def setup(bot: commands.Bot) -> None:
    await bot.add_cog(trans_kinou(bot))
