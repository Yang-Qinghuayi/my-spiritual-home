<template>
  <v-navigation-drawer v-model="drawer" temporary width="122" :rail="rail" rail-width="72" class="drag-area">
    <!-- <div class="px-3 pt-1 pb-2">
      <drawer-toggle />
    </div> -->
    <!-- <div class="content-warp flex-fill no-drag-area" :class="{ 'rail-nav': rail }"> -->
    <v-list class="list-content d-flex flex-column justify-center" rounded :nav="true">
      <v-list-item
        v-for="item in nav"
        :key="item.val"
        class="drawer-item rounded-pill"
        :to="item.to"
        active-class="text-primary"
        :style="{ minHeight: '56px' }"
      >
        <template #prepend>
          <div class="d-flex justify-center align-center" :style="{ width: '40px', height: '40px' }">
            <v-icon size="small" :icon="item.icon" color="primary"></v-icon>
          </div>
        </template>
        <v-list-item-title class="font-weight-bold">
          {{ $t(item.title) }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
    <!-- </div> -->
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { mdiAlbum, mdiBookOpenBlankVariant, mdiCommentBookmark, mdiCompass, mdiPlus } from '@mdi/js'
import { storeToRefs } from 'pinia'

import VSquareBtn from '@/components/button/VSquareBtn.vue'
import { useSettingStore } from '@/store/setting'
const { rail } = storeToRefs(useSettingStore())
const { drawer } = storeToRefs(useSettingStore())

const nav = computed(() => {
  const list = [
    {
      icon: mdiAlbum,
      val: 'hello',
      title: '欢迎',
      to: 'zero',
    },
    {
      icon: mdiBookOpenBlankVariant,
      val: 'one',
      title: '一',
      to: 'one',
    },
    {
      icon: mdiBookOpenBlankVariant,
      val: 'two',
      title: '二',
      to: 'two',
    },
    {
      icon: mdiBookOpenBlankVariant,
      val: 'three',
      title: '三',
      to: 'three',
    },
  ]
  return list
})
</script>
