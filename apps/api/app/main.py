import logging
import time
from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.middleware.cors import CORSMiddleware
from prometheus_client import make_asgi_app
from pythonjsonlogger import jsonlogger

# Logger setup
logger = logging.getLogger("economics-api")
logHandler = logging.StreamHandler()
formatter = jsonlogger.JsonFormatter()
logHandler.setFormatter(formatter)
logger.addHandler(logHandler)
logger.setLevel(logging.INFO)

app = FastAPI(title="Cloud Economics Calculator API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Metrics
metrics_app = make_asgi_app()
app.mount("/metrics", metrics_app)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    duration = time.time() - start_time
    logger.info(f"Path: {request.url.path} Duration: {duration:.4f}s Status: {response.status_code}")
    return response

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.post("/calculate/tco")
async def calculate_tco(data: dict):
    # TCO calculation logic here
    return {
        "on_prem_tco": 1500000.00,
        "cloud_tco": 950000.00,
        "savings": 550000.00,
        "break_even_months": 14
    }

@app.post("/calculate/roi")
async def calculate_roi(data: dict):
    # ROI calculation logic here
    return {
        "investment": 200000.00,
        "3_year_gain": 850000.00,
        "roi_percentage": 325.0
    }

@app.get("/dashboard/summary")
def get_dashboard_summary():
    return {
        "active_scenarios": 12,
        "avg_projected_savings": 22.5,
        "total_modeled_spend": 4500000.00
    }
