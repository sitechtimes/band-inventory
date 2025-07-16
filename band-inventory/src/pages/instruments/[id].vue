<template>
  <navBar></navBar>
  <instrumentDetails></instrumentDetails>
  <InstrumentManagement></InstrumentManagement>
  <InstrumentRepair></InstrumentRepair>
</template>

<script setup lang="ts">
import navBar from '@/components/navBar.vue'
import InstrumentDetails from '@/components/InstrumentDetails.vue'
import InstrumentManagement from '@/components/InstrumentAssignment.vue'
import InstrumentRepair from '@/components/InstrumentRepair.vue'
</script>