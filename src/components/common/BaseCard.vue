<template>
  <div class="card base-card">
    <slot />
  </div>
</template>

<style scoped>
.base-card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}
</style>