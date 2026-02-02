<script setup lang="ts">
import { Tweet, type TwitterComponents } from 'vue-better-tweet'
import { NuxtImg } from "#components"

const route = useRoute()
const tweetId = computed(() => {
  const value = route.params.tweet
  return Array.isArray(value) ? value[0] : value
})

const components: TwitterComponents = {
  AvatarImg: defineComponent({
    inheritAttrs: false,
    setup(_, { attrs }) {
      return () => h(NuxtImg, {...attrs, quality: 20 })
    },
  }),
  MediaImg: defineComponent({
    inheritAttrs: false,
    setup(_, { attrs }) {
      return () => h(NuxtImg, { ...attrs, quality: 10, sizes: "100px" })
    },
  }),
}
</script>

<template>
  <TweetPage theme="light">
    <Tweet :id="tweetId" :components="components" />
  </TweetPage>
</template>
