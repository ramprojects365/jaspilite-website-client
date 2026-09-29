# Railway Deployment Guide for Jaspilite E-Commerce Stack

This guide provides step-by-step instructions to deploy the entire Jaspilite production stack (MySQL Database, Node.js/Express Backend API, and Angular Client) to [Railway](https://railway.app).

---

## 1. Architecture Overview

```
                      ┌──────────────────────┐
                      │    Client Browser    │
                      └──────────┬───────────┘
                                 │
                   HTTPS requests│
                                 ▼
               ┌───────────────────────────────────┐
               │    Railway Service: Frontend      │
               │    (NGINX Alpine + Angular SPA)   │
               │    Port: ${PORT}                  │
               └─────────────────┬─────────────────┘
                                 │ Proxy /api/*
                                 ▼
               ┌───────────────────────────────────┐
               │    Railway Service: Backend       │
               │    (Node.js / Express API)        │
               │    Port: ${PORT}                  │
               └─────────────────┬─────────────────┘
                                 │ MySQL Connection
                                 ▼
               ┌───────────────────────────────────┐
               │    Railway Plugin: MySQL DB       │
               │    Database: jaspilite            │
               └───────────────────────────────────┘
```

---

## 2. Step 1: Provision MySQL Database on Railway

1. Log into your [Railway Dashboard](https://railway.app/dashboard).
2. Click **"+ New"** -> **"Database"** -> **"Add MySQL"**.
3. Under the **Connect** tab in Railway, note your connection credentials:
   - `MYSQLHOST`
   - `MYSQLPORT`
   - `MYSQLUSER`
   - `MYSQLPASSWORD`
   - `MYSQLDATABASE` (default is `railway` or you can name it `jaspilite`)
4. **Import Database Schema & Data**:
   From your local terminal, import the `jaspilite-db` SQL dump into Railway MySQL:
   ```bash
   mysql -h <MYSQLHOST> -P <MYSQLPORT> -u <MYSQLUSER> -p<MYSQLPASSWORD> <MYSQLDATABASE> < jaspilite-db
   ```
   *Tip: You can also use Railway CLI: `railway run "mysql -u root -p database < jaspilite-db"`.*

---

## 3. Step 2: Deploy Backend Server (`jaspilite-website-server`)

1. In your Railway project, click **"+ New"** -> **"GitHub Repo"** -> select your `jaspilite-website-server` repository (branch: `release/jaspilite`).
2. Go to **Settings** -> set **Root Directory** to `/` (or `jaspilite-website-server` if monorepo).
3. The server includes a production `Dockerfile` and `railway.json`. Railway will automatically build via Dockerfile.
4. Go to **Variables** tab in Railway and add:
   | Variable | Value / Reference |
   |---|---|
   | `PORT` | `3000` (or Railway dynamic `$PORT`) |
   | `DB_HOST` | `${{MySQL.MYSQLHOST}}` |
   | `DB_PORT` | `${{MySQL.MYSQLPORT}}` |
   | `DB_USER` | `${{MySQL.MYSQLUSER}}` |
   | `DB_PASSWORD` | `${{MySQL.MYSQLPASSWORD}}` |
   | `DB_NAME` | `${{MySQL.MYSQLDATABASE}}` |
   | `JWT_SECRET` | `jaspilite_prod_secret_jwt_2026_xyz` |
   | `NODE_ENV` | `production` |
5. Go to **Settings** -> **Networking** -> click **"Generate Domain"** (e.g. `jaspilite-api-production.up.railway.app`).
6. Test your deployed backend by opening:
   `https://<your-backend-domain>/api/v2/`
   Expected response:
   ```
   Welcome to Jaspilite Api Version 2.0 - production
   ```

---

## 4. Step 3: Deploy Frontend Client (`jaspilite-website-client`)

1. In your Railway project, click **"+ New"** -> **"GitHub Repo"** -> select your `jaspilite-website-client` repository (branch: `release/jaspilite`).
2. Set **Root Directory** to `/` (or `jaspilite-website-client` if monorepo).
3. The client includes `Dockerfile`, `nginx.conf.template`, and `railway.json`.
4. Go to **Variables** tab in Railway and add:
   | Variable | Value |
   |---|---|
   | `BACKEND_URL` | `https://<your-backend-domain>` (or `http://${{Backend.RAILWAY_PRIVATE_DOMAIN}}:3000`) |
5. Go to **Settings** -> **Networking** -> click **"Generate Domain"** (e.g. `jaspilite.up.railway.app`).
6. Open your client domain in the browser to access the Jaspilite Web Admin Portal!

---

## 5. Seed Accounts for Initial Login

| Role | Email | Password |
|---|---|---|
| **Super Admin (sadmin)** | `test.sadmin@jaspilite.com` | `Test@123` |
| **Normal Admin (nadmin)** | `test.nadmin@jaspilite.com` | `Test@123` |
