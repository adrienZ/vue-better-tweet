<script setup lang="ts">
import { Tweet as ClientTweet } from 'vue-better-tweet'
</script>

<template>
  <div class="tweet-shell">
    <h1 class="title">vue-better-tweet Nuxt demo</h1>

    <p class="demo-links">
      <NuxtLink to="/dark/1628832338187636740">Dark demo</NuxtLink>
      <span class="divider">•</span>
      <NuxtLink to="/light/1628832338187636740">Light demo</NuxtLink>
      <span class="divider">•</span>
      <NuxtLink to="/light/kv/1628832338187636740">KV demo</NuxtLink>
    </p>

    <div class="tweet-grid">
      <section class="tweet-panel">
        <h3 class="tweet-label">Rendered on the server (right click + View page source)</h3>
        <TweetSSR />
      </section>

      <section class="tweet-panel">
        <h3 class="tweet-label">Rendered on the client (check network tab)</h3>
        <ClientOnly>
          <ClientTweet id="1628832338187636740" />
        </ClientOnly>
      </section>
    </div>
  </div>
</template>

<style scoped>
:global(body) {
  background: #f6f6f6;
  color: #111111;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.tweet-shell {
  max-width: 1100px;
  margin: 32px auto;
  padding: 24px;
  border: 1px solid #d8d8d8;
  border-radius: 16px;
  background: #ffffff;
}

.demo-links {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 12px 0 24px;
  font-size: 0.95rem;
}

.demo-links a {
  color: #0f6fff;
  text-decoration: none;
  font-weight: 600;
}

.demo-links a:hover {
  text-decoration: underline;
}

.divider {
  color: #999999;
}

.tweet-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  align-items: start;
}

.tweet-panel {
  display: grid;
  gap: 12px;
  padding: 16px;
  border: 1px solid #ededed;
  border-radius: 12px;
}

@media (max-width: 900px) {
  .tweet-shell {
    margin: 20px 16px;
    padding: 20px;
  }

  .tweet-grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-color-scheme: dark) {
  :global(body) {
    background: #0b0b0b;
    color: #f2f2f2;
  }

  .tweet-shell {
    background: #111111;
    border-color: #2a2a2a;
  }

  .tweet-panel {
    border-color: #2a2a2a;
  }

  .tweet-label {
    color: #e6e6e6;
  }

  .demo-links a {
    color: #9bbcff;
  }

  .divider {
    color: #777777;
  }
}
</style>
