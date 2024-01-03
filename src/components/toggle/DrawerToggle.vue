<template>
  <v-btn icon class="no-drag-area" variant="text" @click="drawer = !drawer">
    <v-icon>
      {{ mdiMenu }}
    </v-icon>
  </v-btn>
</template>

<script setup lang="ts">
import { mdiMenu, mdiMenuOpen } from '@mdi/js'
import { storeToRefs } from 'pinia'

import { useSettingStore } from '@/store/setting'

const { drawer } = storeToRefs(useSettingStore())
</script>
