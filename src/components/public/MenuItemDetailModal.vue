<template>
  <BaseModal :visible="visible" :title="item?.name"  @close="emit('close')">
    <div class="row g-4">
      <!-- Rasm -->
      <div class="col-12 col-md-6">
        <img :src="normalizeMediaUrl(item?.imageUrl)" class="img-fluid rounded-3 shadow-sm w-100"
          style="max-height: 380px; object-fit: cover;" @error="handleImageError" />
      </div>

      <!-- Ma'lumotlar -->
      <div class="col-12 col-md-6">
        <div class="d-flex justify-content-between align-items-start mb-3">
          <h4 class="mb-0">{{ item?.name }}</h4>
          <span class="badge bg-success fs-6">{{ item?.price?.toLocaleString() }} so'm</span>
        </div>

        <p class="text-muted">{{ item?.description }}</p>

        <div class="row text-center my-4">
          <div class="col-4 border-end">
            <div class="small text-muted">Vazni</div>
            <div class="fw-bold">{{ item?.weight || '—' }}</div>
          </div>
          <div class="col-4 border-end">
            <div class="small text-muted">Kaloriya</div>
            <div class="fw-bold">{{ item?.calories || '—' }}</div>
          </div>
          <div class="col-4">
            <div class="small text-muted">Holati</div>
            <div :class="item?.isAvailable ? 'text-success' : 'text-danger'" class="fw-bold">
              {{ item?.isAvailable ? 'Mavjud' : 'Hozircha yo‘q' }}
            </div>
          </div>
        </div>

        <div v-if="item?.isPopular" class="alert alert-warning d-flex align-items-center gap-2">
          <Flame size="20" class="text-warning" />
          <strong>Mashhur taom!</strong>
        </div>

        <button class="btn btn-primary w-100 py-3" @click="addToOrder">
          <ShoppingCart size="18" class="me-2" />
          Buyurtma berish
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import { ref } from 'vue'
import BaseModal from '@/components/common/BaseModal.vue'
import { Flame, ShoppingCart } from 'lucide-vue-next'
import { normalizeMediaUrl } from '@/utilities/image.js'

const props = defineProps({
  visible: Boolean,
  item: Object
})

const emit = defineEmits(['close'])

const handleImageError = (e) => {
  e.target.src = '/placeholder-food.jpg' // yoki boshqa default rasm
}

const addToOrder = () => {
  // Kelajakda savat funksiyasiga qo'shish
  alert(`${props.item.name} buyurtmaga qo'shildi! (Keyinchalik to'liq savat tizimi qo'shiladi)`)
  emit('close')
}
</script>