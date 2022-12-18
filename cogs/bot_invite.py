from discord.ext import commands
from discord import app_commands
import discord
from replit import db

interaction = discord.Interaction


def db_set(key, data):
    db[f"bot_invite_db_id_{key}"] = data


def db_get(key):
    return db[f"bot_invite_db_id_{key}"]


class MyView(discord.ui.View):
    def __init__(self):
        super().__init__(timeout=None)
        self.add_item(MySelect())


# d = description
# l = label
d1 = "全ての権限を有効にしたURLを生成します。"
d2 = "全ての権限を選択式にしたURLを生成します。"
d3 = "全ての権限をなしにしたURLを生成します。"
l1 = "管理者"
l2 = "権限選択式"
l3 = "権限なし"


class MySelect(discord.ui.Select):
    def __init__(self):
        super().__init__(
            placeholder="招待するBotの権限を選択して下さい",
            min_values=1,
            custom_id="bot_invite_myview_select_menu",
            max_values=1,
            options=[
                discord.SelectOption(
                    label=l1,
                    description=d1,
                    value="admin",
                ),
                discord.SelectOption(label=l2, description=d2, value="all"),
                discord.SelectOption(label=l3, description=d3, value="none"),
            ],
        )

    async def callback(self, i: interaction):
        bot_id = db_get(i.message.id)
        d = self.values[0]
        if d == "admin":
            url = discord.utils.oauth_url(
                int(bot_id),
                permissions=discord.Permissions(
                    permissions=discord.Permissions.administrator.flag
                ),
            )
            await i.response.send_message(
                ephemeral=True,
                content=f"[Botを招待]({url})",
            )
        elif d == "all":
            url = discord.utils.oauth_url(
                int(bot_id),
                permissions=discord.Permissions(
                    permissions=discord.Permissions.all().value
                ),
            )
            await i.response.send_message(
                ephemeral=True,
                content=f"[Botを招待]({url})",
            )
        elif d == "none":
            url = discord.utils.oauth_url(int(bot_id))
            await i.response.send_message(
                ephemeral=True,
                content=f"[Botを招待]({url})",
            )
        else:
            await i.response.send_message("不明なパラメーターが選択されました。", ephemeral=True)


class bot_invite(commands.Cog):
    def __init__(self, bot: commands.Bot) -> None:
        self.bot: commands.Bot = bot

    @app_commands.describe(bot="招待するBot")
    @app_commands.command(name="bot_invite", description="Botの招待リンクを生成します。")
    async def botinvite(self, i: interaction, bot: discord.User = None):
        if bot:
            if bot.bot:
                await i.response.send_message("セレクトメニューをクリックして選択してください")
                ch = self.bot.get_channel(i.channel.id)
                msg = await ch.send(view=MyView())
                db_set(int(msg.id), int(bot.id))
                self.bot.add_view(MyView(), message_id=msg.id)
            else:
                await i.response.send_message("指定したものはBotではありません。")
        else:
            await i.response.send_message("セレクトメニューをクリックして選択してください")
            msg = await self.bot.get_channel(i.channel.id).send(view=MyView())
            db_set(int(msg.id), int(self.bot.user.id))
            self.bot.add_view(MyView(), message_id=msg.id)


async def setup(bot: commands.Bot) -> None:
    await bot.add_cog(bot_invite(bot))
