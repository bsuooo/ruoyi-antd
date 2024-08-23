<script lang="ts" setup name="Menu">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div class="excludeHeight p-10px">
    <a-card class="h-100%">
      <a-space>
        <a-button @click="count++">
          {{ count }}
        </a-button>
      </a-space>
    </a-card>
  </div>
</template>

<style scoped>
.excludeHeight {
  height: calc(100% - 20px);
}
</style>
