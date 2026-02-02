<script setup lang="ts">
import { Tweet } from 'vue-better-tweet/server'

const props = withDefaults(defineProps<{ id?: string }>(), {
  id: '1828844933060366524',
})
</script>

<template>
  <div>
    <Tweet :id="props.id" />
  </div>
</template>
