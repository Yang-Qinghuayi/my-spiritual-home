<template>
  <v-navigation-drawer v-model="app.showControlCenter" location="right" temporary width="300" class="bg-surface">
    <v-toolbar density="compact" color="surface">
      <v-toolbar-title class="text-caption font-weight-bold text-onSurfaceVariant">{{
        $t('common.shortcut')
      }}</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-divider />
    <v-container>
      <v-row dense>
        <v-col class="d-flex">
          <switch-card v-model="darkMode" :title="$t('common.dark_theme')" :icon="mdiCircleHalfFull" />
        </v-col>
        <v-col class="d-flex">
          <switch-card :title="$t('common.setting')" :icon="mdiCog" @click="to('setting')" />
        </v-col>
      </v-row>
      <v-row dense>
        <v-col class="d-flex">
          <switch-card v-if="isDev" title="一" :icon="mdiCog" @click="to('one')" />
        </v-col>
      </v-row>
    </v-container>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { mdiCircleHalfFull, mdiClose, mdiCog, mdiTestTube } from '@mdi/js'
import { storeToRefs } from 'pinia'
import { useTheme } from 'vuetify'

// Composables
import { useAppStore } from '@/store/app'
import { APPEARANCE, useSettingStore } from '@/store/setting'

export default defineComponent({
  setup() {
    const app = useAppStore()
    const setting = useSettingStore()
    const theme = useTheme()
    const router = useRouter()
    const darkMode = computed<boolean>({
      get() {
        return theme.current.value.dark
      },
      set(value) {
        setting.appearance = value ? APPEARANCE.DARK : APPEARANCE.LIGHT
      },
    })
    const isDev = import.meta.env.DEV ?? false
    // for dev
    function to(name: 'setting' | 'one') {
      router.push(`/${name}`)
    }
    return {
      darkMode,
      app,
      mdiCircleHalfFull,
      mdiTestTube,
      mdiClose,
      mdiCog,
      isDev,
      to,
    }
  },
})
</script>
