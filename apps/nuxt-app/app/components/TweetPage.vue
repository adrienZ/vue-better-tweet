<script setup lang="ts">
const props = withDefaults(
  defineProps<{ theme?: 'light' | 'dark'; footer?: boolean }>(),
  {
    theme: 'dark',
    footer: false,
  }
)
</script>

<template>
  <div :data-theme="props.theme">
    <div :class="[$style.root, 'vue-better-tweet-theme']">
      <main :class="$style.main">
        <slot />
      </main>
      <footer v-if="props.footer" :class="$style.footer">
        <p>🤯 This tweet was statically generated.</p>
      </footer>
    </div>
  </div>
</template>

<style module>
.root {
  font-family: var(--tweet-font-family);
  color: var(--tweet-font-color);
  background: var(--tweet-bg-color);
  min-height: 100vh;
  overflow: auto;
  padding: 2rem 1rem;
}

.main {
  display: flex;
  justify-content: center;
}

.footer {
  font-size: 0.875rem;
  text-align: center;
  margin-top: -0.5rem;
}
</style>
