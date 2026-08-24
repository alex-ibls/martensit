#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if ! command -v pm2 >/dev/null 2>&1; then
  echo "pm2 не найден. Установите: npm i -g pm2" >&2
  exit 1
fi

if [ ! -d .next ]; then
  echo "Нет сборки .next. Сначала: npm run build" >&2
  exit 1
fi

echo "→ Запуск через pm2 на порту 3002…"
pm2 startOrReload "$ROOT/ecosystem.config.cjs" --update-env
pm2 status martensit
echo "Сайт: http://localhost:3002"
