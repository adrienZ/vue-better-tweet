<script setup lang="ts">
import type { TweetUser } from 'react-tweet/api'
import { computed } from 'vue'
import { cx } from './classnames'
import { Verified, VerifiedBusiness, VerifiedGovernment } from './icons'
import s from './verified-badge.module.css'

type Props = {
  user: TweetUser
  className?: string
}

const props = defineProps<Props>()

const verified = computed(() =>
  Boolean(props.user.verified || props.user.is_blue_verified || props.user.verified_type)
)

const icon = computed(() => {
  if (!verified.value) return null
  if (props.user.verified_type === 'Government') return VerifiedGovernment
  if (props.user.verified_type === 'Business') return VerifiedBusiness
  return Verified
})

const iconClassName = computed(() => {
  if (!verified.value) return undefined
  if (props.user.verified_type === 'Government') return s.verifiedGovernment
  if (props.user.verified_type === 'Business') return undefined
  if (!props.user.is_blue_verified) return s.verifiedOld
  return s.verifiedBlue
})
</script>

<template>
  <div v-if="verified && icon" :class="cx(className, iconClassName)">
    <component :is="icon" />
  </div>
</template>
