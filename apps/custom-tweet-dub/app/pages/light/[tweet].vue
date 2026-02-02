<script setup lang="ts">
import { getTweet } from 'vue-better-tweet/api'

const route = useRoute()
const tweetId = computed(() => {
  const value = route.params.tweet
  return Array.isArray(value) ? value[0] : value
})

const key = `tweet:${tweetId.value ?? 'unknown'}`
const { data: tweet } = await useAsyncData(
  key,
  async () => {
    if (!tweetId.value) return undefined
    return getTweet(tweetId.value).catch(() => undefined)
  },
  { server: true }
)

const title = computed(() => {
  if (!tweet.value) return 'Next Tweet'
  const username = ` - @${tweet.value.user.screen_name}`
  const maxLength = 68 - username.length
  const text =
    tweet.value.text.length > maxLength
      ? `${tweet.value.text.slice(0, maxLength)}…`
      : tweet.value.text
  return `${text}${username}`
})

useHead(() => ({
  title: title.value,
}))

definePageMeta({
  layout: 'light',
})

defineRouteRules({
  isr: 1800,
})
</script>

<template>
  <Tweet :id="tweetId" :tweet="tweet ?? undefined" />
</template>
