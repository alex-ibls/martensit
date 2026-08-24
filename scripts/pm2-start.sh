#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "→ Сборка production…"
npm run build

exec bash "$ROOT/scripts/pm2-reload.sh"
