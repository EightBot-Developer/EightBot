import aiofiles
import json

not_str_msg = 'The argument "database_name" accepts only type "str".'


class Database:
    def __init__(self, database_name: str) -> None:
        """Configure Database settings and return data!
        param1 name: database_name
        param1 description: Database file name
        param1 type: str
        return: None
        """
        if type(database_name) != str:
            raise TypeError(not_str_msg)
        self.database_name: str = database_name

    async def set(self, name, value) -> None:
        file = f"./data/{name}/{self.database_name}.json"
        async with aiofiles.open(file, "a") as f:
            f.write(json.dumps({value: value}))
        return json.dumps({value: value})

    async def get(self, name) -> None:
        file = f"./data/{name}/{self.database_name}.json"
        async with aiofiles.open(file, "r", encoding="utf-8") as f:
            data = dict(await f.read())
        return data
