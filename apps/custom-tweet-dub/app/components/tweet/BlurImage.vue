<script setup lang="ts">
const props = defineProps<{
  src: string
  alt: string
  width?: number | string
  height?: number | string
  class?: string
}>()

const loading = ref(true)
const src = ref(props.src)

watch(
  () => props.src,
  (value) => {
    src.value = value
    loading.value = true
  }, {
    immediate: true,
  }
)

const handleError = () => {
  src.value = `https://avatar.vercel.sh/${props.alt}`
}
</script>

<template>
  <NuxtImg
    :src="src"
    :alt="props.alt"
    :width="props.width"
    :height="props.height"
    :class="[props.class, loading ? 'blur-[2px]' : 'blur-0']"
    @load="loading = false"
    @error="handleError"
  />
</template>
