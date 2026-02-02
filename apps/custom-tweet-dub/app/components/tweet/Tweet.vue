<script setup lang="ts">
import type { Tweet as TweetType } from 'vue-better-tweet/api'
import { enrichTweet } from 'vue-better-tweet'
import { getTweet } from 'vue-better-tweet/api'
import DubTweet from './DubTweet.vue'

const props = defineProps<{
  id?: string
  tweet?: TweetType
  noTilt?: boolean
  onError?: (error: unknown) => void
}>()

let tweet: TweetType | undefined = props.tweet

if (!tweet && props.id) {
  try {
    tweet = await getTweet(props.id)
  } catch (error) {
    if (props.onError) {
      props.onError(error)
    } else {
      console.error(error)
    }
  }
}

const enrichedTweet = tweet ? enrichTweet(tweet) : undefined
</script>

<template>
  <div
    v-if="!enrichedTweet"
    class="prose flex h-[20rem] break-inside-avoid items-center rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4 text-center text-sm backdrop-blur-lg backdrop-filter"
  >
    <p>There was an error loading this tweet.</p>
  </div>
  <DubTweet v-else :tweet="enrichedTweet" :no-tilt="props.noTilt" />
</template>
