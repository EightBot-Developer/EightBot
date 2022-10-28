from discord import (
    Intents,
    Status,
    Activity,
    ActivityType,
    Game,
    errors,
    AllowedMentions,
)
from itertools import cycle
from discord.ext import commands, tasks
from os import listdir, getenv
from webserver import keep_alive
from datetime import datetime


class EightBot(commands.Bot):
    async def setup_hook(self):
        self.kidou = 0
        await keep_alive()
        for name in listdir("cogs"):
            if not name.startswith(("_", ".")):
                await bot.load_extension(
                    f"cogs.{name[:-3] if name.endswith('.py') else name}"
                )
        await bot.load_extension("jishaku")
        await self.tree.sync()


bot = EightBot(
    command_prefix="eg!",
    intents=Intents(auto_moderation=False, typing=False, message_content=False),
    activity=Activity(
        type=ActivityType.watching,
        name="起動準備をしています...",
    ),
    allowed_mentions=AllowedMentions(
        everyone=False, users=True, roles=False, replied_user=True
    ),
    status=Status.dnd,
    help_command=None,
)


@tasks.loop(seconds=5)
async def status_swap(cycle_d):
    await bot.change_presence(
        activity=Game(next(cycle_d)),
        status=Status.online
    )


@bot.listen(name="on_ready")
async def bot_ready():
    bot.kidou = int(datetime.now().timestamp())
    print("login.")
    await status_swap.start(
        cycle(
            [
                f"/help | {len(bot.guilds)} server",
                f"/help | {len(bot.users)} user",
            ]
        )
    )


try:
    bot.run(getenv("token"))

except errors.HTTPException:
    print("レートリミットに引っかかってます。")
