<script setup lang="ts">
import { Tweet } from 'vue-better-tweet';

const { data: content } = await useAsyncData(() => queryCollection('content').path("/tweet").first())
</script>

<template>
  <ContentRenderer v-if="content" :value="content" :components="{ tweet: Tweet }" />
  <div v-else>content not found</div>
</template>
