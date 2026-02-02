<script setup lang="ts">
import { Tweet } from 'vue-better-tweet'

const route = useRoute()
const tweetId = computed(() => {
  const value = route.params.tweet
  return Array.isArray(value) ? value[0] : value
})
</script>

<template>
  <TweetPage theme="dark">
    <Tweet :apiUrl="`/api/tweet/kv/${tweetId}`" />
  </TweetPage>
</template>
