<script setup lang="ts">
import type { EnrichedTweet } from 'vue-better-tweet'
import { nFormatter } from './utils'
import Heart from './icons/Heart.vue'
import Message from './icons/Message.vue'
import TweetHeader from './TweetHeader.vue'
import TweetText from './TweetText.vue'
import TweetMedia from './TweetMedia.vue'

const props = defineProps<{ tweet: EnrichedTweet }>()
</script>

<template>
  <div
    class="break-inside-avoid rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter"
  >
    <div>
      <TweetHeader :tweet="props.tweet" />
      <div
        v-if="props.tweet.in_reply_to_status_id_str && props.tweet.in_reply_to_screen_name"
        class="mt-5 text-base text-gray-500"
      >
        Replying to
        <a
          class="text-[#1da1f2] no-underline"
          :href="props.tweet.in_reply_to_url"
          target="_blank"
        >
          @{{ props.tweet.in_reply_to_screen_name }}
        </a>
      </div>
      <TweetText :tweet="props.tweet" />
    </div>
    <div class="-mb-2 mt-3">
      <div
        v-if="props.tweet.mediaDetails?.length"
        :class="
          props.tweet.mediaDetails.length === 1
            ? ''
            : 'inline-grid grid-cols-2 gap-x-2 gap-y-2'
        "
      >
        <a
          v-for="media in props.tweet.mediaDetails"
          :key="media.media_url_https"
          :href="props.tweet.url"
          target="_blank"
        >
          <TweetMedia :tweet="props.tweet" :media="media" />
        </a>
      </div>
    </div>
    <div class="mt-5 flex justify-center space-x-8 text-sm text-gray-500">
      <a
        class="group flex items-center space-x-3 hover:text-red-600"
        :href="props.tweet.like_url"
        target="_blank"
        rel="noreferrer"
      >
        <Heart class="h-4 w-4 group-hover:fill-red-600" />
        <p>{{ nFormatter(props.tweet.favorite_count) }}</p>
      </a>
      <a
        class="group flex items-center space-x-3 hover:text-blue-600"
        :href="props.tweet.reply_url"
        target="_blank"
        rel="noreferrer"
      >
        <Message class="h-4 w-4 group-hover:fill-blue-600" />
        <p>{{ nFormatter(props.tweet.conversation_count) }}</p>
      </a>
    </div>
  </div>
</template>
