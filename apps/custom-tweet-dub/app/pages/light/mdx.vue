<script setup lang="ts">
const { data: content } = await useAsyncData(() => queryCollection('content').path("/tweet").first())
</script>

<template>
  <ContentRenderer v-if="content" :value="content" />
  <div v-else>content not found</div>
</template>
