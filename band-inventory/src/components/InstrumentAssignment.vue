<template>
  <div class="mx-8 mt-8">
    <div class="p-6 mt-6 mr-4">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Assignments</h2>
        <button
          class="btn btn-md bg-deep-green text-white"
          @click="addAssignment"
        >
          + Assign Instrument
        </button>
      </div>
      <div
        v-if="!detailStore?.assignments || detailStore.assignments.length === 0"
        class="bg-sky-50 border-1 rounded-sm border-gray p-8 text-center space-y-2"
      >
        <p>No current assignments on this instrument</p>
        <p class="font-semibold">
          Adding assignments to your instruments will help you keep track of who
          has the instrument
        </p>
        <RouterLink
          :to="`/instruments/${id}/management/assignment`"
          class="btn btn-md bg-green-800 text-white"
          >+ Add an assignment</RouterLink
        >
      </div>
      <div v-else class="space-y-4">
        <div
          v-for="(assignment) in recentAssignments"
          :key="assignment.id"
          class="border border-gray-300 p-4 rounded-lg"
        >
          <div class="flex justify-between items-start mb-3">
            <span
              v-if="assignment.open"
              class="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
            >
              Open
            </span>
            <span
              v-else
              class="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
            >
              Closed
            </span>
            <button
              v-if="assignment.open"
              @click="del(assignment)"
              class="text-red-500 hover:text-red-800 text-md font-bold underline"
            >
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
        <div v-if="detailStore.assignments.length > 3" class="text-center mt-6">
          <button
            @click="viewAllAssignments"
            class="px-6 py-2 bg-deep-green text-white rounded-sm hover:bg-emerald-900 font-semibold"
          >
            View All Assignments ({{ detailStore.assignments.length }})
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="showDeleteModal"
    class="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
  >
    <div
      class="bg-white border-2 border-gray-300 p-6 rounded-lg max-w-md w-full mx-4"
    >
      <h3 class="text-lg font-bold mb-4">
        Are you sure you want to close this assignment?
      </h3>
      <p class="py-4 text-red-600">This action cannot be reversed.</p>
      <div class="flex justify-end gap-2 mt-6">
        <button
          @click="showDeleteModal = false"
          class="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
        >
          Go Back
        </button>
        <button
          @click="closeAssignment"
          class="px-4 py-2 bg-red-400 rounded hover:bg-red-500"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useDetailStore, type AssignmentInfo } from "@/stores/detailStore";
import { ref, computed } from "vue";
import { assign } from "unplugin-vue-router/runtime";

const showDeleteModal = ref(false);
const detailStore = useDetailStore();
const route = useRoute();
const router = useRouter();

const { id } = route.params as { id: number };

const editingAssignmentID = ref()

function del(assignment: AssignmentInfo){
  showDeleteModal.value = !showDeleteModal.value
  editingAssignmentID.value = assignment.id
}

const recentAssignments = computed(() => {
  if (!detailStore?.assignments) return [];
  return detailStore.assignments
    .map((assignment, index) => ({ ...assignment, originalIndex: index }))
    .slice(0, 3);
});

const formatDate = (dateInput: string | Date) => {
  const date = new Date(dateInput);
  date.setDate(date.getDate() + 1);
  return date.toLocaleDateString();
};

function addAssignment() {
  router.push({ path: `/instruments/${id}/management/assignment` });
}

function viewAllAssignments() {
  router.push({ path: `/instruments/${id}/all-assignments` });
}


async function closeAssignment() {
    await detailStore.closeAssignment(editingAssignmentID.value, detailStore?.shownInstrument.serial_model)
    editingAssignmentID.value = 0
    showDeleteModal.value = false;
}
</script>

<style></style>
