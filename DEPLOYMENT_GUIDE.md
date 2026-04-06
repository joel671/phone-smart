# 📱 Phone Smart — Deployment Guide
## Get your game live on Vercel with a real database in ~15 minutes

---

## WHAT YOU'LL HAVE
- Real user accounts (email + password)
- Scores saved to a database in the cloud
- Global leaderboard + per-level leaderboards
- Game history per player
- Auto login (stay signed in between visits)
- Works on any device, anywhere in the world

---

## STEP 1 — Create a free Supabase database

1. Go to **https://supabase.com** and click "Start for free"
2. Sign up with GitHub or email
3. Click **"New project"**
   - Name it: `phone-smart`
   - Set a database password (save it somewhere)
   - Choose a region close to you
4. Wait ~2 minutes for it to set up
5. In the left sidebar, click **"SQL Editor"**
6. Click **"New query"**
7. Open the file `supabase_setup.sql` from this folder
8. Copy ALL the contents and paste into the SQL editor
9. Click **"Run"** — you should see "Success"

---

## STEP 2 — Get your Supabase keys

1. In Supabase, click the **gear icon ⚙️** (Project Settings) in the sidebar
2. Click **"API"**
3. You'll see two things you need:
   - **Project URL** — looks like `https://abcdefgh.supabase.co`
   - **anon public key** — a long string starting with `eyJ...`
   - **service_role key** — another long string (keep this SECRET)

---

## STEP 3 — Add your Supabase keys to the game

Open the file `public/index.html` and find these two lines near the top of the `<script>` section:

```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
```

Replace them with your actual values:

```javascript
const SUPABASE_URL = 'https://abcdefgh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGc...your actual key...';
```

---

## STEP 4 — Upload to GitHub

1. Go to **https://github.com** and sign up / sign in
2. Click **"New repository"**
   - Name: `phone-smart`
   - Set to **Public**
   - Click "Create repository"
3. Install Git if you don't have it: https://git-scm.com
4. Open a terminal / command prompt in the `phonesmart` folder and run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/phone-smart.git
git push -u origin main
```

---

## STEP 5 — Deploy to Vercel

1. Go to **https://vercel.com** and sign up with GitHub
2. Click **"Add New Project"**
3. Import your `phone-smart` GitHub repository
4. Before clicking Deploy, click **"Environment Variables"** and add:

   | Name | Value |
   |------|-------|
   | `SUPABASE_URL` | your Project URL from Step 2 |
   | `SUPABASE_SERVICE_KEY` | your service_role key from Step 2 |

5. Click **"Deploy"**
6. Wait ~1 minute — you'll get a URL like `https://phone-smart-xyz.vercel.app`

**That's it — your game is live! 🎉**

---

## STEP 6 — Configure Supabase Auth (important!)

1. Back in Supabase, go to **Authentication → URL Configuration**
2. Set **Site URL** to your Vercel URL: `https://phone-smart-xyz.vercel.app`
3. Add to **Redirect URLs**: `https://phone-smart-xyz.vercel.app`
4. Click Save

---

## TROUBLESHOOTING

**"Invalid API key" error**
→ Double-check your SUPABASE_URL and SUPABASE_ANON_KEY in index.html

**Scores not saving**
→ Check Environment Variables in Vercel have SUPABASE_URL and SUPABASE_SERVICE_KEY

**Can't register**
→ Make sure you ran the SQL in Step 1. Check Supabase Table Editor — you should see tables: profiles, scores, stats

**"Email not confirmed" error**
→ In Supabase go to Authentication → Email Templates and disable "Confirm email" for development, OR check your email for confirmation link

---

## FOLDER STRUCTURE

```
phonesmart/
├── public/
│   └── index.html        ← The game (edit SUPABASE keys here)
├── api/
│   ├── save-score.js     ← Saves scores to database
│   ├── leaderboard.js    ← Fetches leaderboard + stats
│   └── create-profile.js ← Creates user profile on register
├── supabase_setup.sql    ← Run this in Supabase SQL Editor
├── package.json
├── vercel.json
└── DEPLOYMENT_GUIDE.md   ← You are here
```

---

## CUSTOM DOMAIN (optional)

Once deployed on Vercel:
1. Go to your project → Settings → Domains
2. Add your domain (e.g. `phonesmart.com`)
3. Update the DNS records at your domain registrar
4. Update the Site URL in Supabase Auth to your custom domain

---

## NEED HELP?

- Vercel docs: https://vercel.com/docs
- Supabase docs: https://supabase.com/docs
- Vercel + Supabase guide: https://supabase.com/partners/integrations/vercel
