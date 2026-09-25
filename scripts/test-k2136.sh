#!/usr/bin/env bash
# Smoke-test the /k2136 smart link against every User-Agent case.
#
#   ./scripts/test-k2136.sh                        # defaults to localhost:3000
#   ./scripts/test-k2136.sh https://watanid.com    # against production
#
# Prints the status code and, for redirects, the Location header.

set -uo pipefail

BASE="${1:-http://localhost:3000}"
CAMPAIGN="${2:-kr}"
URL="$BASE/k2136?c=$CAMPAIGN"

ANDROID_CHROME='Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36'
ANDROID_IG='Mozilla/5.0 (Linux; Android 13; SM-S918B Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/125.0.0.0 Mobile Safari/537.36 Instagram 334.0.0.42.95 Android'
IPHONE_SAFARI='Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1'
IPHONE_IG='Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 334.0.0.42.95 (iPhone15,2; iOS 17_5; en_US) [FBAN/FBIOS;FBAV/334.0.0.42.95]'
DESKTOP='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
META_BOT='facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)'

check() {
  local label="$1" ua="$2"
  local out status location
  out=$(curl -sS -o /dev/null -D - -A "$ua" "$URL" 2>/dev/null)
  status=$(printf '%s' "$out" | awk 'NR==1{print $2}')
  location=$(printf '%s' "$out" | tr -d '\r' | awk -F': ' 'tolower($1)=="location"{print $2}')
  printf '%-26s %s  %s\n' "$label" "${status:-ERR}" "${location:-(landing page)}"
}

echo "Testing $URL"
echo
check "Android Chrome"      "$ANDROID_CHROME"
check "Android Instagram"   "$ANDROID_IG"
check "iPhone Safari"       "$IPHONE_SAFARI"
check "iPhone Instagram"    "$IPHONE_IG"
check "Desktop Chrome"      "$DESKTOP"
check "facebookexternalhit" "$META_BOT"
echo
echo "No ?c= (expects campaign 'direct'):"
curl -sS -o /dev/null -D - -A "$ANDROID_CHROME" "$BASE/k2136" 2>/dev/null \
  | tr -d '\r' | awk -F': ' 'tolower($1)=="location"{print "  " $2}'
echo
echo "Meta crawler og: tags:"
curl -sS -A "$META_BOT" "$URL" 2>/dev/null | grep -E 'og:(title|description|url)|name="robots"' | sed 's/^ */  /'
