#!/usr/bin/env python3
"""Generate public/og/k2136.png — the 1200x630 Open Graph card for /k2136.

The source icon is a plain opaque square, so it gets an iOS-style rounded mask
(supersampled for clean edges) before it is composited onto a white canvas.

    python3 scripts/make-og-k2136.py
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
ICON = ROOT / "public" / "images" / "512.png"
OUT = ROOT / "public" / "og" / "k2136.png"

W, H = 1200, 630
BG = (255, 255, 255)
FG = (17, 17, 17)

ICON_SIZE = 248
CORNER_RATIO = 0.225  # Apple's icon corner radius is ~22.5% of the side
GAP = 44
TITLE = "Kanji 2136"
FONT_PATH = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_SIZE = 82
SS = 4  # supersampling factor for the rounded mask


def rounded(img: Image.Image, size: int, radius: int) -> Image.Image:
    icon = img.convert("RGBA").resize((size, size), Image.LANCZOS)
    mask = Image.new("L", (size * SS, size * SS), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        (0, 0, size * SS - 1, size * SS - 1), radius=radius * SS, fill=255
    )
    icon.putalpha(mask.resize((size, size), Image.LANCZOS))
    return icon


def main() -> None:
    canvas = Image.new("RGB", (W, H), BG)
    icon = rounded(Image.open(ICON), ICON_SIZE, int(ICON_SIZE * CORNER_RATIO))

    font = ImageFont.truetype(FONT_PATH, FONT_SIZE)
    draw = ImageDraw.Draw(canvas)

    # Measure the title so the icon + text block sits optically centered.
    left, top, right, bottom = draw.textbbox((0, 0), TITLE, font=font)
    text_w, text_h = right - left, bottom - top

    block_h = ICON_SIZE + GAP + text_h
    y = (H - block_h) // 2

    canvas.paste(icon, ((W - ICON_SIZE) // 2, y), icon)
    draw.text(
        ((W - text_w) // 2 - left, y + ICON_SIZE + GAP - top),
        TITLE,
        font=font,
        fill=FG,
    )

    OUT.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(OUT, "PNG", optimize=True)
    print(f"wrote {OUT.relative_to(ROOT)}  {canvas.size[0]}x{canvas.size[1]}")


if __name__ == "__main__":
    main()
