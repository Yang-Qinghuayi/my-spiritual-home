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

      <div class="p">
        对2024突然有一种想法,这很可能是小时候幻想中未来的年份吧<br>
        有一晚的蜷缩做着未来的梦,一觉睡醒就穿越了
      </div>

    </div>
  </div>
</template>
<script setup lang="ts">
import Context from "./components/Context.vue";
import HelloWorld from "./components/HelloWorld.vue";


</script>

<style>
@import '../styles/heti.css';

.p {
  font-family: 'LXGW WenKai', sans-serif;
}
</style>
