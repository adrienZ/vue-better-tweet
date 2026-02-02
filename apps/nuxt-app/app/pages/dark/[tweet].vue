<script setup lang="ts">
const route = useRoute()
const tweetId = computed(() => {
  const value = route.params.tweet
  return Array.isArray(value) ? value[0] : value
})
</script>

<template>
  <TweetPage theme="dark" footer>
    <TweetSSR :id="tweetId" />
  </TweetPage>
</template>
