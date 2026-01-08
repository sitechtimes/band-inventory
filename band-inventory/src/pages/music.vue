<template>
  <div v-if="!userStore.user">
    <span>You don't have access to this page. Please sign in
      <RouterLink to="/" class="underline text-blue-600">here</RouterLink>
    </span>
  </div>
  <div v-else>
    <navBar />
    <musicTable />
  </div>
</template>

<script setup lang="ts">
import navBar from '@/components/navBar.vue';
import musicTable from '../components/musicTable.vue'
import { useUserStore } from "@/stores/authStore";

const userStore = useUserStore();
</script>

<style></style>
