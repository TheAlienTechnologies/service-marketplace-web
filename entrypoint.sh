#!/bin/sh
set -e

# Validate that server-only runtime env vars are present before booting.
# (NEXT_PUBLIC_* vars are inlined at build time and are not checked here.)
REQUIRED_VARS="BETTER_AUTH_DATABASE_URL BETTER_AUTH_URL GOOGLE_CLIENT_ID GOOGLE_CLIENT_SECRET"

missing=""
for var in $REQUIRED_VARS; do
  eval "value=\${$var:-}"
  if [ -z "$value" ]; then
    missing="$missing $var"
  fi
done

if [ -n "$missing" ]; then
  echo "ERROR: missing required environment variable(s):$missing" >&2
  echo "Set them via the container environment before starting." >&2
  exit 1
fi

echo "Starting service-marketplace-web on ${HOSTNAME:-0.0.0.0}:${PORT:-3000}"

# Hand off to the container command (defaults to: node server.js).
exec "$@"
