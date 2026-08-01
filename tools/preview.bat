@echo off
REM Serve this folder locally and open it in your browser.
REM The site needs to be SERVED (not opened as a file) because it uses ES modules.
cd /d "%~dp0.."
echo Starting local preview on http://localhost:8080
start "" http://localhost:8080/index.html
python -m http.server 8080
