import asyncio
from console import Console
console = Console()

async def test():
    await console.test()


loop = asyncio.get_event_loop()
loop.run_until_complete(test())
loop.close()
