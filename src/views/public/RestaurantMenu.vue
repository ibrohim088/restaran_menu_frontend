<template>
  <div class="public-menu" v-if="restaurant">
    <PublicHeader />

    <div class="container mt-4">
      <div class="restaurant-header text-white p-4 rounded-3 mb-4"
        :style="{ backgroundImage: restaurantCover ? `url(${restaurantCover})` : 'none' }">
        <div class="row align-items-center">
          <div class="col-auto">
            <img v-if="showLogo && restaurantLogo" :src="restaurantLogo" class="restaurant-logo" alt=""
              @error="showLogo = false">
            <div v-else class="restaurant-logo bg-white d-flex align-items-center justify-content-center text-muted"
              style="width: 80px; height: 80px; border-radius: 50%; border: 4px solid white;">
              <Utensils size="36" />
            </div>
          </div>
          <div class="col">
            <h1 class="mb-1">{{ restaurant.name }}</h1>
            <div class="d-flex flex-wrap gap-3 text-white-75 small mb-2">
              <span class="d-flex align-items-center gap-1">
                <MapPin size="16" /> {{ restaurant.address }}
              </span>
              <span v-if="restaurant.phone" class="d-flex align-items-center gap-1">
                <Phone size="16" /> {{ restaurant.phone }}
              </span>
              <span v-if="restaurant.workingHours" class="d-flex align-items-center gap-1">
                <Clock size="16" /> {{ restaurant.workingHours }}
              </span>
            </div>
            <p class="mb-0 text-white-75">{{ restaurant.description }}</p>
          </div>
        </div>
      </div>

      <PopularItems :items="popularItems" />

      <div v-for="category in menu" :key="category._id" class="mb-5">
        <div class="d-flex align-items-center justify-content-between mb-3">
          <h3 class="category-title mb-0 d-flex align-items-center gap-2">
            <Tag size="20" /> {{ category.name }}
          </h3>
          <span class="badge bg-primary">{{ category.items.length }} ta</span>
        </div>
        <p v-if="category.description" class="text-muted">{{ category.description }}</p>

        <div class="row g-3">
          <div class="col-12 col-md-6 col-lg-4" v-for="item in category.items" :key="item._id">
            <MenuItemCard :item="item" @detail="openDetail" />
          </div>
        </div>

        <MenuItemDetailModal :visible="showDetailModal" :item="selectedItem" @close="showDetailModal = false" />
      </div>
    </div>

    <BottomNav />
  </div>

  <div v-else class="text-center py-5">
    <LoadingSpinner />
  </div>
</template>

<script setup>
import MenuItemDetailModal from '@/components/public/MenuItemDetailModal.vue'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getPublicMenu } from '@/api/services/publicService'
import PublicHeader from '@/components/layout/public/PublicHeader.vue'
import MenuItemCard from '@/components/public/MenuItemCard.vue'
import PopularItems from '@/components/public/PopularItems.vue'
import BottomNav from '@/components/layout/public/BottomNav.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import { Clock, MapPin, Phone, Tag, Utensils } from 'lucide-vue-next'
import { normalizeMediaUrl } from '@/utilities/image.js'

const route = useRoute()
const restaurant = ref(null)
const menu = ref([])
const popularItems = ref([])
const showLogo = ref(true)
const selectedItem = ref(null)
const showDetailModal = ref(false)

const restaurantLogo = computed(() => {
  return normalizeMediaUrl(restaurant.value?.logoUrl || restaurant.value?.logo || restaurant.value?.image || restaurant.value?.photo || '')
})

const restaurantCover = computed(() => {
  return normalizeMediaUrl(restaurant.value?.coverUrl || restaurant.value?.cover || restaurant.value?.background || '')
})

const openDetail = (item) => {
  selectedItem.value = item
  showDetailModal.value = true
}

onMounted(async () => {
  const { id, restaurantId } = route.params
  const rid = id || restaurantId
  try {
    const res = await getPublicMenu(rid)
    if (res.data.success) {
      restaurant.value = res.data.data.restaurant
      menu.value = res.data.data.menu
      popularItems.value = res.data.data.popularItems
    }
  } catch (err) {
    console.error(err)
  }
})
</script>

<style scoped>
.restaurant-header {
  background-size: cover;
  background-position: center;
  min-height: 200px;
}

.restaurant-logo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid white;
  object-fit: cover;
}

.category-title {
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 10px;
}
</style>