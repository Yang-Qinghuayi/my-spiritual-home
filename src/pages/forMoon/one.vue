<script lang="ts" setup>

import { marked } from "marked";

import nine from "@/assets/nine.md?raw";

const content = computed(() => {
  return marked(nine);
});

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
