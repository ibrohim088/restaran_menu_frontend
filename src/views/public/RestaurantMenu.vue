<template>
  <div class="page">
    <PublicHeader />

    <div v-if="loading" class="state-screen">
      <div class="loader"></div>
      <p>Yuklanmoqda...</p>
    </div>

    <div v-else-if="error" class="state-screen">
      <span style="font-size:2.5rem">
        <UtensilsCrossed :size="40" color="#ccc" />
      </span>
      <p>{{ error }}</p>
      <button class="retry-btn" @click="loadMenu">Qayta urinish</button>
    </div>

    <div v-else-if="restaurant" class="">

      <div class="hero">
        <div class="hero-cover"
          :style="restaurantCover ? { backgroundImage: `url(${restaurantCover})` } : { background: '#1a1a2e' }">
        </div>

        <div class="hero-body">
          <img v-if="restaurantLogo" :src="restaurantLogo" class="hero-logo" alt=""
            @error="e => e.target.style.display = 'none'" />
          <div v-else class="hero-logo-fallback">
            <Utensils :size="30" color="#fff" />
          </div>

          <h1 class="hero-name">{{ restaurant?.name }}</h1>
          <p class="hero-address">
            <MapPin :size="13" /> {{ restaurant?.address }}
          </p>

          <div class="hero-chips">
            <span class="chip" v-if="restaurant?.phone">
              <Phone :size="12" /> {{ restaurant?.phone }}
            </span>
            <span class="chip">
              <Clock :size="12" /> {{ restaurant?.workingHours || '24/7' }}
            </span>
          </div>
        </div>
      </div>

      <div class="desc-box" v-if="restaurant?.description">
        <p class="desc-text" :class="{ open: descOpen }">
          {{ restaurant?.description }}
        </p>
        <button class="desc-toggle" @click="descOpen = !descOpen">
          <template v-if="descOpen">
            Yopish
            <ChevronUp :size="13" />
          </template>
          <template v-else>
            Ko'proq
            <ChevronDown :size="13" />
          </template>
        </button>
      </div>

      <PopularItems :items="popularItems" />

      <div class="menu-section">
        <div v-for="category in menu" :key="category._id" class="cat-block">
          <div class="cat-title">
            <UtensilsCrossed :size="16" />
            {{ category.name }}
            <span class="cat-badge">{{ category.items?.length || 0 }}</span>
          </div>

          <div class="cat-items">
            <MenuItemCard v-for="item in category.items" :key="item._id" :item="item" @detail="openDetail" />
          </div>
        </div>
      </div>
    </div>

    <BottomNav />
    <MenuItemDetailModal :visible="showDetailModal" :item="selectedItem" @close="showDetailModal = false" />
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.page {
  background: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 72px;
}

/* ── Loading / Error ── */
.state-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 12px;
  color: #666;
  font-size: 14px;
}

.loader {
  width: 36px;
  height: 36px;
  border: 3px solid #eee;
  border-top-color: #222;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.retry-btn {
  margin-top: 8px;
  padding: 10px 24px;
  border: none;
  background: #222;
  color: #fff;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}

.hero {
  position: relative;
  background: #111;
  margin: 10px 12px;
  border-radius: 16px;
  overflow: hidden;
}

.hero-cover {
  width: 100%;
  height: 450px;
  object-fit: cover;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hero-body {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.35) 60%, transparent 100%);
  padding: 32px 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.hero-logo {
  width: 64px;
  height: 64px;
  border-radius: 14px;
  object-fit: cover;
  border: 2.5px solid rgba(255, 255, 255, 0.25);
  margin-bottom: 8px;
  background: #333;
}

.hero-logo-fallback {
  width: 64px;
  height: 64px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.hero-name {
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  margin: 0;
  line-height: 1.2;
}

.hero-address {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 4px;
}

.hero-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 20px;
  backdrop-filter: blur(4px);
}

.desc-box {
  background: #fff;
  margin: 10px 12px;
  border-radius: 12px;
  padding: 14px 16px;
}

.desc-text {
  font-size: 13px;
  color: #555;
  line-height: 1.65;
  margin: 0 0 6px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.desc-text.open {
  display: block;
}

.desc-toggle {
  background: none;
  border: none;
  padding: 0;
  font-size: 12px;
  color: #222;
  font-weight: 600;
  cursor: pointer;
}

.menu-section {
  padding: 0 12px;
}

.cat-block {
  margin-bottom: 24px;
}

.cat-title {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 15px;
  font-weight: 700;
  color: #111;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1.5px solid #eee;
}

.cat-badge {
  margin-left: auto;
  background: #111;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 20px;
}

.cat-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

@media (max-width: 576px) {
  .hero {
    margin: 8px 8px;
    border-radius: 12px;
    background-size: cover;

  }

  .hero-cover {
    height: 380px;
  }

  .hero-name {
    font-size: 18px;
  }

  .hero-logo {
    width: 52px;
    height: 52px;
  }

  .menu-section {
    padding: 0 8px;
  }

  .desc-box {
    margin: 8px 8px;
  }
}

@media (min-width: 577px) and (max-width: 768px) {
  .hero-cover {
    height: 400px;
  }

  .hero {
    margin: 10px 16px;
    background-size: cover;

  }
}

@media (min-width: 769px) {
  .hero {
    margin: 16px auto;
    max-width: 720px;
  }

  .menu-section {
    max-width: 720px;
    margin: 0 auto;
    padding: 0 16px;
  }

  .desc-box {
    max-width: 720px;
    margin: 10px auto;
  }
}
</style>

<script setup>
import MenuItemDetailModal from '@/components/public/MenuItemDetailModal.vue'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getPublicMenu } from '@/api/services/publicService'
import PublicHeader from '@/components/layout/public/PublicHeader.vue'
import MenuItemCard from '@/components/public/MenuItemCard.vue'
import PopularItems from '@/components/public/PopularItems.vue'
import BottomNav from '@/components/layout/public/BottomNav.vue'
import { Clock, MapPin, Phone, Utensils, UtensilsCrossed, ChevronDown, ChevronUp } from 'lucide-vue-next'
import { normalizeMediaUrl } from '@/utilities/image.js'

const route = useRoute()
const restaurant = ref(null)
const menu = ref([])
const popularItems = ref([])
const selectedItem = ref(null)
const showDetailModal = ref(false)
const loading = ref(true)
const error = ref(null)
const descOpen = ref(false)

const restaurantLogo = computed(() =>
  normalizeMediaUrl(
    restaurant.value?.logoUrl ||
    restaurant.value?.logo ||
    restaurant.value?.image ||
    restaurant.value?.photo || ''
  )
)

const restaurantCover = computed(() =>
  normalizeMediaUrl(
    restaurant.value?.coverUrl ||
    restaurant.value?.cover ||
    restaurant.value?.background || ''
  )
)

const openDetail = (item) => {
  selectedItem.value = item
  showDetailModal.value = true
}

const loadMenu = async () => {
  const { id, restaurantId } = route.params
  const rid = id || restaurantId
  loading.value = true
  error.value = null
  try {
    const res = await getPublicMenu(rid)
    if (res.data.success) {
      restaurant.value = res.data.data.restaurant
      menu.value = res.data.data.menu
      popularItems.value = res.data.data.popularItems
    } else {
      error.value = res.data.message || 'Menyu topilmadi'
    }
  } catch (err) {
    console.error(err)
    error.value = "Server bilan bog'lanib bo'lmadi"
  } finally {
    loading.value = false
  }
}

onMounted(loadMenu)
</script>