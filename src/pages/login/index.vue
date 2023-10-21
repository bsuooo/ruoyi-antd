<template>
	<h1 class="name">{{ name }}</h1>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const name = ref('hello world!')
</script>

<style scoped></style>
