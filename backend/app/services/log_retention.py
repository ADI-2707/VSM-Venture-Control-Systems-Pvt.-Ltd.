from datetime import datetime, timedelta
from app.db.session import SessionLocal
from app.modules.audit_model import AuditLog

LOG_RETENTION_DAYS = 90


def purge_old_audit_logs() -> int:
    """
    Deletes AuditLog rows older than LOG_RETENTION_DAYS.
    Returns the number of rows deleted.
    Run this as a scheduled task (e.g. daily cron / cloud scheduler).
    """
    cutoff = datetime.utcnow() - timedelta(days=LOG_RETENTION_DAYS)
    db = SessionLocal()
    try:
        deleted = db.query(AuditLog).filter(AuditLog.time < cutoff).delete(synchronize_session=False)
        db.commit()
        print(f"[AuditLog Purge] Deleted {deleted} rows older than {cutoff.date()}")
        return deleted
    except Exception as e:
        db.rollback()
        print(f"[AuditLog Purge] Error: {e}")
        return 0
    finally:
        db.close()
