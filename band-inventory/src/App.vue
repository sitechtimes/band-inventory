<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
//import navBar from "./components/navBar.vue";

</script>

<template>
  <!-- <navBar></navBar> -->
  <!-- <ul>
    <li v-for="instrument in instruments" :key="instrument.id">{{ instrument.category }}</li>
  </ul> -->

  <div class="content">
    <RouterView />
  </div>
</template>

<style></style>
