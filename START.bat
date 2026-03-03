@echo off
title SERVICEPRO-NEWVISION
color 0A

echo.
echo  ========================================
echo  SERVICEPRO-NEWVISION
echo  Service Management System
echo  ========================================
echo.

:: Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo  ERROR: Node.js is not installed!
    echo.
    echo  Download from: https://nodejs.org
    echo  Choose LTS version and install.
    echo.
    pause
    exit /b 1
)

echo  Node.js is installed - OK
echo.

:: Install dependencies if needed
if not exist "node_modules" (
    echo  Installing packages - please wait...
    npm install
    echo.
)

:: Open browser after 2 seconds
start "" cmd /c "timeout /t 2 >nul && start http://localhost:3000"

echo  Starting server...
echo  App will open in your browser at: http://localhost:3000
echo  To stop: press Ctrl+C
echo.

node server.js

pause
