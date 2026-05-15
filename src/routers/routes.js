// src/router/routes.js
const routes = [
  // ===================== PUBLIC ROUTES =====================
  {
    path: '/',
    name: 'PublicHome',
    component: () => import('../views/public/PublicHome.vue') //import('@/views/public/PublicHome.vue')
  },
  {
    path: '/restaurant/:id',
    name: 'RestaurantMenu',
    component: () => import('../views/public/RestaurantMenu.vue')
  },
  {
    path: '/public/menu/:restaurantId',
    name: 'PublicMenu',
    component: () => import('../views/public/PublicMenuView.vue')
  },

  // ===================== AUTH =====================
  {
    path: '/auth-admin-login',
    name: 'AdminLogin',
    component: () => import('../views/auth/AdminLogin.vue')
  },

  // ===================== ADMIN ROUTES =====================
  {
    path: '/admin',
    component: () => import('../components/layout/admin/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: () => import('../views/admin/DashboardView.vue')
      },
      {
        path: 'restaurants',
        name: 'AdminRestaurants',
        component: () => import('../views/admin/restaurants/RestaurantList.vue')
      },
      {
        path: 'restaurants/new',
        name: 'AdminRestaurantCreate',
        component: () => import('../views/admin/restaurants/RestaurantForm.vue')
      },
      {
        // TUZATILDI: edit route qo'shildi
        path: 'restaurants/edit/:id',
        name: 'AdminRestaurantEdit',
        component: () => import('../views/admin/restaurants/RestaurantForm.vue')
      },
      {
        path: 'restaurants/:id/qr',
        name: 'AdminRestaurantQR',
        component: () => import('../views/admin/restaurants/RestaurantQRView.vue')
      },
      {
        path: 'categories',
        name: 'AdminCategories',
        component: () => import('../views/admin/categories/CategoryList.vue')
      },
      {
        path: 'categories/new',
        name: 'AdminCategoryCreate',
        component: () => import('../views/admin/categories/CategoryForm.vue')
      },
      {
        path: 'categories/edit/:id',
        name: 'AdminCategoryEdit',
        component: () => import('../views/admin/categories/CategoryForm.vue')
      },
      {
        path: 'menu-items',
        name: 'AdminMenuItems',
        component: () => import('../views/admin/menu-items/MenuItemList.vue')
      },
      {
        path: 'menu-items/new',
        name: 'AdminMenuItemCreate',
        component: () => import('../views/admin/menu-items/MenuItemForm.vue')
      },
      {
        path: 'menu-items/edit/:id',
        name: 'AdminMenuItemEdit',
        component: () => import('../views/admin/menu-items/MenuItemForm.vue')
      },
      {
        path: 'admins',
        name: 'AdminList',
        component: () => import('../views/admin/admins/AdminList.vue'),
        meta: { requiresSuperAdmin: true }
      }
    ]
  }
]

export default routes