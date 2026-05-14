<template>
  <teleport to="body">
    <div v-if="visible">
      <div class="modal-backdrop fade show"></div>
      <div class="modal fade show d-block" tabindex="-1" @click.self="close">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ title }}</h5>
              <button type="button" class="btn-close" @click="close"></button>
            </div>
            <div class="modal-body">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
defineProps({ title: String, visible: Boolean })
const emit = defineEmits(['close'])
const close = () => emit('close')
</script>

<style scoped>
.modal-backdrop {
  z-index: 1040;
}

.modal {
  z-index: 1050;
}
</style>