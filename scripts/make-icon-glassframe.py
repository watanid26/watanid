#!/usr/bin/env python3
"""Generate public/images/glassframe.png — the Glassframe app-list icon.

Recreated from the icon design: a dark navy rounded square holding a page of
text, with a translucent "glass" panel and a play button floating over it.
Everything is drawn supersampled and downsampled once, so the edges stay clean.

    python3 scripts/make-icon-glassframe.py
"""

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "images" / "glassframe.png"

S = 1024          # final icon size
SS = 4            # supersampling factor
R = int(S * 0.225)  # Apple-style corner radius

TOP = (38, 46, 87)     # gradient start
BOTTOM = (16, 21, 43)  # gradient end


def px(v: int) -> int:
    return v * SS


def layer() -> Image.Image:
    return Image.new("RGBA", (px(S), px(S)), (0, 0, 0, 0))


def main() -> None:
    w = px(S)

    # Vertical gradient background.
    bg = Image.new("RGB", (1, S))
    for y in range(S):
        t = y / (S - 1)
        bg.putpixel(
            (0, y),
            tuple(round(TOP[i] + (BOTTOM[i] - TOP[i]) * t) for i in range(3)),
        )
    base = bg.resize((w, w), Image.BILINEAR).convert("RGBA")

    # The page of text behind the glass.
    card = layer()
    d = ImageDraw.Draw(card)
    d.rounded_rectangle(
        (px(170), px(240), px(660), px(610)),
        radius=px(26),
        fill=(255, 255, 255, 20),
        outline=(255, 255, 255, 52),
        width=px(3),
    )
    for i, bar_w in enumerate((370, 400, 330, 385, 300)):
        y = px(300 + i * 52)
        d.rounded_rectangle(
            (px(215), y, px(215) + px(bar_w), y + px(24)),
            radius=px(12),
            fill=(255, 255, 255, 96),
        )
    base = Image.alpha_composite(base, card)

    # Translucent glass panel with the play button.
    glass = layer()
    g = ImageDraw.Draw(glass)
    g.rounded_rectangle(
        (px(390), px(395), px(870), px(730)),
        radius=px(34),
        fill=(255, 255, 255, 33),
        outline=(255, 255, 255, 82),
        width=px(3),
    )
    g.polygon(
        [(px(602), px(508)), (px(602), px(616)), (px(694), px(562))],
        fill=(255, 255, 255, 235),
    )
    base = Image.alpha_composite(base, glass)

    # Round off the icon.
    mask = Image.new("L", (w, w), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, w - 1, w - 1), radius=px(R), fill=255)
    base.putalpha(mask)

    icon = base.resize((S, S), Image.LANCZOS)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    icon.save(OUT, "PNG", optimize=True)
    print(f"wrote {OUT.relative_to(ROOT)}  {icon.size[0]}x{icon.size[1]}")


if __name__ == "__main__":
    main()
