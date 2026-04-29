import os
import json
from fastapi import APIRouter, Depends
from typing import List, Dict, Any
from collections import defaultdict
from app.db.deps import get_db
from app.core.deps_auth import get_current_admin
from app.modules.user_model import User

router = APIRouter(prefix="/admin/monitoring", tags=["monitoring"])

def get_parsed_logs(limit=2000):
    log_file_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "logs", "app.log")
    logs = []
    if os.path.exists(log_file_path):
        with open(log_file_path, "r") as f:
            lines = f.readlines()
            last_lines = lines[-limit:] if len(lines) > limit else lines
            for line in last_lines:
                if line.strip():
                    try:
                        logs.append(json.loads(line.strip()))
                    except:
                        pass
    return logs

@router.get("/latency")
def get_latency_metrics(_: User = Depends(get_current_admin)):
    logs = get_parsed_logs()
    
    # We want to extract latency from message: "GET /path - 200 - 0.0188s"
    latencies = []
    for log in logs:
        msg = log.get("message", "")
        if " - " in msg and msg.endswith("s"):
            parts = msg.split(" - ")
            if len(parts) >= 3:
                time_str = parts[-1].replace("s", "")
                try:
                    latencies.append(float(time_str))
                except:
                    pass

    if not latencies:
        return {"average": 0.0, "p95": 0.0, "data": []}

    latencies.sort()
    avg = sum(latencies) / len(latencies)
    p95_idx = int(len(latencies) * 0.95)
    p95 = latencies[p95_idx] if p95_idx < len(latencies) else latencies[-1]
    
    # For chart data (simple mock over time based on log order)
    chart_data = [{"time": logs[i].get("time"), "latency": latencies[i]} for i in range(min(50, len(latencies)))]

    return {
        "average": round(avg, 4),
        "p95": round(p95, 4),
        "data": chart_data
    }

@router.get("/errors")
def get_error_rates(_: User = Depends(get_current_admin)):
    logs = get_parsed_logs()
    success_count = 0
    error_count = 0
    
    for log in logs:
        if log.get("level") == "ERROR":
            error_count += 1
        elif log.get("level") == "INFO":
            msg = log.get("message", "")
            if " - " in msg:
                parts = msg.split(" - ")
                if len(parts) >= 2:
                    status = parts[1].strip()
                    if status.startswith("4") or status.startswith("5"):
                        error_count += 1
                    elif status.startswith("2") or status.startswith("3"):
                        success_count += 1

    total = success_count + error_count
    error_rate = (error_count / total * 100) if total > 0 else 0

    return {
        "success": success_count,
        "errors": error_count,
        "error_rate": round(error_rate, 2)
    }

@router.get("/security")
def get_security_events(_: User = Depends(get_current_admin)):
    logs = get_parsed_logs()
    failed_logins = 0
    unauthorized = 0
    
    events = []
    
    for log in logs:
        msg = log.get("message", "")
        # Very simple heuristic based on 401s
        if " - 401 -" in msg:
            if "/auth/login" in msg:
                failed_logins += 1
                events.append({"time": log.get("time"), "type": "Failed Login", "actor": log.get("actor", "anonymous")})
            else:
                unauthorized += 1
                events.append({"time": log.get("time"), "type": "Unauthorized Access", "actor": log.get("actor", "anonymous")})
                
    # Return last 10 events
    return {
        "failed_logins": failed_logins,
        "unauthorized": unauthorized,
        "recent_events": events[-10:]
    }

@router.get("/traffic")
def get_traffic_analytics(_: User = Depends(get_current_admin)):
    logs = get_parsed_logs()
    # Mocking days/traffic from recent logs
    hits = 0
    endpoint_counts = defaultdict(int)
    
    for log in logs:
        if log.get("source") == "site":
            hits += 1
            service = log.get("service")
            if service and service != "system":
                endpoint_counts[service] += 1
                
    top_endpoints = sorted([{"endpoint": k, "hits": v} for k, v in endpoint_counts.items()], key=lambda x: x["hits"], reverse=True)[:5]
    
    return {
        "total_hits_recent": hits,
        "top_endpoints": top_endpoints
    }

@router.get("/dashboard/activity")
def get_internal_activity(_: User = Depends(get_current_admin)):
    logs = get_parsed_logs()
    
    activities = []
    # Translate raw logs into business events
    for log in logs:
        if log.get("source") == "internal":
            actor = log.get("actor")
            if not actor or actor == "anonymous":
                continue
                
            service = log.get("service", "")
            method = "Accessed"
            msg = log.get("message", "")
            if "POST" in msg:
                method = "Created/Updated"
            elif "DELETE" in msg:
                method = "Deleted"
                
            # Filter out basic polling
            if "/admin/logs" in service or "/admin/monitoring" in service:
                continue
                
            activities.append({
                "time": log.get("time"),
                "actor": actor,
                "action": f"{method} {service}"
            })
            
    # online users heuristic (actors active in last 100 logs)
    online_users = set()
    for log in logs[-100:]:
        actor = log.get("actor")
        if actor and actor != "anonymous" and log.get("source") == "internal":
            online_users.add(actor)
            
    return {
        "online_users": list(online_users),
        "recent_activities": activities[-10:]
    }
