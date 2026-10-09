#!/usr/bin/env python3
"""Generate public/og/default.png — the site-wide 1200x630 Open Graph card.

    python3 scripts/make-og-default.py
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
MARK = ROOT / "public" / "logo" / "symbol.png"
OUT = ROOT / "public" / "og" / "default.png"

W, H = 1200, 630
BG = (12, 12, 12)
FG = (255, 255, 255)
SUB = (150, 150, 150)

MARK_H = 150
GAP_TITLE = 48
GAP_SUB = 20
TITLE, SUBTITLE = "Watanid", "Small Mac and mobile apps, built for real routines."
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_REG = "/System/Library/Fonts/Supplemental/Arial.ttf"


def main() -> None:
    canvas = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(canvas)

    mark = Image.open(MARK).convert("RGBA")
    scale = MARK_H / mark.height
    mark = mark.resize((round(mark.width * scale), MARK_H), Image.LANCZOS)

    title_font = ImageFont.truetype(FONT_BOLD, 76)
    sub_font = ImageFont.truetype(FONT_REG, 30)

    tl, tt, tr, tb = draw.textbbox((0, 0), TITLE, font=title_font)
    sl, st, sr, sb = draw.textbbox((0, 0), SUBTITLE, font=sub_font)

    block = MARK_H + GAP_TITLE + (tb - tt) + GAP_SUB + (sb - st)
    y = (H - block) // 2

    canvas.paste(mark, ((W - mark.width) // 2, y), mark)
    y += MARK_H + GAP_TITLE
    draw.text(((W - (tr - tl)) // 2 - tl, y - tt), TITLE, font=title_font, fill=FG)
    y += (tb - tt) + GAP_SUB
    draw.text(((W - (sr - sl)) // 2 - sl, y - st), SUBTITLE, font=sub_font, fill=SUB)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(OUT, "PNG", optimize=True)
    print(f"wrote {OUT.relative_to(ROOT)}  {canvas.size[0]}x{canvas.size[1]}")


if __name__ == "__main__":
    main()
