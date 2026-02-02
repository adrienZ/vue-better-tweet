<script setup lang="ts">
import type { EnrichedTweet } from 'vue-better-tweet'

const props = defineProps<{ tweet: EnrichedTweet }>()

const linkTypes = new Set(['hashtag', 'mention', 'url', 'symbol'])
</script>

<template>
  <div class="mb-2 mt-4 truncate whitespace-pre-wrap text-[15px] text-gray-700">
    <template v-for="(item, i) in props.tweet.entities" :key="i">
      <a
        v-if="linkTypes.has(item.type)"
        class="text-[rgb(29,161,242)] font-normal no-underline"
        :href="item.href"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ item.text }}
      </a>
      <span v-else-if="item.type === 'text'" v-html="item.text" />
    </template>
  </div>
</template>
