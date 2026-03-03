# SERVICEPRO-NEWVISION 🚀
## Service Management System — Local Version

---

## Requirements
**Node.js** — one time only:
1. Go to https://nodejs.org
2. Click **LTS** (the green button)
3. Install — Next → Next → Finish

---

## How to Run

### Windows:
Double-click **START.bat**
The app will open automatically in your browser at:
```
http://localhost:3000
```

### Mac / Linux:
```bash
chmod +x start.sh
./start.sh
```

---

## Where is data saved?
**Everything is saved in:** `data/db.json`

- Every change you make (new customer, ticket, project) is saved **immediately** to this file
- The file is stored on your computer — **not in the cloud, not in Claude**
- Backup: simply copy the `data` folder anywhere

---

## Network Sharing
When the server is running, you can open it from any computer on your local network:
```
http://[IP shown in terminal]:3000
```

---

## Stop the Server
Press **Ctrl+C** in the terminal window

---

## File Structure
```
SERVICEPRO-NEWVISION/
├── START.bat          ← Run on Windows (double-click this!)
├── start.sh           ← Run on Mac/Linux
├── server.js          ← The server
├── package.json       ← Settings
├── data/
│   └── db.json        ← All your data ← BACK THIS UP!
└── public/
    └── index.html     ← The app
```
