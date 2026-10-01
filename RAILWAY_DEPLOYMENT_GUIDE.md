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

## 5. Admin Types & Portal Roles

The system supports 4 primary web portal roles (with dedicated Angular modules) and 2 system/staff roles:

| Role Name | Code | Portal Route | Key Responsibilities |
|---|---|---|---|
| **Super Admin** | `sadmin` | `/admin/sadmin` | Master catalog products, product categories, global costing, delivery partners, payment gateways, system-wide shops & branches, admin user creation. |
| **Normal Admin** | `nadmin` | `/admin/nadmin` | Merchant/shop owner portal: manage owned shops, physical branches, sales analytics, promotional banners/discounts, vouchers, and shop-level staff. |
| **Branch Manager** | `manager` | `/admin/manager` | Branch outlet manager: view daily orders, manage local branch stock, and track order fulfillment. |
| **Packing Admin** | `padmin` | `/admin/padmin` | Fulfillment center / warehouse: item picking, order packing, and delivery dispatch. |
| **Branch Employee** | `employee` | API / Cashier | Physical outlet floor staff / POS cashier. |
| **API Integration** | `api` | Headless API | Machine-to-machine automated services. |

---

## 6. Pre-Configured Test Accounts (Email & Password)

All test accounts below are pre-seeded in `adminusers` with active status and password **`Test@123`**:

| Role | Display Name | Login Email | Password | Post-Login Redirect |
|---|---|---|---|---|
| **Super Admin (`sadmin`)** | Test Super Admin | `test.sadmin@jaspilite.com` | `Test@123` | `https://<frontend-domain>/admin/sadmin` |
| **Normal Admin (`nadmin`)** | Test Normal Admin | `test.nadmin@jaspilite.com` | `Test@123` | `https://<frontend-domain>/admin/nadmin` |
| **Branch Manager (`manager`)** | Test Branch Manager | `test.manager@jaspilite.com` | `Test@123` | `https://<frontend-domain>/admin/manager` |
| **Packing Admin (`padmin`)** | Test Packing Admin | `test.padmin@jaspilite.com` | `Test@123` | `https://<frontend-domain>/admin/padmin` |
| **Employee (`employee`)** | Test Employee Cashier | `test.employee@jaspilite.com` | `Test@123` | `https://<frontend-domain>/admin/sadmin` |

> **Password Reset Helper**: If credentials ever need to be re-seeded or reset, run:
> ```bash
> node seed_all_admin_roles.js
> ```

---

## 7. Database Data Inventory (From `jaspilite-db`)

The bundled SQL dump file (`jaspilite-db`, ~169.8 MB) contains a comprehensive production dataset:

| Entity | DB Table | Record Count | Description |
|---|---|---|---|
| **Catalog Products** | `products` | **13,239** | Full grocery, fresh produce, and packaged item catalog |
| **Product Categories** | `product_category` | **112** | Department, aisle, and food taxonomy |
| **Sales / Orders** | `sales` | **32,426** | Historical customer transactions |
| **Order Line Items** | `sales_details` | **476,514** | Purchased items across all sales |
| **Registered Customers** | `users` | **19,295** | Mobile app & web customer accounts |
| **Customer Addresses** | `users_addresses` | **10,947** | Saved delivery coordinates & addresses |
| **Branch Inventory** | `shop_items` | **46,503** | Localized stock counts & price overrides |
| **Merchant Shops** | `shops` | **198** | Registered vendor & store entities |
| **Physical Outlets** | `branches` | **318** | Outlets, GPS markers & delivery zones |
| **Promotions** | `promotions` | **264** | Active & seasonal deals |
| **Vouchers** | `vouchers` | **18** | Discount codes & promo rules |
| **Admin & Staff Users** | `adminusers` | **371** | Accounts across all admin roles |
| **Delivery Logistics** | `delivery_vendors` | **2** | Integrated courier & delivery partners |
| **Payment Gateways** | `payment_gateways` | **1** | Payment processor integration records |

---

## 8. Post-Deployment Railway Testing Checklist (10 Core Functionalities)

Once deployed on Railway, test the following 10 core functionalities directly in your browser:

1. **Login (`sadmin` & `nadmin`)**:
   - Navigate to `https://<frontend-domain>/admin/login`
   - Log in with `test.sadmin@jaspilite.com` -> verify redirect to `/admin/sadmin`
   - Log in with `test.nadmin@jaspilite.com` -> verify redirect to `/admin/nadmin`
2. **Settings (`nadmin`)**:
   - Go to **Settings** (`/admin/nadmin/settings`) -> verify shops and branches list loads.
3. **Add Users (`sadmin` & `nadmin`)**:
   - In Sadmin (`/admin/sadmin/users`) or Nadmin (`/admin/nadmin/users`), click **Add User** -> submit new user -> verify success message.
4. **Add Shop (`nadmin`)**:
   - Go to `/admin/nadmin/settings` -> click **Add Shop** -> fill name and address -> verify created shop appears.
5. **Add Branch (`nadmin`)**:
   - In Settings under a shop, click **Add Branch** -> fill name, address, coordinates -> verify branch is created.
6. **Add Products (`sadmin`)**:
   - Go to `/admin/sadmin/products` -> click **Add Product** -> fill title, category, weight -> save -> verify new product.
7. **Add Category (`sadmin`)**:
   - Go to `/admin/sadmin/categories` -> click **Add Category** -> enter category title -> verify it appears in catalog.
8. **Costing (`sadmin`)**:
   - Go to `/admin/sadmin/costing` -> verify total sales and received/pending amounts calculate and render.
9. **Sales Analytics (`nadmin`)**:
   - Go to `/admin/nadmin/sales` -> verify orders and sales transaction table loads.
10. **Promotions (`nadmin`)**:
    - Go to `/admin/nadmin/promotions` -> verify active deals, promo cards, and discount rules render properly.

