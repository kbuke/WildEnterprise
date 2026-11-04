# functions/sa_today.py  (Reviews.py and find_stay_booking.py can import this too)
from datetime import datetime
try:
    from backports.zoneinfo import ZoneInfo
except ImportError:                       # you're on Python 3.8
    from backports.zoneinfo import ZoneInfo   # pip install backports.zoneinfo tzdata

SA_TZ = ZoneInfo("Africa/Johannesburg")

def sa_today():
    return datetime.now(SA_TZ).date()