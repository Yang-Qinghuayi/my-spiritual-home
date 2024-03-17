<template>
  <v-navigation-drawer :rail="rail" rail-width="102" class="drag-area">
    <div class="px-3 mt-6" :class="{ 'mt-3': isClient, 'mb-1': rail }">
      <drawer-toggle />
    </div>
    <div class="content-warp flex-fill" :class="{ 'rail-nav': rail }">
      <v-list class="list-content d-flex flex-column justify-center" rounded :nav="true">
        <v-list-item
          v-for="item in nav"
          :key="item.val"
          class="drawer-item rounded-pill no-drag-area"
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

      <transition name="slide-fade-y">
        <div class="pb-2 gap-2 no-drag-area px-2 d-flex justify-center flex-column align-center">
          <app-account variant="tonal" />
          <!-- 设置按钮 -->
          <div
            @click="showControlCenter = !showControlCenter"
            class="d-flex justify-center align-center"
            :style="{ paddingBottom: '30px', paddingTop: '10px' }"
          >
            <v-icon size="small" :icon="mdiCog" color="primary"></v-icon>
          </div>
        </div>
      </transition>
      <app-playbar v-if="!rail" />
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import AppPlaybar from './Footer.vue'

import { sizeOfImage } from '@/util/fn'

const { track, showPipLyric, isCurrentFm, isProgram } = usePlayerControl()

const coverUrl = computed(() => sizeOfImage(track.value?.coverUrl ?? track.value?.al?.picUrl ?? '', 128))

import { mdiEarth, mdiGamepad, mdiHome, mdiMagnify, mdiCog, mdiAlbum, mdiRadar } from '@mdi/js'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/app'
const appStore = useAppStore()
const { showLogin, showControlCenter } = storeToRefs(appStore)
import AppAccount from '@/components/button/Account.vue'
import AggregateExtendBtn from '@/components/button/AggregateExtendBtn.vue'
import { useSettingStore } from '@/store/setting'
import { useUserStore } from '@/store/user'
import type { Account } from '@/types'
import is from '@/util/is'

import MiniPlayerBar from './MiniPlayerBar.vue'

const { rail, miniPlayer } = storeToRefs(useSettingStore())
const { logged, account } = storeToRefs(useUserStore())

const profile = computed((): Account['profile'] | undefined => {
  return account.value?.profile
})

const isClient = is.electron()
const nav = computed(() => {
  const list = [
    {
      icon: mdiMagnify,
      val: 'search',
      title: 'main.nav.search',
      to: '/search',
    },

    {
      icon: mdiHome,
      val: 'discover',
      title: 'main.nav.discover',
      to: '/discover',
    },
  ]

  return list
})
const navStyle = computed(() => {
  return miniPlayer.value ? { borderRight: '1px solid rgba(var(--v-border-color), var(--v-border-opacity))' } : {}
})

import { useRouter } from 'vue-router'
// 点击跳转函数,使用router
const router = useRouter()
const toPage = (path: string) => {
  router.push(path)
}
</script>
