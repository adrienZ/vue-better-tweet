<script setup lang="ts">
import { TweetNotFound, EmbeddedTweet } from "vue-better-tweet"
const route = useRoute();
const tweetId = computed(() => route.params.tweet)

const { data: tweet, error } = await useAsyncData(
  `tweet-${tweetId}`,
  () => $fetch(`/api/tweet/cache/${tweetId.value}`),
  { server: true }
)
</script>

<template>
  <TweetPage theme="light" footer>
    <TweetNotFound v-if="error || !tweet" />
    <EmbeddedTweet v-else :tweet="tweet.data" />
  </TweetPage>
</template>