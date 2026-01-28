<script setup lang="ts">
import type { TweetUser } from 'react-tweet/api'
import { computed } from 'vue'
import { cx } from './classnames'
import styles from './highlighted-label.module.css'

type Props = {
  user: TweetUser
  className?: string
}

const props = defineProps<Props>()

const label = computed(() => props.user.highlighted_label)
const labelUrl = computed(() => label.value?.badge?.url)
</script>

<template>
  <div v-if="label && labelUrl" :class="cx(styles.label, className)">
    <img :src="labelUrl" :alt="label?.description" />
  </div>
</template>
