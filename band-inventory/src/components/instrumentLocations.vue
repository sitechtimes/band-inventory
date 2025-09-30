<template>
  <div class="mx-8 mt-8">
    <div class="p-6 flex justify-between mt-6 mr-4">
      <h2 class="text-xl font-bold">Locations</h2>
      <button class="btn btn-md" @click="goUpdate">
        Add Location
      </button>
    </div>

    <div v-if="instrument" class="ml-6">
      <p>{{ instrument.location }}</p>
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
