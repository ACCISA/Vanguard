import logging
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import asyncio
import aiofiles  # For async file handling
import os  # To check if the file exists

logging.basicConfig(
    level=logging.DEBUG,
    format='%(levelname)s [%(asctime)s] %(filename)s:%(lineno)d - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

app = FastAPI(timeout=86400)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

network = None  # Placeholder for network scanning logic


async def assign_scan_result():
    await network.runInitialNetworkScan()


@app.post("/results")
async def post_results(request: Request):
    logging.debug("Attempting to fetch results file")

    file_path = f"/var/log/nmap_results.log"  # Adjust this path as needed

    # Check if the file exists
    if not os.path.isfile(file_path):
        raise HTTPException(status_code=404, detail="File not found")

    print(FileResponse(file_path))
    # Serve the file
    return FileResponse(file_path)


@app.post("/interact")
async def post_interact(request: Request):
    logging.debug("attempting to interact with a session")
    data = await request.json()


@app.post("/scan")
async def post_getip(request: Request):
    # try:
    logging.debug("hh")
    data = await request.json()

    if "ip_range" not in data.keys():
        return JSONResponse(content={"status": "MISSING_KEY_NAME"}, status_code=422)

    ip_range = data.get("ip_range")
    logging.debug("/scan called -> "+str(ip_range))
    global network
    network = Network(ip_range)
    task = asyncio.create_task(assign_scan_result())
    return JSONResponse(content={"status": "scan_started"})

    # except Exception as e:
    # return JSONResponse(content={"status":"GETIP_FAILED","detail":str(e)})


@app.post("/exploit")
async def post_getip(request: Request):
    # try:
    logging.debug("welcome to the exploit endpoint")
    data = await request.json()

    if "port" not in data.keys():
        return JSONResponse(content={"status": "MISSING_KEY_NAME"}, status_code=422)
    if "rhost" not in data.keys():
        return JSONResponse(content={"status": "MISSING_KEY_NAME"}, status_code=422)

    logging.debug("The function exploit was called and the port is " +
                  str(data.get("port"))+" and the rhost is "+str(data.get("rhost")))

    machine = Machine(data.get("rhost"))
    machine.exploitPort(data.get("port"))

    # ip_range = data.get("ip_range")
    # logging.debug("/scan called -> "+str(ip_range))
    # network = Network(ip_range)
    # network.runInitialNetworkScan()

    # except Exception as e:
    # return JSONResponse(content={"status":"GETIP_FAILED","detail":str(e)})


@app.get("/machines")
async def get_machines(request: Request):
    global network
    return JSONResponse(content={"machines": network.getMachines()})


@app.post("/status_scan")
async def post_status_scan(request: Request):
    logging.debug("polling status scan")

logging.basicConfig(level=logging.DEBUG)
