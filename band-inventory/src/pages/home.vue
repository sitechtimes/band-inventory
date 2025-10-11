<template>
  <div v-if="!userStore.user">
    <span
      >You don't have access to this page. Please sign in
      <RouterLink to="/" class="underline text-blue-600">here</RouterLink>
      .
    </span>
  </div>
  <div v-else>
     <navBar/>
    <InstrumentTable/>
  </div>
</template>

<script setup lang="ts">
import navBar from '@/components/navBar.vue';
import InstrumentTable from '../components/InstrumentTable.vue'
import { onMounted, ref } from 'vue';
import { useUserStore } from "@/stores/authStore";
import { RouterLink } from "vue-router";

const userStore = useUserStore();
</script>

<style></style>
