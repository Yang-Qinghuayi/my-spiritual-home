<template>
  <div class="nvbar">
    <div class="nav-item x3" @click="go('/one')">往月</div>
    <div class="nav-item x1" @click="go('/mine')">我的</div>
    <div class="nav-item x2" @click="go('/home')">推荐</div>
    <div class="nav-item x3" @click="go('/searchPage')">搜索</div>
    <div class="nav-item x4" @click="go('/settings')">设置</div>
  </div>
  <main>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </main>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
import { useAppStore } from '@/store/app'
const route = useRoute()
const appStore = useAppStore()
appStore.init()
const go = (path: string) => {
  if (path === router.currentRoute.value.path) return
  router.push(path)
}
</script>

<style scoped lang="scss">
.nvbar {
  position: fixed;
  width: 12vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10vh;
  margin-left: 0.2vw;
}
.nav-item {
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  justify-content: center;
  width: 100%;
  /* 条目宽度占满容器 */
  height: 56px;
  box-sizing: border-box;
  margin: 5px auto;
  padding: auto;
  border: 0 solid #ccc;
  border-radius: 5px;
}

.x1 {
  background-color: #bdbd49;
}

.x2 {
  background-color: #8ba076;
}

.x3 {
  background-color: #b7a64a;
}

.x4 {
  background-color: #8e6b12;
}

main {
  overflow: auto;
  margin-bottom: 0;
  padding: 20px 2vw 11px 1vw;
  box-sizing: border-box;
  scrollbar-width: none; // firefox
  margin-left: 13vw;
  width: 86vw;
  height: 98vh;
  //  边框阴影
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: #fdfdf5;
}
</style>
