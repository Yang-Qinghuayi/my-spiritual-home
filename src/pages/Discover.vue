<template>
  <div class="text-center">
    <div class="d-flex justify-center">
      <!-- <v-img height="140" :src="material" /> -->
    </div>
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite + Vuetify" />
    <Context class="my-2" />

    <!-- 一篇文章 -->
    <div class="entry heti">
      <h2 class="p">2024</h2>

      <div class="p">欢迎大家</div>

    </div>
  </div>
</template>
<script setup lang="ts">
import Context from "./components/Context.vue";
import HelloWorld from "./components/HelloWorld.vue";
import { marked } from "marked";

import nine from "../assets/nine.md?raw" ;

const content = computed(() => {
  return marked(nine);
});


</script>

<style>
@import '../styles/heti.css';

.p {
  font-family: 'LXGW WenKai', sans-serif;
}
</style>
