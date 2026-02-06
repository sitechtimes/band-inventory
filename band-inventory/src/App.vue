<script setup lang="ts">
import { RouterView } from "vue-router";
import { useUserStore } from "@/stores/authStore";

const authStore = useUserStore();
authStore.initAuth();
</script>

<template>
  <div class="content">
    <RouterView />
  </div>
</template>

<style></style>
