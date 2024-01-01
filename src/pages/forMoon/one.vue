<script lang="ts" setup>
import { marked } from 'marked'

import nine from '@/assets/一.md?raw'

const content = computed(() => {
  return marked(nine)
})
</script>

<template>
  <!-- 一篇文章 -->
  <div class="text-center">
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
</style>
