<script setup lang="ts">
import { cx } from './classnames'
import s from './tweet-container.module.css'
import './theme.css'

type Props = {
  className?: string
}

defineProps<Props>()
</script>

<template>
  <div :class="cx('react-tweet-theme', s.root, className)">
    <article :class="s.article">
      <slot />
    </article>
  </div>
</template>
