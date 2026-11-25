"""Draws one hand-drawn-style Santa SVG per entry in tools/santas.json into public/avatars/."""
import json, math, random, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
INK = '#2b2733'
HATS = {'red': ('#cf4b3f', '#a3352d'), 'green': ('#2f6e50', '#245740'), 'blue': ('#3f6fb5', '#2f568f'),
        'purple': ('#7b4fa3', '#5f3c80'), 'gold': ('#e2a72e', '#b8841c'), 'pink': ('#e0708a', '#bf5670'),
        'teal': ('#2a8c8c', '#1f6c6c')}
SKIN = {'light': '#f6d7bd', 'tan': '#e8b98f', 'medium': '#c98f62', 'brown': '#9a6440', 'deep': '#6e4529'}
W = 'stroke="%s" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"' % INK


def wobble(points, rnd, amt=1.6):
    return [(x + rnd.uniform(-amt, amt), y + rnd.uniform(-amt, amt)) for x, y in points]


def blob(cx, cy, rx, ry, rnd, n=14, amt=0.05):
    pts = []
    for i in range(n):
        a = 2 * math.pi * i / n
        k = 1 + rnd.uniform(-amt, amt)
        pts.append((cx + math.cos(a) * rx * k, cy + math.sin(a) * ry * k))
    return smooth(pts)


def smooth(pts):
    """Closed Catmull-Rom → cubic Bézier path."""
    n = len(pts)
    d = 'M%.1f %.1f' % pts[0]
    for i in range(n):
        p0, p1, p2, p3 = pts[i - 1], pts[i], pts[(i + 1) % n], pts[(i + 2) % n]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += ' C%.1f %.1f %.1f %.1f %.1f %.1f' % (*c1, *c2, *p2)
    return d + 'Z'


def puff_cloud(cx, cy, w, h, rnd, bumps):
    """A scalloped white shape (beard / fur) made of overlapping circles, outlined."""
    circles = []
    for i in range(bumps):
        t = i / (bumps - 1) if bumps > 1 else .5
        x = cx - w / 2 + t * w
        y = cy + math.sin(t * math.pi) * h
        r = 11 + math.sin(t * math.pi) * 6 + rnd.uniform(-1.5, 1.5)
        circles.append((x, y, r))
    outline = ''.join('<circle cx="%.1f" cy="%.1f" r="%.1f" fill="#fff" %s/>' % (x, y, r + 0.1, W) for x, y, r in circles)
    fill = ''.join('<circle cx="%.1f" cy="%.1f" r="%.1f" fill="#fff"/>' % (x, y, r - 1.8) for x, y, r in circles)
    return outline + fill


def santa(name, o):
    rnd = random.Random(name)
    hat, hat_dark = HATS[o['hat']]
    skin = SKIN[o['skin']]
    tilt = o.get('tilt', 1)
    out = []
    add = out.append
    add('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="400" height="400">')
    add('<rect width="200" height="200" fill="%s"/>' % o['bg'])
    # snow dots
    for _ in range(14):
        add('<circle cx="%.0f" cy="%.0f" r="%.1f" fill="#fff" opacity=".75"/>' % (rnd.uniform(5, 195), rnd.uniform(5, 120), rnd.uniform(1.4, 3)))

    # coat / shoulders
    add('<path d="%s" fill="%s" %s/>' % (smooth(wobble([(18, 205), (30, 168), (62, 150), (100, 146), (138, 150), (170, 168), (182, 205)], rnd, 1.2)), hat, W))
    add('<path d="M100 150 L100 205" %s fill="none"/>' % W)
    add('<path d="M84 152 Q100 166 116 152" fill="#fff" %s/>' % W)

    # scarf
    if o['extra'] == 'scarf':
        add('<path d="M58 146 Q100 168 142 146 L144 160 Q100 182 56 160Z" fill="#2f6e50" %s/>' % W)
        for x in (70, 86, 102, 118, 134):
            add('<path d="M%d 152 L%d 172" stroke="#fff" stroke-width="5" stroke-linecap="round"/>' % (x, x - 2))
        add('<path d="M124 164 L132 196 L146 192 L136 160Z" fill="#2f6e50" %s/>' % W)

    # face
    add('<path d="%s" fill="%s" %s/>' % (blob(100, 108, 37, 39, rnd), skin, W))
    # ears
    add('<ellipse cx="63" cy="110" rx="6" ry="9" fill="%s" %s/>' % (skin, W))
    add('<ellipse cx="137" cy="110" rx="6" ry="9" fill="%s" %s/>' % (skin, W))
    add('<path d="%s" fill="%s"/>' % (blob(100, 108, 35, 37, rnd, amt=0), skin))  # cover ear joins

    # beard
    b = o['beard']
    if b == 'fluffy':
        add(puff_cloud(100, 122, 70, 26, rnd, 7))
    elif b == 'curly':
        add(puff_cloud(100, 126, 60, 20, rnd, 6))
        for x, y in ((82, 140), (100, 146), (118, 140)):
            add('<path d="M%d %d q4 -5 8 0 q-4 5 -8 0" fill="none" stroke="#c9c3cf" stroke-width="2"/>' % (x - 4, y))
    elif b == 'short':
        add('<path d="M70 118 Q72 150 100 152 Q128 150 130 118 Q116 130 100 130 Q84 130 70 118Z" fill="#fff" %s/>' % W)

    # cheeks
    add('<circle cx="78" cy="117" r="7" fill="#e8798a" opacity=".55"/>')
    add('<circle cx="122" cy="117" r="7" fill="#e8798a" opacity=".55"/>')

    # mustache (bearded ones) or smile
    if b != 'none':
        add('<path d="M100 122 Q88 114 78 122 Q86 130 100 125 Q114 130 122 122 Q112 114 100 122Z" fill="#fff" %s/>' % W)
        add('<path d="M93 133 Q100 138 107 133" fill="none" %s/>' % W)
    else:
        add('<path d="M86 124 Q100 138 114 124" fill="#fff" %s/>' % W)

    # nose
    add('<circle cx="100" cy="112" r="6.5" fill="#e8798a" %s/>' % W)

    # eyes
    e = o['eyes']
    def dot(x): add('<circle cx="%d" cy="99" r="3.6" fill="%s"/>' % (x, INK))
    def arc(x): add('<path d="M%d 101 Q%d 93 %d 101" fill="none" %s/>' % (x - 6, x, x + 6, W))
    if e == 'dots': dot(86); dot(114)
    elif e == 'happy': arc(86); arc(114)
    elif e == 'wink': dot(86); arc(114)
    elif e == 'sparkle':
        for x in (86, 114):
            add('<circle cx="%d" cy="99" r="4.4" fill="%s"/><circle cx="%d" cy="97.6" r="1.5" fill="#fff"/>' % (x, INK, x + 1.4))
    # brows
    add('<path d="M79 89 Q86 85 92 88" fill="none" stroke="%s" stroke-width="2.4" stroke-linecap="round"/>' % INK)
    add('<path d="M108 88 Q114 85 121 89" fill="none" stroke="%s" stroke-width="2.4" stroke-linecap="round"/>' % INK)

    x = o['extra']
    if x == 'glasses':
        add('<circle cx="86" cy="99" r="10" fill="none" %s/><circle cx="114" cy="99" r="10" fill="none" %s/>' % (W, W))
        add('<path d="M96 99 Q100 95 104 99" fill="none" %s/>' % W)
    if x == 'sunglasses':
        add('<path d="M73 93 L97 93 Q97 108 85 107 Q73 106 73 93Z" fill="%s" %s/>' % (INK, W))
        add('<path d="M103 93 L127 93 Q127 106 115 107 Q103 108 103 93Z" fill="%s" %s/>' % (INK, W))
        add('<path d="M97 95 L103 95" %s/>' % W)
        add('<path d="M78 96 L84 96" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".7"/>')

    # hat: floppy cone drawn leaning right, mirrored for tilt -1
    tip = (158, 64)
    flip = ' transform="translate(200 0) scale(-1 1)"' if tilt < 0 else ''
    add('<g%s>' % flip)
    add('<path d="M62 72 Q66 24 104 16 Q140 14 %.0f %.0f Q134 44 138 72Z" fill="%s" %s/>' % (tip[0], tip[1] - 6, hat, W))
    add('<path d="M76 54 Q90 32 110 27" fill="none" stroke="%s" stroke-width="5" stroke-linecap="round" opacity=".45"/>' % hat_dark)
    add(puff_cloud(100, 70, 84, 0, rnd, 8))
    add('<path d="%s" fill="#fff" %s/>' % (blob(tip[0], tip[1], 11, 11, rnd, n=10, amt=.12), W))
    add('</g>')
    tip = (tip[0] if tilt > 0 else 200 - tip[0], tip[1])
    s = 1 if tilt > 0 else -1

    if x == 'earmuffs':
        add('<path d="M62 96 Q62 46 100 44 Q138 46 138 96" fill="none" stroke="%s" stroke-width="6" stroke-linecap="round"/>' % INK)
        for cx in (60, 140):
            add('<path d="%s" fill="#f2a1b3" %s/>' % (blob(cx, 106, 13, 15, rnd, n=10, amt=.14), W))
    if x == 'headphones':
        add('<path d="M60 102 Q58 40 100 40 Q142 40 140 102" fill="none" stroke="%s" stroke-width="7" stroke-linecap="round"/>' % INK)
        for cx in (58, 142):
            add('<rect x="%d" y="94" width="18" height="26" rx="7" fill="#e9b347" %s/>' % (cx - 9, W))
        # music notes
        add('<path d="M160 40 L160 22 L172 19 L172 36" fill="none" %s/><circle cx="157" cy="41" r="4" fill="%s"/><circle cx="169" cy="37" r="4" fill="%s"/>' % (W, INK, INK))
    if x == 'holly':
        hx = 78
        add('<path d="M%d 68 q-14 -8 -22 2 q10 2 8 10 q8 -6 14 -12Z" fill="#2f6e50" %s/>' % (hx, W))
        add('<path d="M%d 68 q10 -14 22 -8 q-8 6 -4 12 q-10 -6 -18 -4Z" fill="#2f6e50" %s/>' % (hx, W))
        for dx, dy in ((0, 0), (6, 4), (-5, 5)):
            add('<circle cx="%d" cy="%d" r="4.6" fill="#cf4b3f" %s/>' % (hx + dx, 66 + dy, W))
    if x == 'star':
        cx, cy = 100, 42
        pts = []
        for i in range(10):
            r = 13 if i % 2 == 0 else 6
            a = -math.pi / 2 + i * math.pi / 5
            pts.append('%.1f,%.1f' % (cx + math.cos(a) * r, cy + math.sin(a) * r))
        add('<polygon points="%s" fill="#f6d98c" %s/>' % (' '.join(pts), W))
    if x == 'bells':
        for bx, by in ((tip[0] - 4 * s, tip[1] + 16), ):
            add('<path d="M%d %d q0 -12 9 -12 q9 0 9 12 l3 4 h-24z" fill="#e9b347" %s/><circle cx="%d" cy="%d" r="2.5" fill="%s"/>' % (bx - 9, by, W, bx, by + 6, INK))
        add('<path d="M150 116 l4 -8 4 8 -4 8z M30 60 l3 -6 3 6 -3 6z" fill="#fff" %s/>' % W)
    if x == 'flower':
        cx, cy = 122, 64
        for i in range(5):
            a = i * 2 * math.pi / 5
            add('<circle cx="%.1f" cy="%.1f" r="6" fill="#f6d98c" %s/>' % (cx + math.cos(a) * 7, cy + math.sin(a) * 7, W))
        add('<circle cx="%d" cy="%d" r="5" fill="#e0708a" %s/>' % (cx, cy, W))

    add('</svg>')
    return '\n'.join(out)


def main():
    data = json.loads((ROOT / 'tools' / 'santas.json').read_text())
    out = ROOT / 'public' / 'avatars'
    out.mkdir(parents=True, exist_ok=True)
    for name, opts in data.items():
        if name.startswith('_'):
            continue
        (out / f'{name}.svg').write_text(santa(name, opts))
        print('drew', name)


if __name__ == '__main__':
    main()
