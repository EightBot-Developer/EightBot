from discord.ext import commands
from discord import Embed
from discord import ui, TextStyle, ButtonStyle, app_commands, Interaction


class Modal(ui.Modal, title="Embed作成パネル"):
    titles = ui.TextInput(
        label="タイトル",
        style=TextStyle.long,
        placeholder="埋め込みのタイトル。256文字まで",
        max_length=256,
        required=False,
    )
    description = ui.TextInput(
        label="説明",
        style=TextStyle.long,
        placeholder="埋め込みの説明。4000文字まで",
        max_length=4000,
        required=True,
    )
    set_footer_text = ui.TextInput(
        label="フッターテキスト",
        style=TextStyle.long,
        placeholder="フッターテキスト。2048文字まで",
        max_length=2048,
        required=False,
    )
    f_icon_url = ui.TextInput(
        label="フッターアイコン",
        style=TextStyle.short,
        placeholder="フッターアイコンのURL。Http(s)のみ",
        required=False,
    )
    samuneiru = ui.TextInput(
        label="サムネイル",
        style=TextStyle.short,
        placeholder="埋め込みコンテンツのサムネイル。Http(s)のみ",
        required=False,
    )

    async def on_submit(self, interaction: Interaction):
        if (
            str(self.f_icon_url).startswith("http://")
            or str(self.samuneiru).startswith("http://")
            or str(self.f_icon_url).startswith("https://")
            or str(self.samuneiru).startswith("https://")
        ):
            await interaction.response.send_message(
                "URLはhttp(s)から始まります。", ephemeral=True
            )
            return
        embed = Embed(title=self.titles, description=self.description)
        embed.set_footer(text=self.set_footer_text, icon_url=self.f_icon_url)
        embed.set_thumbnail(url=self.samuneiru)
        buttonView = ui.View(timeout=None)
        buttonView.add_item(
            ui.Button(
                label="Color",
                style=ButtonStyle.primary,
                custom_id="color_01",
            )
        )
        buttonView.add_item(
            ui.Button(label="灰色", style=ButtonStyle.gray, custom_id="color_02")
        )
        buttonView.add_item(
            ui.Button(label="緑", style=ButtonStyle.green, custom_id="color_03")
        )
        buttonView.add_item(
            ui.Button(label="赤", style=ButtonStyle.red, custom_id="color_04")
        )
        await interaction.response.send_message(embed=embed, view=buttonView)


class embed_make(commands.Cog):
    def __init__(self, bot: commands.Bot) -> None:
        self.bot: commands.Bot = bot

    @commands.Cog.listener(name="on_interaction")
    async def color_interaction(self, i: Interaction):
        if i.data.get("custom_id") == "color_01":
            em = i.message.embeds[0]
            em.color = 0x5865F2
            await i.message.edit(embed=em)
            return await i.response.send_message("完了!", ephemeral=True)
        if i.data.get("custom_id") == "color_02":
            em = i.message.embeds[0]
            em.color = 0x4F545C
            await i.message.edit(embed=em)
            return await i.response.send_message("完了!", ephemeral=True)
        if i.data.get("custom_id") == "color_03":
            em = i.message.embeds[0]
            em.color = 0x43B581
            await i.message.edit(embed=em)
            return await i.response.send_message("完了!", ephemeral=True)
        if i.data.get("custom_id") == "color_04":
            em = i.message.embeds[0]
            em.color = 0xF04747
            await i.message.edit(embed=em)
            return await i.response.send_message("完了!", ephemeral=True)

        else:
            return

    @app_commands.command(name="embed_make", description="Embedを作成し、送信します。")
    async def embed_make(self, i: Interaction):
        await i.response.send_modal(Modal())


async def setup(bot: commands.Bot) -> None:
    await bot.add_cog(embed_make(bot))
