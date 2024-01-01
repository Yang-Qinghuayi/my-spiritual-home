<script lang="ts" setup>
import { marked } from 'marked'

import nine from '@/assets/一.md?raw'

const content = computed(() => {
  return marked(nine)
})
</script>

<template>
  <!-- 一篇文章 -->
  <div class="entry">
    <div class="entry heti">
      <h2 class="p">谢往月</h2>
      <div class="p" v-html="content" />
    </div>
  </div>
</template>

<style>
@import '../../styles/heti.css';

.p {
  font-family: 'LXGW WenKai', sans-serif;
}

.entry {
  margin: 0 auto;
  max-width: 680px;
  padding: 0 1.5rem;
  /* 文字居中 */
  text-align: center;
}
</style>
