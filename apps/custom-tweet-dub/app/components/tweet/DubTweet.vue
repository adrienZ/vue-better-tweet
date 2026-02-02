<script setup lang="ts">
import type { EnrichedTweet } from 'vue-better-tweet'
import Tilt from './Tilt.vue'
import TweetBody from './TweetBody.vue'

const props = defineProps<{ tweet: EnrichedTweet; noTilt?: boolean }>()
</script>

<template>
  <div v-if="props.noTilt">
    <TweetBody :tweet="props.tweet" />
  </div>
  <Tilt
    v-else
    :glare-enable="true"
    :glare-max-opacity="0.3"
    glare-color="#ffffff"
    glare-position="all"
    glare-border-radius="8px"
    :tilt-max-angle-x="10"
    :tilt-max-angle-y="10"
  >
    <TweetBody :tweet="props.tweet" />
  </Tilt>
</template>
