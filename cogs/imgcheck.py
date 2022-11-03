from discord.ext import commands
from discord import app_commands
import discord
import aiohttp
import urllib.parse
import asyncio


class imgcheck(commands.Cog):
    def __init__(self, bot: commands.Bot) -> None:
        self.bot: commands.Bot = bot

    @app_commands.command(name="imgcheck", description="拾い画チェッカー。")
    async def imgcheck(self, i: discord.Interaction, url: str):
        load_text = "拾い画チェッカーAPIに接続しています"
        await i.response.send_message(load_text)
        await asyncio.sleep(1)
        await i.response.edit_message("{load_text}.")
        await asyncio.sleep(1)
        await i.response.edit_message("{load_text}..")
        await asyncio.sleep(1)
        await i.response.edit_message("{load_text}...")
        async with aiohttp.ClientSession() as session:
            async with session.get(
                f"https://api.irucabot.com/imgcheck/check_url?url={urllib.parse.quote(url)}"
            ) as resp:
                resp_data = await resp.json()
                if resp_data["status"] == "success":
                    if resp_data["found"]:
                        await i.response.edit_message(
                            embed=discord.Embed(
                                title="これは拾い画です。",
                                description=f"この画像と一致している画像が{resp_data['count']}個ありました。\n[Google画像検索結果]({resp_data['resulturl']}))\n\n[拾い画チェッカーAPIを使用しています。](https://imgcheck.irucabot.com/api-reference/check_url)",
                            )
                        )
                    elif not resp_data["found"]:
                        await i.response.edit_message(
                            embed=discord.Embed(
                                title="これは拾い画ではない可能性が高いです。",
                                description=f"この画像と一致している画像が0個ありました。\n\n[拾い画チェッカーAPIを使用しています。](https://imgcheck.irucabot.com/api-reference/check_url)",
                            )
                        )
                    else:
                        await i.response.edit_message(
                            embed=discord.Embed(
                                title="起るはずの無いことが起こりました。",
                                description=f"起るはずの無いことが起こったので、結果を表示できません。",
                            )
                        )
                elif resp_data["status"] == "error":
                    await i.response.edit_message(
                        embed=discord.Embed(
                            title="エラーが発生しました。", description=resp_data["message_ja"]
                        )
                    )


async def setup(bot: commands.Bot) -> None:
    await bot.add_cog(imgcheck(bot))
