<!-- <template>
  <div>
    <navBar />
    <div class="mx-6 mt-6">
      <RouterLink :to="`/instruments/${id}/details`" class="text-emerald-600 font-bold">
        🡨 Back to Instrument Details
      </RouterLink>
      <h1 class="text-2xl font-bold mt-4 mb-6">All Assignments</h1>
        <div v-if="instrument?.assignments" class="space-y-4">
          <div v-for="(assignment, index) in instrument.assignments" :key="index"
            class="border border-gray-300 p-4 rounded-lg">
            <div class="flex justify-between items-start mb-3">
              <span v-if="assignment.open"
                class="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Open
              </span>
              <span v-else class="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                Closed
              </span>
              <button v-if="assignment.open" @click="chosenIndex(index)"
                class="text-red-500 hover:text-red-800 text-md font-bold underline">
                Close Assignment
              </button>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <h4 class="font-bold text-gray-400">Assigned To</h4>
                <p>{{ assignment.assigned_to }}</p>
              </div>
              <div>
                <h4 class="font-bold text-gray-400">Assigned Date</h4>
                <p>{{ formatDate(assignment.assigned_date) }}</p>
              </div>
              <div v-if="assignment.return_date">
                <h4 class="font-bold text-gray-400">Return Date</h4>
                <p>{{ formatDate(assignment.return_date) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showDeleteModal" class="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="bg-white border-2 border-gray-300 p-6 rounded-lg max-w-md w-full mx-4">
        <h3 class="text-lg font-bold mb-4">Are you sure you want to close this assignment?</h3>
        <p class="py-4 text-red-600">This action cannot be reversed.</p>
        <div class="flex justify-end gap-2 mt-6">
          <button @click="showDeleteModal = false"
            class="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
            Go Back
          </button>
          <button @click="confirmCloseAssignment" class="px-4 py-2 bg-red-400 rounded hover:bg-red-500">
            Confirm
          </button>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useDetailStore } from "@/stores/detailStore";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import navBar from "@/components/navBar.vue";

const detailStore = useDetailStore();
const instrument = storeToRefs(detailStore).shownInstrument;
const route = useRoute();
const router = useRouter();
const i = ref();
const showDeleteModal = ref(false);

const { id } = route.params as { id: string };

onMounted(async () => {
  await detailStore.getDetails(Number(id));
});

const formatDate = (dateInput: string | Date) => {
  const date = new Date(dateInput);
  date.setDate(date.getDate() + 1);
  return date.toLocaleDateString();
};
function chosenIndex(index: number) {
  i.value = index;
  showDeleteModal.value = true;
}
async function confirmCloseAssignment() {
  if (instrument.value && i.value !== undefined) {
    await detailStore.closeAssignment(
      instrument.value.assignments[i.value].assigned_to,
      instrument.value.assignments[i.value].assigned_date,
      instrument.value.assignments[i.value].return_date,
      Number(id)
    );
    showDeleteModal.value = false;
  }
}
</script>

<style></style>
 -->
