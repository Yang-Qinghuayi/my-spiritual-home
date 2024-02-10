<template>
  <section class="d-flex justify-center">
    <div style="max-width: 960px" class="d-flex flex-column gap-4 flex-fill">
      <switch-card
        rounded="lg"
        title="导航栏位置"
        :subtitle="t('main.setting.navPosition', navPosition === NavPosition.top ? 2 : 1)"
        :icon="mdiPageLayoutSidebarLeft"
        @click="togglePosition"
      />
      <app-settings-theme />
      <app-settings-other />
      <!-- <app-settings-unlock /> -->
      <app-settings-reset />
      <!-- <app-settings-tips /> -->
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AppSettingsOther from './components/Other.vue'
import AppSettingsReset from './components/Reset.vue'
import AppSettingsTheme from './components/Theme.vue'
import AppSettingsTips from './components/Tips.vue'
import AppSettingsUnlock from './components/Unlock.vue'
const { t } = useI18n()

import { storeToRefs } from 'pinia'
import { APPEARANCE, NavPosition, useSettingStore } from '@/store/setting'
const setting = useSettingStore()
const { miniPlayer, navPosition } = storeToRefs(setting)
import { mdiPageLayoutSidebarLeft, mdiTestTube } from '@mdi/js'
function togglePosition() {
  if (navPosition.value === NavPosition.left) {
    navPosition.value = NavPosition.top
  } else {
    navPosition.value = NavPosition.left
  }
}
</script>
