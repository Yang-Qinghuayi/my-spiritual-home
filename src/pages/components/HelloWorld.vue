<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <!-- <p class="text-h4">{{ msg }}</p> -->

  <!-- <v-btn 
  class="my-4" 
  variant="flat" 
  color="primary" rounded="lg" type="button" @click="count++">
    count is: {{ count }}
  </v-btn> -->



  
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
