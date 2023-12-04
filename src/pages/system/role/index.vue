<template>
	<a-button @click="count++">
		{{ count }}
	</a-button>
</template>

<script lang="ts" setup name="Role">
import { ref } from 'vue'
const count = ref(0)
</script>
