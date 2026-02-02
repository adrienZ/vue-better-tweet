<script setup lang="ts">
import { computed } from 'vue'
import { EmbeddedTweet, TweetNotFound } from 'vue-better-tweet'

const route = useRoute()

const tweetId = computed(() => {
  const value = route.params.tweet
  return Array.isArray(value) ? value[0] : value
})

const { data: tweet, error } = await useAsyncData(
  () => `tweet-${tweetId.value}`,
  () => $fetch(`/api/tweet/kv/${tweetId.value}`)
)
</script>

<template>
  <TweetPage theme="light">
    <TweetNotFound v-if="error || !tweet" :error="error" />
    <EmbeddedTweet v-else :tweet="tweet.data" />
  </TweetPage>
</template>
