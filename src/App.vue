<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>
<script setup lang="ts">
import { Router } from 'vue-router'

import { useAppStore } from '@/store/app'
const route = useRoute()
const appStore = useAppStore()
appStore.init()
</script>
