import discord
from discord.ext import commands
from discord import app_commands
from replit import db


def verify_db(key, data):
    db[f"verify_1_db_{key}"] = data


def verify_db_get(key):
    return db[f"verify_1_db_{key}"]


class Button1(discord.ui.Button):
    def __init__(self):
        super().__init__(
            label="認証", style=discord.ButtonStyle.primary, custom_id="verify_type_1"
        )


class verify(commands.Cog):
    def __init__(self, bot: commands.Bot) -> None:
        self.bot: commands.Bot = bot

    @app_commands.describe(name="パネルの名前", description="パネルの説明", role="付与するロール")
    @app_commands.command(name="verify", description="ボタン式の認証パネルを生成します。")
    async def nomal_verify(
        self, i: discord.Interaction, name: str, description: str, role: discord.Role
    ):
        buttonView = discord.ui.View(timeout=None)
        buttonView.add_item(Button1())

        msg = await self.bot.get_channel(i.channel.id).send(
            embed=discord.Embed(title=name, description=description).add_field(
                name="付与するロール", value=f"{role.mention}"
            ),
            view=buttonView,
        )
        verify_db(int(msg.id), {"msg_id": int(msg.id), "role_id": role.id})
        await i.response.send_message("パネルの生成が完了しました。", ephemeral=True)


async def setup(bot: commands.Bot) -> None:
    await bot.add_cog(verify(bot))
