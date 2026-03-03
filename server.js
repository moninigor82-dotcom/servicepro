const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'db.json');

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// ── helpers ──────────────────────────────────────────────
function readDB() {
  try {
    if (!fs.existsSync(DATA_FILE)) return defaultDB();
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch { return defaultDB(); }
}

function writeDB(db) {
  db.updatedAt = new Date().toISOString();
  fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), 'utf8');
}

function defaultDB() {
  return {
    customers: [], contracts: [], tickets: [],
    projects: [], slas: [],
    ticketCounter: 1,
    settings: { appName: 'SERVICEPRO-NEWVISION', tagline: 'מערכת ניהול שירות', fromEmail: '', fromName: '', logoEmoji: '⚡' },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

// ── routes ───────────────────────────────────────────────

// Get full DB
app.get('/api/data', (req, res) => {
  res.json(readDB());
});

// Save full DB
app.post('/api/data', (req, res) => {
  try {
    const db = req.body;
    writeDB(db);
    res.json({ ok: true, savedAt: db.updatedAt });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Patch single collection
app.post('/api/data/:collection', (req, res) => {
  try {
    const { collection } = req.params;
    const allowed = ['customers','contracts','tickets','projects','slas','settings'];
    if (!allowed.includes(collection)) return res.status(400).json({ ok: false, error: 'Unknown collection' });
    const db = readDB();
    db[collection] = req.body;
    writeDB(db);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Backup download
app.get('/api/backup', (req, res) => {
  const db = readDB();
  const filename = `servicepro-backup-${new Date().toISOString().split('T')[0]}.json`;
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(db, null, 2));
});

// Restore from upload
app.post('/api/restore', (req, res) => {
  try {
    writeDB(req.body);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Server info
app.get('/api/info', (req, res) => {
  const interfaces = os.networkInterfaces();
  const ips = [];
  for (const iface of Object.values(interfaces)) {
    for (const info of iface) {
      if (info.family === 'IPv4' && !info.internal) ips.push(info.address);
    }
  }
  res.json({ ok: true, port: PORT, localIPs: ips, hostname: os.hostname() });
});

// ── start ────────────────────────────────────────────────
if (!fs.existsSync(path.join(__dirname, 'data'))) fs.mkdirSync(path.join(__dirname, 'data'));
if (!fs.existsSync(DATA_FILE)) writeDB(defaultDB());

app.listen(PORT, '0.0.0.0', () => {
  const interfaces = os.networkInterfaces();
  const ips = [];
  for (const iface of Object.values(interfaces)) {
    for (const info of iface) {
      if (info.family === 'IPv4' && !info.internal) ips.push(info.address);
    }
  }
  console.log('\n🚀 SERVICEPRO-NEWVISION פועל!');
  console.log('─'.repeat(40));
  console.log(`📍 מקומי:     http://localhost:${PORT}`);
  ips.forEach(ip => console.log(`🌐 ברשת:      http://${ip}:${PORT}`));
  console.log('─'.repeat(40));
  console.log('📁 נתונים:    data/db.json');
  console.log('⏹  לעצור:     Ctrl+C\n');
});
