<script setup lang="ts">
import type { MediaDetails } from 'vue-better-tweet/api'
import type { EnrichedTweet } from 'vue-better-tweet'
import { getMediaUrl, getMp4Video } from 'vue-better-tweet'
import BlurImage from './BlurImage.vue'

const props = defineProps<{ tweet: EnrichedTweet; media: MediaDetails }>()

const imageHeight = computed(() => {
  return (
    props.media.original_info.height *
    (2048 / props.media.original_info.width)
  )
})
</script>

<template>
  <video
    v-if="props.media.type === 'video'"
    class="rounded-lg border border-gray-200 drop-shadow-sm"
    loop
    width="2048px"
    height="2048px"
    autoplay
    muted
    playsinline
  >
    <source :src="getMp4Video(props.media).url" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  <BlurImage
    v-else-if="props.media.type === 'animated_gif'"
    :alt="props.tweet.text"
    :width="2048"
    :height="imageHeight"
    :src="getMp4Video(props.media).url"
    class="rounded-lg border border-gray-200 drop-shadow-sm"
  />

  <BlurImage
    v-else
    :alt="props.tweet.text"
    :width="2048"
    :height="imageHeight"
    :src="getMediaUrl(props.media, 'small')"
    class="rounded-lg border border-gray-200 drop-shadow-sm"
  />
</template>
