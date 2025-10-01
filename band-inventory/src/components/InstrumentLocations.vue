<template>
  <div class="mx-8 mt-8">
    <div class="p-6 flex justify-between mt-6 mr-4">
      <h2 class="text-xl font-bold">Locations</h2>
      <button class="btn btn-md" @click="goUpdate">Update Location</button>
    </div>
    <div v-if="instrument" class="ml-6">
      <p>{{ instrument.location }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { supabase } from "../lib/supabaseClient";
import { useInstrumentStore } from "@/stores/instrumentStore";
import { storeToRefs } from "pinia";

const instrumentStore = useInstrumentStore();

const instrument = storeToRefs(instrumentStore).idInstrument;
const errorMessage = ref("");
const route = useRoute();
const router = useRouter();
const { id } = route.params as { id: number };

const getInstrument = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from("instruments")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    instrument.value = data;
  } catch (err) {
    const error = err as Error;
    errorMessage.value = error.message || "Error loading instrument";
  }
};
function goUpdate() {
  router.push({ path: `/instruments/${id}/management/location` });
}
onMounted(() => {
  getInstrument(id);
});
</script>

<style></style>
