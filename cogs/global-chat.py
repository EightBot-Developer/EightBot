import discord
from discord.ext import commands
from discord import app_commands
from replit import db


def global_chat_set(key: int, data: str):
    if data == "True":
        db[f"global_chat_{key}"] = "True"
    else:
        db[f"global_chat_{key}"] = "False"


def global_chat(key: int):
    try:
        return db[f"global_chat_{key}"]
    except KeyError:
        return "False"


class global_chat_cog(commands.Cog):
    def __init__(self, bot: commands.Bot) -> None:
        self.bot: commands.Bot = bot

    @commands.Cog.listener(name="on_message")
    async def global_chat_msg_sys(self, message: discord.Message):
        if message.author.bot:
            return
        if message.channel.type == discord.ChannelType.text:
            for channel in self.bot.get_all_channels():
                if global_chat(channel.id) == "True":
                    if channel.id == message.channel.id:
                        continue
                    embed = discord.Embed(
                        description=message.content, color=0x3498DB)
                    if hasattr(message.author.avatar, 'key'):
                        embed.set_author(name="{}#{}".format(message.author.name, message.author.discriminator), icon_url="https://media.discordapp.net/avatars/{}/{}.png?size=1024".format(
                            message.author.id, message.author.avatar.key))
                    else:
                        embed.set_author(name="{}#{}".format(
                            message.author.name, message.author.discriminator), url=f"https://discord.com/users/{message.author.id}")
                    if hasattr(message.guild.icon, 'key'):
                        embed.set_footer(text="{} / mID:{}".format(message.guild.name, message.id),
                                         icon_url="https://media.discordapp.net/icons/{}/{}.png?size=1024".format(message.guild.id, message.guild.icon.key))
                    else:
                        embed.set_footer(
                            text="{} / mID:{}".format(message.guild.name, message.id))
                    if message.attachments != []:
                        embed.set_image(url=message.attachments[0].url)
                    if message.stickers != []:
                        embed.set_thumbnail(url=message.stickers[0].url)
                    if message.reference:
                        reference_msg = await message.channel.fetch_message(message.reference.message_id)
                        if reference_msg.embeds and reference_msg.author == self.bot.user:
                            reference_message_content = reference_msg.embeds[0].description
                            reference_message_author = reference_msg.embeds[0].author.name
                        elif reference_msg.author != self.bot.user:
                            reference_message_content = reference_msg.content
                            reference_message_author = reference_msg.author.name + \
                                '#'+reference_msg.author.discriminator
                        reference_content = ""
                        for string in reference_message_content.splitlines():
                            reference_content += "> " + string + "\n"
                        reference_value = "**@{}**\n{}".format(
                            reference_message_author, reference_content)
                        embed.add_field(
                            name='返信', value=reference_value, inline=True)

                    await message.send(embed=embed)
            await message.add_reaction('✅')

    @app_commands.guild_only()
    @app_commands.command(name="global_chat_join", description="グローバルチャットを有効にします。")
    async def global_set(self, i: discord.Interaction):
        try:
            if i.channel.type == discord.ChannelType.text:
                global_chat_set(i.channel_id, "True")
                await i.response.send_message("グローバルチャットを有効にしました。", ephemeral=True)
            else:
                await i.response.send_message("グローバルチャットを有効にできませんでした。", ephemeral=True)
        except:
            await i.response.send_message("グローバルチャットを有効にできませんでした。", ephemeral=True)

    @app_commands.guild_only()
    @app_commands.command(name="global_chat_leave", description="グローバルチャットを無効にします。")
    async def global_not_set(self, i: discord.Interaction):
        try:
            if i.channel.type == discord.ChannelType.text:
                global_chat_set(i.channel_id, "False")
                await i.response.send_message("グローバルチャットを無効にしました。", ephemeral=True)
            else:
                await i.response.send_message("グローバルチャットを無効にできませんでした。", ephemeral=True)
        except:
            await i.response.send_message("グローバルチャットを無効にできませんでした。", ephemeral=True)


async def setup(bot: commands.Bot) -> None:
    await bot.add_cog(global_chat_cog(bot))
