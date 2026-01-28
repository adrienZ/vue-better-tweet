<script setup lang="ts">
import type { Tweet } from 'react-tweet/api'
import { getTweet } from 'react-tweet/api'
import type { TwitterComponents } from './twitter-theme/types'
import { EmbeddedTweet } from './twitter-theme/embedded-tweet.vue'
import { TweetNotFound } from './twitter-theme/tweet-not-found.vue'
import { TweetSkeleton } from './twitter-theme/tweet-skeleton.vue'
import { ref, watch } from 'vue'

export type TweetProps = {
  id?: string
  apiUrl?: string
  fetchOptions?: RequestInit
  components?: TwitterComponents
  onError?(error: unknown): unknown
}

const props = defineProps<TweetProps>()

const data = ref<Tweet | null>(null)
const error = ref<unknown>(null)
const isLoading = ref(false)

const fetchTweetData = async () => {
  if (!props.id && !props.apiUrl) {
    data.value = null
    error.value = null
    isLoading.value = false
    return
  }

  isLoading.value = true
  error.value = null

  try {
    let tweet: Tweet | undefined | null = null

    if (props.apiUrl) {
      const res = await fetch(props.apiUrl, props.fetchOptions)
      const json = await res.json()
      tweet = res.ok ? (json?.data ?? json) : null

      if (!res.ok) {
        throw new Error(`Failed to fetch tweet at "${props.apiUrl}" with "${res.status}".`)
      }
    } else if (props.id) {
      tweet = await getTweet(props.id, props.fetchOptions)
    }

    data.value = tweet ?? null
  } catch (err) {
    error.value = props.onError ? props.onError(err) : err
    data.value = null
  } finally {
    isLoading.value = false
  }
}

watch(
  () => [props.id, props.apiUrl, props.fetchOptions],
  () => {
    void fetchTweetData()
  },
  { immediate: true }
)
</script>

<template>
  <slot v-if="isLoading" name="fallback">
    <TweetSkeleton />
  </slot>
  <component
    v-else-if="error || !data"
    :is="props.components?.TweetNotFound ?? TweetNotFound"
    :error="error"
  />
  <EmbeddedTweet v-else :tweet="data" :components="props.components" />
</template>
