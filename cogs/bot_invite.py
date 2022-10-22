from discord.ext import commands
from discord import app_commands
import discord
from replit import db

def db_set(key, data):
    db[f"bot_invite_db_id_{key}"] = data


def db_get(key):
    return db[f"bot_invite_db_id_{key}"]
class MyView(discord.ui.View):
    @discord.ui.select( 
        placeholder = "招待するBotの権限を選択して下さい",
        min_values = 1,
        max_values = 1,
        options = [
            discord.SelectOption(
                label="管理者",
                description="全ての権限を有効にしたURLを生成します。",
                value="admin",
            ),
            discord.SelectOption(
                label="権限選択式",
                description="全ての権限を選択式にしたURLを生成します。",
                value="all"
            ),
            discord.SelectOption(
                label="権限なし",
                description="全ての権限をなしにしたURLを生成します。",
                value="none"
            ),

        ]
    )
    async def select_callback(self, select, i): # the function called when the user is done selecting options
        bot_id = db_get(i.message.id)
        d = select.values[0]
        if d == "admin":
            await i.response.edit_message(f"セレクトメニューをクリックしてください\n[Botを招待]({discord.utils.oauth_url(int(bot_id), permissions=discord.Permissions(permissions=discord.Permissions.administrator.flag))})")
        elif d == "all":
            await i.response.edit_message(f"セレクトメニューをクリックしてください\n[Botを招待]({discord.utils.oauth_url(int(bot_id), permissions=discord.Permissions(permissions=discord.Permissions.all()))})")
        elif d == "none":
            await i.response.edit_message(f"セレクトメニューをクリックしてください\n[Botを招待]({discord.utils.oauth_url(int(bot_id))})")
        else:
            await i.response.edit_message(f"不明なパラメーターが選択されました。")
class bot_invite(commands.Cog):
    def __init__(self, bot: commands.Bot) -> None:
        self.bot: commands.Bot = bot

    @app_commands.command(name="bot_invite", description="Botの招待リンクを生成します。")
    async def botinvite(self, i: discord.Interaction, bot: discord.User=None):
        if bot:
            if bot.bot:
                await i.response.send_message("セレクトメニューをクリックしてください")
                msg = await self.bot.get_channel(i.channel.id).send(view=MyView())
                db_set(int(msg.id), int(bot.id))
                self.bot.add_view(MyView(), message_id=msg.id)

async def setup(bot: commands.Bot) -> None:
    await bot.add_cog(bot_invite(bot))
