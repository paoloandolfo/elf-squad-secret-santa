# 🎅 Secret Santa 2026 · The Elf Squad

A hand-drawn Secret Santa app for Paolo, Francien, Andrea, Lily, Bart, Jessie, Pien, Yorda, Gigi & Keith.
Everyone picks their own bauble, sets a 4-digit PIN, writes a wishlist and, after the draw, unwraps who
they're buying for. Paolo is the head elf and runs everything from the **Elf HQ** tab.

Based on [Jelmer's Secret Santa 2026](https://github.com/jelmer408/secret-santa-2026), adapted for a group of friends:

- 10 custom Santa portraits (`public/avatars/`, made from each friend's photo)
- **Keep apart**: pairs (couples, housemates…) that can never draw each other, set in Elf HQ
- Friends-group wording instead of team/office wording

## One-time setup (about 30 minutes)

### 1. Database: Supabase (free)
1. Create a free account at supabase.com → **New project** (any name; pick an EU region).
2. Open **SQL Editor** → **New query**, paste all of `supabase/01_schema.sql`, click **Run**.
3. New query again: paste `supabase/02_seed.sql`, click **Run**. This adds the 10 friends and makes Paolo head elf.
4. Go to **Project Settings → API** (or **Connect**) and copy the **Project URL** and the **anon / publishable key**.
   The anon key is meant to be public: the database only allows the `santa_*` functions, never direct table access.

### 2. Website: GitHub Pages (free)
1. Push this folder to a new GitHub repository (public, or private on a paid plan).
2. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Repo **Settings → Secrets and variables → Actions → Variables** tab → add two *repository variables*:
   - `VITE_SUPABASE_URL` = the Project URL
   - `VITE_SUPABASE_ANON_KEY` = the anon key
4. **Actions** tab → *Deploy to GitHub Pages* → **Run workflow**. After a minute the site is live at
   `https://<your-github-name>.github.io/<repo-name>/`.

### 3. Get the party started
1. Open the site, tap **Paolo**, choose your PIN. You'll see the **Elf HQ** tab.
2. In Elf HQ: set the swap date and budget, optionally a **group code** (then share the *Copy invite link* link,
   which has the code built in), and add any **Keep apart** pairs.
3. Send the link to the group chat. Everyone taps their own Santa and picks a PIN.
4. When everyone's in, hit **🎩 Draw names**. Only people with a PIN are included. Nobody, not even the
   head elf, can see who has whom.

Forgot a PIN? Elf HQ → *reset PIN* next to the name. Want to redo? *Undo draw*, then draw again.

## Changing the Santas
The portraits are in `public/avatars/<name>.jpg` (square, about 320×320). They were made with an AI image tool
from each friend's photo, using the prompts in `tools/santa-prompts.md`. To change one, replace its file with a
new square image of the same name, then commit and push: the site redeploys by itself.

For someone new, add the image to `public/avatars/` and put `/avatars/<name>.jpg` in the *Photo URL* field
when adding them in Elf HQ.

(`tools/make_santas.py` and `tools/santas.json` can still draw cartoon Santas as SVGs, if you ever want those back.)

## Running locally
```bash
cp .env.example .env.local   # fill in the Supabase URL + key
npm install
npm run dev                  # http://localhost:2026
```
