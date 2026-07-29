# Deploy Guide — Static Site on Render

This is a **plain static HTML/CSS/JS site** — no build step, no npm, no
Node.js required. It's served by a pinned, non-root **nginx** container.

You can deploy in under 5 minutes using either **Render's Docker web
service** (recommended, uses the included `Dockerfile` + `render.yaml`) or
Render's native **Static Site** hosting (even simpler, since no build is
needed).

---

## Option A — Render Static Site (fastest, no Docker needed)

1. Push this repo to GitHub/GitLab.
2. Go to https://dashboard.render.com/ → **New** → **Static Site**.
3. Connect your repo.
4. Settings:
   - **Build Command:** *(leave empty — nothing to build)*
   - **Publish Directory:** `.`
5. Click **Create Static Site**. Done — live URL in ~1 minute.

---

## Option B — Render Docker Web Service (uses Dockerfile + health checks)

### 1. Push code to GitHub

```bash
git add .
git commit -m "Add production Docker deployment config"
git push origin main
```

### 2. Create the Render service from the blueprint

```bash
# In Render Dashboard:
# New -> Blueprint -> select this repo -> Render auto-detects render.yaml
```

Or manually via CLI-less UI:
- **New** → **Web Service**
- Connect repo
- **Runtime:** Docker
- **Dockerfile Path:** `./Dockerfile`
- **Health Check Path:** `/healthz`
- Click **Create Web Service**

### 3. (Optional) Enable auto-deploy from GitHub Actions

Add a repo secret so CI can trigger redeploys automatically:

```bash
# In Render dashboard: service -> Settings -> Deploy Hook -> copy URL
# In GitHub: repo -> Settings -> Secrets and variables -> Actions -> New secret
#   Name:  RENDER_DEPLOY_HOOK_URL
#   Value: <paste the Render deploy hook URL>
```

Every push to `main` will now: lint → build Docker image → health-check it →
trigger Render deploy.

---

## Local Testing (before deploying)

```bash
docker compose up --build
```

Then open http://localhost:8080 and http://localhost:8080/healthz — you
should see the site and an `ok` health response.

```bash
docker compose down
```

---

## Files Overview

| File | Purpose |
|---|---|
| `Dockerfile` | Builds a minimal, non-root nginx image serving static files |
| `nginx.conf` | Security headers, gzip, health endpoint, pretty URLs |
| `docker-compose.yml` | Local dev/test runner with health checks |
| `render.yaml` | Render Blueprint for one-click Docker deploy |
| `.github/workflows/deploy.yml` | CI: lint → build → health-test → deploy |
| `.env.example` | Documents optional local env vars |

No database, cache, or backend services are required — this site has zero
runtime dependencies beyond nginx.