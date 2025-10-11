<template>
  <div class="mx-8 mt-8">
    <div class="p-6 mt-6 mr-4">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Locations</h2>
        <button class="btn btn-md bg-green text-white" @click="goUpdate">
          Update Location
        </button>
      </div>
      <div v-if="instrument" class="border border-gray-300 p-4 rounded-lg">
        <div>
          <h4 class="font-bold text-gray-400">Current Location</h4>
          <p>{{ instrument.location }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDetailStore } from '@/stores/detailStore';

const route = useRoute();
const router = useRouter();
const detailStore = useDetailStore();

const instrument = computed(() => detailStore.shownInstrument);

const { id } = route.params as { id: number };

onMounted(() => {
  detailStore.getDetails(Number(id));
});

function goUpdate() {
  router.push({ path: `/instruments/${id}/management/location` });
}
</script>
