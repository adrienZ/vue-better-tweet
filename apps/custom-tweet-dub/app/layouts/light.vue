<script setup lang="ts">
import s from '~/assets/css/layout.module.css'
</script>

<template>
  <div data-theme="light">
    <div :class="s.root">
      <main :class="s.main">
        <div class="max-w-[550px] min-w-[250px]"><slot /></div>
      </main>
    </div>
  </div>
</template>