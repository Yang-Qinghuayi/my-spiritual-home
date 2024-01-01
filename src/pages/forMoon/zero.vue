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
    <div class="entry heti">
      <h2 class="p">2024</h2>
      <div class="p">
        对2024突然有一种想法,这很可能是小时候幻想中未来的年份吧<br />
        有一晚的蜷缩做着未来的梦,一觉睡醒就穿越了
      </div>
    </div>
  </div>
</template>
