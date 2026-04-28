import logging
import sys
import json
from logging.handlers import RotatingFileHandler
import os

LOGS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "logs")
os.makedirs(LOGS_DIR, exist_ok=True)
LOG_FILE = os.path.join(LOGS_DIR, "app.log")

class JSONFormatter(logging.Formatter):
    def format(self, record):
        log_obj = {
            "time": self.formatTime(record, "%H:%M:%S"),
            "level": record.levelname,
            "service": record.name,
            "message": record.getMessage()
        }
        return json.dumps(log_obj)

def setup_logger():
    logger = logging.getLogger("vsm")
    logger.setLevel(logging.INFO)
    
    if not logger.handlers:
        file_handler = RotatingFileHandler(LOG_FILE, maxBytes=5*1024*1024, backupCount=3)
        file_handler.setFormatter(JSONFormatter())
        
        console_handler = logging.StreamHandler(sys.stdout)
        console_handler.setFormatter(logging.Formatter("%(asctime)s - %(levelname)s - %(name)s - %(message)s"))
        
        logger.addHandler(file_handler)
        logger.addHandler(console_handler)
    
    return logger

logger = setup_logger()
