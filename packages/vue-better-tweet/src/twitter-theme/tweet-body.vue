<script setup lang="ts">
import type { EnrichedTweet } from 'react-tweet'
import { TweetLink } from './tweet-link.vue'
import s from './tweet-body.module.css'

type Props = {
  tweet: EnrichedTweet
}

const props = defineProps<Props>()
</script>

<template>
  <p :class="s.root" :lang="props.tweet.lang" dir="auto">
    <template v-for="(item, index) in props.tweet.entities" :key="index">
      <TweetLink
        v-if="item.type === 'hashtag' || item.type === 'mention' || item.type === 'url' || item.type === 'symbol'"
        :href="item.href"
      >
        {{ item.text }}
      </TweetLink>
      <span v-else-if="item.type !== 'media'" v-html="item.text" />
    </template>
    <TweetLink v-if="props.tweet.note_tweet" :href="props.tweet.url">
      <span>&nbsp;</span>
      Show more
    </TweetLink>
  </p>
</template>
