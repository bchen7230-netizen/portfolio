#!/bin/sh
# Serve this folder locally and open it in your browser (macOS / Linux).
cd "$(dirname "$0")/.."
echo "Starting local preview on http://localhost:8080"
(sleep 1; open http://localhost:8080/index.html 2>/dev/null || xdg-open http://localhost:8080/index.html 2>/dev/null) &
python3 -m http.server 8080
