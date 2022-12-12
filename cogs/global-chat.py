import discord
from discord.ext import commands


class global_chat_cog(commands.Cog):
    def __init__(self, bot: commands.Bot) -> None:
        self.bot: commands.Bot = bot

    @commands.Cog.listener(name="on_message")
    async def global_chat_msg_sys(self, message: discord.Message):
        if message.channel.topic: 
            if not message.channel.topic.startswith("eight-global"):
                return
            if message.author.bot: 
                return
            for channel in self.bot.get_all_channels(): 
                if channel.type != discord.ChannelType.text:
                    continue
                if not channel.topic:
                    continue
                if channel.topic.startswith("eight-global"):
                    if channel == message.channel: 
                        continue
                    embed = discord.Embed(description=message.content, color=0x3498DB)
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

                    await channel.send(embed=embed)
            await message.add_reaction('✅')

async def setup(bot: commands.Bot) -> None:
    await bot.add_cog(global_chat_cog(bot))
