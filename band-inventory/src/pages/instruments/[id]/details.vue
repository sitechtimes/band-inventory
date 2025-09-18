<template>
  <div v-if="!userStore.user">
    <span
      >You don't have access to this page. Please sign in
      <RouterLink to="/" class="underline text-blue-600">here</RouterLink>
      .
    </span>
  </div>
  <div>
    <navBar></navBar>
    <instrumentDetails></instrumentDetails>
    <InstrumentManagement></InstrumentManagement>
    <InstrumentRepair></InstrumentRepair>
    <InstrumentLocations></InstrumentLocations>
  </div>
</template>

<script setup lang="ts">
import navBar from "@/components/navBar.vue";
import InstrumentDetails from "@/components/InstrumentDetails.vue";
import InstrumentManagement from "@/components/InstrumentAssignment.vue";
import InstrumentRepair from "@/components/InstrumentRepair.vue";
import InstrumentLocations from "@/components/InstrumentLocations.vue";
import { useUserStore } from "@/stores/authStore";
import { RouterLink } from "vue-router";

const userStore = useUserStore();
</script>
