<script lang="ts" setup>
import { marked } from 'marked'
import { useToast } from 'vue-toastification'

import nine from '@/assets/二.md?raw'
const toast = useToast()
import { useRouter } from 'vue-router'

const router = useRouter()

function kiss(event: any) {
  toast.warning('施工中...')
  router.push('/one')
}

const content = computed(() => {
  return marked(nine)
})
</script>

<template>
  <!-- 一篇文章 -->
  <div class="text-center">
    <div class="heti">
      <h2 class="p">2024</h2>
      <div class="p">这篇小说就叫谢往月吧</div>
    </div>
  </div>
</template>

<style>
@import '../../styles/heti.css';

.p {
  font-family: 'LXGW WenKai', sans-serif;
}
</style>
