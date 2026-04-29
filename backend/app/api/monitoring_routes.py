import os
from fastapi import APIRouter, Depends
from typing import List, Dict, Any
from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from datetime import datetime, timedelta

from app.db.deps import get_db
from app.core.deps_auth import get_current_admin
from app.modules.user_model import User
from app.modules.audit_model import AuditLog

router = APIRouter(prefix="/admin/monitoring", tags=["monitoring"])

@router.post("/maintenance/purge-logs")
def manual_purge_logs(_: User = Depends(get_current_admin)):
    """Manually trigger audit log purge. Removes entries older than retention window."""
    from app.services.log_retention import purge_old_audit_logs, LOG_RETENTION_DAYS
    deleted = purge_old_audit_logs()
    return {"deleted_rows": deleted, "retention_days": LOG_RETENTION_DAYS}


@router.get("/latency")
def get_latency_metrics(db: Session = Depends(get_db), _: User = Depends(get_current_admin)):
    recent_logs = db.query(AuditLog.time, AuditLog.process_time).filter(
        AuditLog.process_time.isnot(None)
    ).order_by(AuditLog.id.desc()).limit(500).all()

    if not recent_logs:
        return {"average": 0.0, "p95": 0.0, "data": []}

    latencies = [log.process_time for log in recent_logs]
    latencies.sort()
    
    avg = sum(latencies) / len(latencies)
    p95_idx = int(len(latencies) * 0.95)
    p95 = latencies[p95_idx] if p95_idx < len(latencies) else latencies[-1]
    
    chart_data = [{"time": log.time.strftime("%H:%M:%S") if log.time else "", "latency": log.process_time} for log in reversed(recent_logs[:50])]

    return {
        "average": round(avg, 4),
        "p95": round(p95, 4),
        "data": chart_data
    }

@router.get("/errors")
def get_error_rates(db: Session = Depends(get_db), _: User = Depends(get_current_admin)):
    last_24h = datetime.utcnow() - timedelta(days=1)
    
    success_count = db.query(AuditLog).filter(AuditLog.time >= last_24h, AuditLog.status_code < 400).count()
    error_count = db.query(AuditLog).filter(AuditLog.time >= last_24h, AuditLog.status_code >= 400).count()

    total = success_count + error_count
    error_rate = (error_count / total * 100) if total > 0 else 0

    return {
        "success": success_count,
        "errors": error_count,
        "error_rate": round(error_rate, 2)
    }

@router.get("/security")
def get_security_events(db: Session = Depends(get_db), _: User = Depends(get_current_admin)):
    last_24h = datetime.utcnow() - timedelta(days=1)
    
    failed_logins = db.query(AuditLog).filter(AuditLog.time >= last_24h, AuditLog.status_code == 401, AuditLog.service.contains("/auth/login")).count()
    unauthorized = db.query(AuditLog).filter(AuditLog.time >= last_24h, AuditLog.status_code == 401, ~AuditLog.service.contains("/auth/login")).count()
    
    recent_events_q = db.query(AuditLog).filter(AuditLog.status_code == 401).order_by(AuditLog.id.desc()).limit(10).all()
    
    events = []
    for log in reversed(recent_events_q):
        ev_type = "Failed Login" if "/auth/login" in (log.service or "") else "Unauthorized Access"
        events.append({"time": log.time.strftime("%H:%M:%S") if log.time else "", "type": ev_type, "actor": log.actor or "anonymous"})

    return {
        "failed_logins": failed_logins,
        "unauthorized": unauthorized,
        "recent_events": events
    }

@router.get("/traffic")
def get_traffic_analytics(db: Session = Depends(get_db), _: User = Depends(get_current_admin)):
    last_24h = datetime.utcnow() - timedelta(days=1)
    
    total_hits = db.query(AuditLog).filter(AuditLog.source == "site", AuditLog.time >= last_24h).count()
    
    top_endpoints_q = db.query(
        AuditLog.service, func.count(AuditLog.id).label("hits")
    ).filter(
        AuditLog.source == "site", AuditLog.time >= last_24h
    ).group_by(AuditLog.service).order_by(desc("hits")).limit(5).all()
    
    top_endpoints = [{"endpoint": row.service, "hits": row.hits} for row in top_endpoints_q if row.service != "system"]

    return {
        "total_hits_recent": total_hits,
        "top_endpoints": top_endpoints
    }

@router.get("/dashboard/activity")
def get_internal_activity(db: Session = Depends(get_db), _: User = Depends(get_current_admin)):
    activities_q = db.query(AuditLog).filter(
        AuditLog.source == "internal", AuditLog.actor != "anonymous"
    ).order_by(AuditLog.id.desc()).limit(10).all()
    
    activities = []
    for log in reversed(activities_q):
        method = "Accessed"
        if "POST" in log.message: method = "Created/Updated"
        elif "DELETE" in log.message: method = "Deleted"
        elif "PATCH" in log.message: method = "Updated"
        
        activities.append({
            "time": log.time.strftime("%H:%M:%S") if log.time else "",
            "actor": log.actor,
            "action": f"{method} {log.service}"
        })
        
    last_15m = datetime.utcnow() - timedelta(minutes=15)
    online_users_q = db.query(AuditLog.actor).filter(
        AuditLog.source == "internal", AuditLog.actor != "anonymous", AuditLog.time >= last_15m
    ).distinct().all()
    
    online_users = [row.actor for row in online_users_q]

    return {
        "online_users": online_users,
        "recent_activities": activities
    }
