#!/bin/bash
clear
echo ""
echo "  ======================================="
echo "  SERVICEPRO-NEWVISION"
echo "  מערכת ניהול שירות"
echo "  ======================================="
echo ""
if ! command -v node &> /dev/null; then
    echo "  Node.js לא מותקן! הורד מ: https://nodejs.org"
    exit 1
fi
echo "  Node.js $(node --version) OK"
if [ ! -d "node_modules" ]; then
    echo "  מתקין תלויות..."
    npm install
fi
(sleep 2 && (open "http://localhost:3000" 2>/dev/null || xdg-open "http://localhost:3000" 2>/dev/null)) &
echo "  מפעיל שרת... http://localhost:3000"
echo "  לעצור: Ctrl+C"
echo ""
node server.js
