import discord
from discord.ext import commands
from discord import app_commands
import Paginator


class Userinfo(commands.Cog):
    def __init__(self, bot: commands.Bot) -> None:
        self.bot: commands.Bot = bot

    @app_commands.command(name="userinfo", description="指定したユーザーの情報を返します。")
    async def userinfo(self, i, user: discord.User) -> None:
        try:
            if user.bot is True:
                b = "はい"
            else:
                b = "いいえ"
            if user.system is True:
                c = "はい"
            else:
                c = "いいえ"
            mg = i.guild.get_member(user.id)
            if mg:
                if mg.pending:
                    aaa = "いいえ"
                else:
                    aaa = "はい"
                eee = discord.Embed(
                    title="サーバーメンバー情報",
                    color=discord.Colour.blurple(),
                )
                eee.add_field(name="ニックネーム", value=mg.nick)
                eee.add_field(
                    name="参加日時", value=discord.utils.format_dt(mg.joined_at))
                eee.add_field(name="メンバー認証をしていますか?", value=aaa).set_thumbnail(
                    url=user.display_avatar.url
                )
                if mg.premium_since:
                    eee.add_field(
                        name="ブーストした日時", 
                        value=discord.utils.format_dt(mg.premium_since)
                    )
                if mg.timed_out_until:
                    eee.add_field(
                        name="タイムアウトが解除される日時",
                        value=discord.utils.format_dt(mg.timed_out_until),
                    )
                aaaauuu = None
                if not user.avatar.url:
                    aaaauuu = user.default_avatar.url
                else:
                    aaaauuu = user.avatar.url
                embeds = [
                    discord.Embed(title="基本情報", color=discord.Colour.blurple())
                    .add_field(
                        name="ユーザー名", 
                        value=user.name
                    )
                    .add_field(
                        name="id", 
                        value=f"`{user.id}`"
                    )
                    .add_field(
                        name="ディスクリミネーター", 
                        value=f"`{user.discriminator}`"
                    )
                    .add_field(
                        name="Botアカウントですか？", 
                        value=b
                    )
                    .add_field(
                        name="システムユーザーですか？", 
                        value=c
                    )
                    .add_field(
                        name="初期アイコンのURL", 
                        value=user.default_avatar.url
                    )
                    .add_field(
                        name="アカウント作成日時", 
                        value=discord.utils.format_dt(user.created_at)
                    )
                    .add_field(
                        name="メンション", 
                        value=user.mention
                        )
                    .set_thumbnail(url=aaaauuu),
                    eee,
                ]
                await Paginator.Simple().start(i, pages=embeds)
            else:
                arre = None
                if not user.avatar.url:
                    arre = user.default_avatar.url
                else:
                    arre = user.avatar.url
                await i.response.send_message(
                    embed=discord.Embed(
                        title="基本情報", color=discord.Colour.blurple())
                    .add_field(name="ユーザー名", value=user.name)
                    .add_field(name="id", value=f"`{user.id}`")
                    .add_field(name="ディスクリミネーター", value=f"`{user.discriminator}`")
                    .add_field(name="Botアカウントですか？", value=b)
                    .add_field(name="システムユーザーですか？", value=c)
                    .add_field(
                        name="初期アイコンのURL", 
                        value=user.default_avatar.url
                        )
                    .add_field(
                        name="アカウント作成日", value=discord.utils.format_dt(user.created_at)
                    )
                    .add_field(name="メンション", value=user.mention)
                    .set_thumbnail(arre)
                )
        except:
            arre2 = None
            if not user.avatar.url:
                arre2 = user.default_avatar.url
            else:
                arre2 = user.avatar.url
            await i.response.send_message(
                embed=discord.Embed(
                    title="基本情報", color=discord.Colour.blurple())
                .add_field(name="ユーザー名", value=user.name)
                .add_field(name="id", value=f"`{user.id}`")
                .add_field(name="ディスクリミネーター", value=f"`{user.discriminator}`")
                .add_field(name="Botアカウントですか？", value=b)
                .add_field(name="システムユーザーですか？", value=c)
                .add_field(name="初期アイコンのURL", value=user.default_avatar.url)
                .add_field(
                    name="アカウント作成日", value=discord.utils.format_dt(user.created_at)
                )
                .add_field(name="メンション", value=user.mention)
                .set_thumbnail(arre2)
            )


async def setup(bot: commands.Bot) -> None:
    await bot.add_cog(Userinfo(bot))
