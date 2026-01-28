<script setup lang="ts">
import styles from './skeleton.module.css'

type Props = {
  style?: Record<string, string>
}

defineProps<Props>()
</script>

<template>
  <span :class="styles.skeleton" :style="style" />
</template>
