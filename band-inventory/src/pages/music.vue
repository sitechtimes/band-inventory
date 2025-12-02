<template>
  <div>
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

