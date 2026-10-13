@echo off
npm install
if errorlevel 1 exit /b 1
npm run check
