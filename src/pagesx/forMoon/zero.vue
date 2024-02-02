<script lang="ts" setup>
import { marked } from 'marked'
import { useToast } from 'vue-toastification'

import nine from '@/assets/二.md?raw'
const toast = useToast()
import { mdiClipboardTextPlay, mdiPartyPopper } from '@mdi/js'
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
  <div class="entry">
    <div class="heti">
      <h2 class="p">欢迎</h2>
      <v-icon size="small" :icon="mdiPartyPopper" color="primary"></v-icon>
      <div class="p">就叫谢往月吧</div>
    </div>
  </div>
</template>

<style>
@import '../../styles/heti.css';

.p {
  font-family: 'LXGW WenKai', sans-serif;
}

.entry {
  /* 分别是 */
  margin: 0 auto;
  max-width: 640px;
  padding: 0 0.4rem 0 0.7rem;
  /* 文字居中 */
  text-align: center;
}
</style>
