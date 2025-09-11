<template>
  <navBar></navBar>
  <instrumentDetails></instrumentDetails>
  <repairSection :instrument-id="(route.params as any).id"></repairSection>
  <instrumentLocations></instrumentLocations>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import navBar from '@/components/navBar.vue'
import instrumentDetails from '@/components/instrumentDetails.vue'
import repairSection from '@/components/repairSection.vue'
import instrumentLocations from '@/components/instrumentLocations.vue'

const route = useRoute()
</script>