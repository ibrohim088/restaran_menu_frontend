# 🍽️ QR Restoran Menu — Frontend

> Bu fayl — loyiha bo'yicha qisqacha qo'llanma. Doim loyiha ildizida saqlanadi.

---

## 🌐 Asosiy URL manzillar

| Maqsad | URL |
|---|---|
| **Frontend (lokal)** | `http://localhost:5173` |
| **Frontend (tarmoq)** | `http://<sizning-IP>:5173` |
| **Backend API** | `http://localhost:8000` |

> Frontend boshqa qurilmadan (telefon va h.k.) ochilganda Backend ham avtomatik shu qurilmaning IP manzili orqali ulanadi (`vite.config.js` proxy sozlamasi).

---

## 🚀 Loyihani ishga tushirish

```bash
# 1. Paketlarni o'rnatish
npm install

# 2. Development serverni ishga tushirish
npm run dev

# 3. Production uchun build qilish
npm run build

# 4. Build natijasini ko'rish
npm run preview
```

---

## 📦 O'rnatilgan paketlar

| Paket | Vazifasi |
|---|---|
| `vue` | Asosiy Vue 3 framework |
| `vue-router` | Sahifalar o'rtasida navigatsiya |
| `pinia` | Global state management (store) |
| `axios` | Backend API ga so'rov yuborish |
| `bootstrap` | UI stillari va komponentlari |
| `lucide-vue-next` | Ikonalar kutubxonasi |
| `qrcode.vue` | QR kodni frontendda ko'rsatish |
| `vite` | Build tool va dev server |
| `@vitejs/plugin-vue` | Vite uchun Vue plagini |

---

## 🗂️ Fayl tuzilmasi

```bash
f-menu/
├── index.html
├── package.json
├── vite.config.js                      # Vite va proxy sozlamalari
├── src/
│   ├── main.js                         # App entry point
│   ├── App.vue                         # Asosiy komponent
│   ├── style.css
│   ├── api/
│   │   ├── client.js                   # Axios instance (base URL, interceptors)
│   │   └── services/
│   │       ├── index.js
│   │       ├── authService.js          # Login, logout, me, refresh
│   │       ├── categoryService.js      # Kategoriya CRUD
│   │       ├── menuService.js          # Taom CRUD
│   │       ├── publicService.js        # Ommaviy menyu (token shart emas)
│   │       └── restaurantService.js    # Restoran CRUD, QR
│   ├── assets/
│   │   └── css/
│   │       ├── main.css
│   │       ├── admin.css
│   │       └── public.css
│   ├── components/
│   │   ├── common/                     # Qayta ishlatiladigan komponentlar
│   │   │   ├── BaseButton.vue
│   │   │   ├── BaseCard.vue
│   │   │   ├── BaseInput.vue
│   │   │   ├── BaseModal.vue
│   │   │   ├── ConfirmationDialog.vue
│   │   │   ├── LoadingSpinner.vue
│   │   │   └── ToastNotification.vue
│   │   ├── layout/
│   │   │   ├── admin/
│   │   │   │   ├── AdminLayout.vue
│   │   │   │   ├── AdminNavbar.vue
│   │   │   │   └── AdminSidebar.vue
│   │   │   └── public/
│   │   │       ├── PublicLayout.vue
│   │   │       ├── PublicHeader.vue
│   │   │       └── BottomNav.vue
│   │   ├── admin/
│   │   │   ├── categories/             # CategoryCard, CategoryForm, CategoryTable
│   │   │   ├── menu/                   # MenuItemCard, MenuItemTable
│   │   │   ├── restaurants/            # RestaurantCard, RestaurantTable
│   │   │   └── users/                  # AdminCard, AdminTable
│   │   └── public/
│   │       ├── CategoryCard.vue
│   │       ├── MenuItemCard.vue
│   │       ├── MenuItemDetailModal.vue
│   │       ├── PopularItems.vue
│   │       ├── QRCodeDisplay.vue
│   │       └── RestaurantCard.vue
│   ├── routers/
│   │   ├── router.js                   # Router instance
│   │   ├── routes.js                   # Barcha yo'llar
│   │   └── guard.js                    # Auth guard (himoyalangan sahifalar)
│   ├── stores/                         # Pinia store'lar
│   │   ├── auth.js
│   │   ├── category.js
│   │   ├── menu.js
│   │   ├── public.js
│   │   ├── restaurant.js
│   │   └── ui.js
│   ├── views/
│   │   ├── auth/
│   │   │   └── AdminLogin.vue          # /auth-admin-login
│   │   ├── admin/
│   │   │   ├── DashboardView.vue       # /admin
│   │   │   ├── admins/                 # /admin/admins (faqat superadmin)
│   │   │   ├── restaurants/            # /admin/restaurants
│   │   │   ├── categories/             # /admin/categories
│   │   │   └── menu-items/             # /admin/menu-items
│   │   └── public/
│   │       ├── RestaurantMenu.vue      # /restaurant/:id
│   │       └── PublicMenuView.vue      # /public/menu/:restaurantId
│   └── utilities/
│       ├── constants.js
│       ├── formatters.js
│       ├── helpers.js
│       ├── image.js
│       └── validators.js
```

---

## 🛣️ Sahifalar (Routes)

| URL | Sahifa | Himoya |
|---|---|---|
| `/auth-admin-login` | Admin login | — |
| `/admin` | Dashboard | ✅ Auth |
| `/admin/restaurants` | Restoranlar | ✅ Auth |
| `/admin/categories` | Kategoriyalar | ✅ Auth |
| `/admin/menu-items` | Taomlar | ✅ Auth |
| `/admin/admins` | Adminlar | ✅ SuperAdmin |
| `/restaurant/:id` | Ommaviy menyu | — |
| `/public/menu/:restaurantId` | QR menyu | — |

---

## 🔐 Rol tizimi

```bash
superadmin  →  /admin/admins sahifasiga kira oladi
admin       →  faqat o'z restoroni, kategoriyalari va taomlarini ko'radi
public      →  token shart emas (QR skanerlagan mijozlar)
```

---

## ⚙️ Proxy sozlamasi

`vite.config.js` da `/api` prefiksli barcha so'rovlar Backend serverga yo'naltiriladi:

```bash
Frontend: http://localhost:5173/api/auth/login
    ↓ proxy
Backend:  http://localhost:8000/auth/login
```