<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import navBar from './components/navBar.vue';
// import { ref, onMounted } from 'vue'
// import { supabase } from './lib/supabaseClient'

// const instruments = ref([])

// async function getInstruments() {
//   const { data } = await supabase.from('instruments').select()
//   instruments.value = data
// }

// onMounted(() => {
//    getInstruments()
// })

// import { ref } from 'vue'
// import type { Ref } from 'vue'

// const year: Ref<string | number> = ref('2020')

// year.value = 2020 // ok!
// console.log(year.value)


</script>

<template>
  <navBar></navBar>
  <RouterLink to="/">Login</RouterLink>
  <!-- <ul>
    <li v-for="instrument in instruments" :key="instrument.id">{{ instrument.category }}</li>
  </ul> -->

  <div class="content">
	  <RouterView />
  </div>
</template>

<style></style>