"""Draws one hand-drawn-style Santa SVG per entry in tools/santas.json into public/avatars/.

Run:  python3 tools/make_santas.py
"""
import json, math, random, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
INK = '#2b2733'
HATS = {'red': ('#cf4b3f', '#a3352d'), 'green': ('#2f6e50', '#245740'), 'blue': ('#3f6fb5', '#2f568f'),
        'purple': ('#7b4fa3', '#5f3c80'), 'gold': ('#e2a72e', '#b8841c'), 'pink': ('#e0708a', '#bf5670'),
        'teal': ('#2a8c8c', '#1f6c6c')}
SKIN = {'light': '#f6d7bd', 'tan': '#e8b98f', 'medium': '#c98f62', 'brown': '#9a6440', 'deep': '#6e4529'}
HAIR = {'blonde': ('#e6c27a', '#c79e52'), 'dirty-blonde': ('#c9a46a', '#a5814b'), 'light-brown': ('#a9774a', '#86592f'),
        'auburn': ('#a8643a', '#844a27'), 'brown': ('#6e4a2e', '#51341f'), 'dark': ('#3a2a24', '#241a16'),
        'white': ('#ffffff', '#d9d4dc')}
W = 'stroke="%s" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"' % INK
THIN = 'stroke="%s" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"' % INK


def wobble(points, rnd, amt=1.6):
    return [(x + rnd.uniform(-amt, amt), y + rnd.uniform(-amt, amt)) for x, y in points]


def smooth(pts, closed=True):
    """Catmull-Rom → cubic Bézier path."""
    n = len(pts)
    d = 'M%.1f %.1f' % pts[0]
    rng = range(n) if closed else range(n - 1)
    for i in rng:
        p0, p1, p2, p3 = pts[i - 1] if (closed or i > 0) else pts[0], pts[i], pts[(i + 1) % n], pts[(i + 2) % n] if (closed or i + 2 < n) else pts[-1]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += ' C%.1f %.1f %.1f %.1f %.1f %.1f' % (*c1, *c2, *p2)
    return d + ('Z' if closed else '')


def blob(cx, cy, rx, ry, rnd, n=14, amt=0.05):
    pts = []
    for i in range(n):
        a = 2 * math.pi * i / n
        k = 1 + rnd.uniform(-amt, amt)
        pts.append((cx + math.cos(a) * rx * k, cy + math.sin(a) * ry * k))
    return smooth(pts)


def puff_cloud(cx, cy, w, h, rnd, bumps, fill='#fff'):
    """A scalloped shape (beard / fur) made of overlapping circles, outlined."""
    circles = []
    for i in range(bumps):
        t = i / (bumps - 1) if bumps > 1 else .5
        x = cx - w / 2 + t * w
        y = cy + math.sin(t * math.pi) * h
        r = 11 + math.sin(t * math.pi) * 6 + rnd.uniform(-1.5, 1.5)
        circles.append((x, y, r))
    outline = ''.join('<circle cx="%.1f" cy="%.1f" r="%.1f" fill="%s" %s/>' % (x, y, r + 0.1, fill, W) for x, y, r in circles)
    inner = ''.join('<circle cx="%.1f" cy="%.1f" r="%.1f" fill="%s"/>' % (x, y, r - 1.8, fill) for x, y, r in circles)
    return outline + inner


def hair_side(side, length, wave, rnd):
    """One full lock of hair from the temple down past the shoulder. side = -1 (left) or 1 (right)."""
    top, bottom = 70, {'long': 190, 'shoulder': 158}[length]
    outer, inner = [], []
    steps = 12
    for i in range(steps + 1):
        t = i / steps
        y = top + t * (bottom - top)
        bulge = min(1, t / .3) * (1 - .25 * max(0, t - .7) / .3)
        w = math.sin(t * math.pi * 3) * wave * min(1, t * 3)
        outer.append((100 + side * (34 + 24 * bulge + w), y))
        inner.append((100 + side * (26 + (10 * (t - .6) / .4 if t > .6 else 0) + w * .5), y))
    pts = wobble(outer, rnd, .7) + list(reversed(wobble(inner, rnd, .5)))
    return smooth(pts)


def plaid(pid):
    return ('<defs><pattern id="%s" width="22" height="22" patternUnits="userSpaceOnUse">'
            '<rect width="22" height="22" fill="#8a6a4f"/>'
            '<rect width="11" height="22" fill="#2e2520" opacity=".55"/>'
            '<rect width="22" height="11" fill="#2e2520" opacity=".55"/>'
            '</pattern></defs>') % pid


def santa(name, o):
    rnd = random.Random(name)
    hat, hat_dark = HATS[o['hat']]
    skin = SKIN[o['skin']]
    tilt = o.get('tilt', 1)
    extras = o.get('extra', [])
    extras = [extras] if isinstance(extras, str) else extras
    hair = o.get('hair')            # e.g. {"style": "long", "color": "auburn", "wave": 4}
    hc, hc_dark = HAIR[(hair or {}).get('color', 'brown')]
    beard = o.get('beard', 'none')
    beard_color = HAIR[o.get('beard_color', 'white')][0]
    coat = o.get('coat', hat)
    out = []
    add = out.append
    add('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="400" height="400">')
    if coat == 'plaid':
        add(plaid('plaid-' + name))
    add('<rect width="200" height="200" fill="%s"/>' % o['bg'])
    for _ in range(14):
        add('<circle cx="%.0f" cy="%.0f" r="%.1f" fill="#fff" opacity=".75"/>' % (rnd.uniform(5, 195), rnd.uniform(5, 120), rnd.uniform(1.4, 3)))

    # coat / shoulders
    coat_fill = 'url(#plaid-%s)' % name if coat == 'plaid' else coat
    add('<path d="%s" fill="%s" %s/>' % (smooth(wobble([(18, 205), (30, 168), (62, 150), (100, 146), (138, 150), (170, 168), (182, 205)], rnd, 1.2)), coat_fill, W))
    if coat == 'plaid':
        add('<path d="M100 150 L100 205" %s fill="none"/>' % W)
        for y in (166, 182, 198):
            add('<circle cx="104" cy="%d" r="2.2" fill="%s"/>' % (y, INK))
        add('<path d="M84 150 L100 166 L92 172Z M116 150 L100 166 L108 172Z" fill="#6a5240" %s/>' % THIN)
    else:
        add('<path d="M100 150 L100 205" %s fill="none"/>' % W)
        add('<path d="M84 152 Q100 166 116 152" fill="#fff" %s/>' % W)
    if 'necklace' in extras:
        add('<path d="M84 152 Q100 172 116 152" fill="none" stroke="#e9b347" stroke-width="2"/>')
        add('<circle cx="100" cy="164" r="2.6" fill="#e9b347" stroke="%s" stroke-width="1.2"/>' % INK)
    if 'scarf' in extras:
        add('<path d="M58 146 Q100 168 142 146 L144 160 Q100 182 56 160Z" fill="#2f6e50" %s/>' % W)
        for x in (70, 86, 102, 118, 134):
            add('<path d="M%d 152 L%d 172" stroke="#fff" stroke-width="5" stroke-linecap="round"/>' % (x, x - 2))
        add('<path d="M124 164 L132 196 L146 192 L136 160Z" fill="#2f6e50" %s/>' % W)

    # long hair falls behind the face and over the shoulders
    if hair and hair['style'] in ('long', 'shoulder'):
        for side in (-1, 1):
            add('<path d="%s" fill="%s" %s/>' % (hair_side(side, hair['style'], hair.get('wave', 3), rnd), hc, W))
            for k in (0, 1):
                x0 = 100 + side * (44 + k * 8)
                add('<path d="M%d %d Q%d %d %d %d" fill="none" stroke="%s" stroke-width="2.2" stroke-linecap="round" opacity=".7"/>' % (
                    x0, 96 + k * 14, x0 + side * 6, 130 + k * 10, x0 - side * 2, 160 + k * 8 if hair['style'] == 'long' else 140, hc_dark))
    if hair and hair['style'] == 'ponytail':
        add('<path d="M132 84 Q156 92 150 128 Q146 140 140 132 Q146 110 128 96Z" fill="%s" %s/>' % (hc, W))

    # face + ears
    add('<path d="%s" fill="%s" %s/>' % (blob(100, 108, 37, 39, rnd), skin, W))
    add('<ellipse cx="63" cy="110" rx="6" ry="9" fill="%s" %s/>' % (skin, W))
    add('<ellipse cx="137" cy="110" rx="6" ry="9" fill="%s" %s/>' % (skin, W))
    add('<path d="%s" fill="%s"/>' % (blob(100, 108, 35, 37, rnd, amt=0), skin))
    if 'hoops' in extras:
        for x in (62, 138):
            add('<circle cx="%d" cy="123" r="4.2" fill="none" stroke="#e9b347" stroke-width="2.4"/>' % x)

    # beard
    if beard == 'fluffy':
        add(puff_cloud(100, 122, 70, 26, rnd, 7, beard_color))
    elif beard == 'curly':
        add(puff_cloud(100, 126, 60, 20, rnd, 6, beard_color))
    elif beard == 'short':
        add('<path d="M66 112 Q68 152 100 154 Q132 152 134 112 Q122 130 100 130 Q78 130 66 112Z" fill="%s" %s/>' % (beard_color, W))
    elif beard == 'stubble':
        for _ in range(46):
            a = rnd.uniform(.15, .85) * math.pi
            r = rnd.uniform(.72, .95)
            add('<circle cx="%.1f" cy="%.1f" r="1" fill="%s" opacity=".7"/>' % (100 + math.cos(a) * 34 * r, 108 + math.sin(a) * 37 * r, hc_dark))

    # cheeks + freckles
    add('<circle cx="78" cy="117" r="7" fill="#e8798a" opacity=".55"/>')
    add('<circle cx="122" cy="117" r="7" fill="#e8798a" opacity=".55"/>')
    if 'freckles' in extras:
        for x, y in ((76, 110), (81, 113), (73, 115), (124, 110), (119, 113), (127, 115), (94, 106), (106, 106)):
            add('<circle cx="%d" cy="%d" r="1.3" fill="#a8643a" opacity=".8"/>' % (x, y))

    # mouth / mustache
    mouth = o.get('mouth', 'smile')
    if beard in ('fluffy', 'curly', 'short'):
        add('<path d="M100 122 Q88 114 78 122 Q86 130 100 125 Q114 130 122 122 Q112 114 100 122Z" fill="%s" %s/>' % (beard_color, W))
        if mouth == 'pout':
            add('<ellipse cx="100" cy="134" rx="5" ry="4" fill="#c4626e" %s/>' % THIN)
        else:
            add('<path d="M93 133 Q100 138 107 133" fill="none" %s/>' % W)
    else:
        if beard == 'stubble':
            add('<path d="M88 121 Q100 116 112 121" fill="none" stroke="%s" stroke-width="3" stroke-linecap="round"/>' % hc_dark)
        if mouth == 'smirk':
            add('<path d="M88 126 Q102 134 114 122" fill="none" %s/>' % W)
        elif mouth == 'grin':
            add('<path d="M84 124 Q100 142 116 124 Z" fill="#fff" %s/>' % W)
            add('<path d="M88 127 L112 127" stroke="%s" stroke-width="1.4" opacity=".5"/>' % INK)
        else:
            add('<path d="M86 124 Q100 138 114 124" fill="#fff" %s/>' % W)

    # nose (+ ring)
    add('<circle cx="100" cy="112" r="6.5" fill="#e8798a" %s/>' % W)
    if 'nose-ring' in extras:
        add('<path d="M104.5 116 a3 3 0 1 0 4 -2.5" fill="none" stroke="#c9c3cf" stroke-width="2" stroke-linecap="round"/>')

    # eyes
    e = o['eyes']
    def dot(x): add('<circle cx="%d" cy="99" r="3.6" fill="%s"/>' % (x, INK))
    def arc(x): add('<path d="M%d 101 Q%d 93 %d 101" fill="none" %s/>' % (x - 6, x, x + 6, W))
    if e == 'dots': dot(86); dot(114)
    elif e == 'happy': arc(86); arc(114)
    elif e == 'wink': dot(86); arc(114)
    elif e == 'wide':
        for x in (86, 114):
            add('<circle cx="%d" cy="99" r="5.5" fill="#fff" %s/><circle cx="%d" cy="99.5" r="2.6" fill="%s"/>' % (x, THIN, x, INK))
    elif e == 'sparkle':
        for x in (86, 114):
            add('<circle cx="%d" cy="99" r="4.4" fill="%s"/><circle cx="%d" cy="97.6" r="1.5" fill="#fff"/>' % (x, INK, x + 1.4))
    brow = hc_dark if hair else INK
    add('<path d="M79 89 Q86 85 92 88" fill="none" stroke="%s" stroke-width="2.6" stroke-linecap="round"/>' % brow)
    add('<path d="M108 88 Q114 85 121 89" fill="none" stroke="%s" stroke-width="2.6" stroke-linecap="round"/>' % brow)

    if 'glasses' in extras:
        add('<circle cx="86" cy="99" r="10" fill="none" %s/><circle cx="114" cy="99" r="10" fill="none" %s/>' % (W, W))
        add('<path d="M96 99 Q100 95 104 99" fill="none" %s/>' % W)
    if 'sunglasses' in extras:
        add('<path d="M73 93 L97 93 Q97 108 85 107 Q73 106 73 93Z" fill="%s" %s/>' % (INK, W))
        add('<path d="M103 93 L127 93 Q127 106 115 107 Q103 108 103 93Z" fill="%s" %s/>' % (INK, W))
        add('<path d="M97 95 L103 95" %s/>' % W)
        add('<path d="M78 96 L84 96" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".7"/>')

    # hair framing the face (in front of the ears), under the hat
    if hair:
        st = hair['style']
        if st in ('long', 'shoulder'):
            if hair.get('part'):
                add('<path d="M88 76 Q100 80 112 76 L110 86 Q100 82 90 86Z" fill="%s" %s/>' % (hc, THIN))
        elif st in ('short', 'ponytail'):
            for side in (-1, 1):
                x0 = 100 + side * 37
                add('<path d="M%d 72 Q%d 82 %d 100 Q%d 92 %d 84 Q%d 76 %d 72Z" fill="%s" %s/>' % (
                    x0, x0 + side * 2, x0 - side * 2, x0 - side * 7, x0 - side * 8, x0 - side * 10, x0 - side * 12, hc, W))

    # hat
    style = o.get('hat_style', 'santa')
    tip = (158, 64)
    if style == 'cap':
        # a baseball cap, Santa edition: red crown, white trim, pom-pom on top
        add('<path d="M62 80 Q60 32 100 28 Q140 32 140 80Z" fill="%s" %s/>' % (hat, W))
        add('<path d="M80 40 Q96 30 112 32" fill="none" stroke="%s" stroke-width="5" stroke-linecap="round" opacity=".45"/>' % hat_dark)
        add('<path d="M56 78 Q60 72 100 70 Q132 70 162 84 Q160 96 130 92 Q100 86 70 88 Q56 88 56 78Z" fill="%s" %s/>' % (hat_dark, W))
        add('<path d="M62 76 Q100 66 140 76" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/>')
        add('<path d="%s" fill="#fff" %s/>' % (blob(100, 27, 10, 10, rnd, n=10, amt=.12), W))
        tip = (100, 27)
    else:
        flip = ' transform="translate(200 0) scale(-1 1)"' if tilt < 0 else ''
        add('<g%s>' % flip)
        add('<path d="M62 72 Q66 24 104 16 Q140 14 %.0f %.0f Q134 44 138 72Z" fill="%s" %s/>' % (tip[0], tip[1] - 6, hat, W))
        add('<path d="M76 54 Q90 32 110 27" fill="none" stroke="%s" stroke-width="5" stroke-linecap="round" opacity=".45"/>' % hat_dark)
        add(puff_cloud(100, 70, 84, 0, rnd, 8))
        add('<path d="%s" fill="#fff" %s/>' % (blob(tip[0], tip[1], 11, 11, rnd, n=10, amt=.12), W))
        add('</g>')
        tip = (tip[0] if tilt > 0 else 200 - tip[0], tip[1])
    s = 1 if tilt > 0 else -1

    if 'headband' in extras:
        add('<path d="M62 84 Q100 74 138 84 L137 92 Q100 82 63 92Z" fill="#e0708a" %s/>' % THIN)
    if 'earmuffs' in extras:
        add('<path d="M62 96 Q62 46 100 44 Q138 46 138 96" fill="none" stroke="%s" stroke-width="6" stroke-linecap="round"/>' % INK)
        for cx in (60, 140):
            add('<path d="%s" fill="#f2a1b3" %s/>' % (blob(cx, 106, 13, 15, rnd, n=10, amt=.14), W))
    if 'headphones' in extras:
        add('<path d="M60 102 Q58 40 100 40 Q142 40 140 102" fill="none" stroke="%s" stroke-width="7" stroke-linecap="round"/>' % INK)
        for cx in (58, 142):
            add('<rect x="%d" y="94" width="18" height="26" rx="7" fill="#e9b347" %s/>' % (cx - 9, W))
        add('<path d="M160 40 L160 22 L172 19 L172 36" fill="none" %s/><circle cx="157" cy="41" r="4" fill="%s"/><circle cx="169" cy="37" r="4" fill="%s"/>' % (W, INK, INK))
    if 'holly' in extras:
        hx = 78
        add('<path d="M%d 68 q-14 -8 -22 2 q10 2 8 10 q8 -6 14 -12Z" fill="#2f6e50" %s/>' % (hx, W))
        add('<path d="M%d 68 q10 -14 22 -8 q-8 6 -4 12 q-10 -6 -18 -4Z" fill="#2f6e50" %s/>' % (hx, W))
        for dx, dy in ((0, 0), (6, 4), (-5, 5)):
            add('<circle cx="%d" cy="%d" r="4.6" fill="#cf4b3f" %s/>' % (hx + dx, 66 + dy, W))
    if 'star' in extras:
        cx, cy = 100, 42
        pts = []
        for i in range(10):
            r = 13 if i % 2 == 0 else 6
            a = -math.pi / 2 + i * math.pi / 5
            pts.append('%.1f,%.1f' % (cx + math.cos(a) * r, cy + math.sin(a) * r))
        add('<polygon points="%s" fill="#f6d98c" %s/>' % (' '.join(pts), W))
    if 'bells' in extras:
        bx, by = tip[0] - 4 * s, tip[1] + 16
        add('<path d="M%d %d q0 -12 9 -12 q9 0 9 12 l3 4 h-24z" fill="#e9b347" %s/><circle cx="%d" cy="%d" r="2.5" fill="%s"/>' % (bx - 9, by, W, bx, by + 6, INK))
    if 'flower' in extras:
        cx, cy = 122, 64
        for i in range(5):
            a = i * 2 * math.pi / 5
            add('<circle cx="%.1f" cy="%.1f" r="6" fill="#f6d98c" %s/>' % (cx + math.cos(a) * 7, cy + math.sin(a) * 7, W))
        add('<circle cx="%d" cy="%d" r="5" fill="#e0708a" %s/>' % (cx, cy, W))
    if 'sparkles' in extras:
        add('<path d="M164 112 l4 -9 4 9 -4 9z M30 66 l3 -7 3 7 -3 7z" fill="#fff" %s/>' % THIN)

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
