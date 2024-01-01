<template>
  <v-app-bar class="app_header drag-area" flat height="56">
    <div class="d-flex no-drag-area mx-1 align-center ml-auto">
      <!-- <control-center-toggle /> -->
      <!-- <div class="px-3 pt-1 pb-2">
        <drawer-toggle />
      </div> -->
      <theme-toggle />
      <account />
    </div>
  </v-app-bar>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDisplay } from 'vuetify'

import ThemeToggle from '@/components/toggle/ThemeToggle.vue'
import useInForeground from '@/hooks/useInForeground'
import { useAppStore } from '@/store/app'
const { mdAndUp } = useDisplay()
const { showSearch } = storeToRefs(useAppStore())
const { isActive: inSearchPage } = useInForeground('search')
</script>
<style scoped lang="scss">
.app_header {
  :deep(.v-toolbar__content) {
    justify-content: space-between;

    .topbar-content-wrapper {
      flex-grow: 1;
    }
  }
}
</style>
