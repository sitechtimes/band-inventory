<template>
  <div class="m-4">
    <h2 class="text-xl font-semibold text-gray-700">Add Music Manually</h2>
    <form
      @submit.prevent="submitMusic"
      class="shadow-sm rounded-sm gap-x-4 mt-4"
    >
      <div class="grid @max-md:grid-rows-2 md:grid-cols-2">
        <div class="flex flex-col m-2 md:ml-4">
          <label for="title"
            >Title <span class="text-red-500">*</span></label
          >
          <input
            id="title"
            v-model="formData.title"
            type="text"
            required
            class="input w-7/8 focus:border-green"
            placeholder="Enter title"
          />
        </div>
        <div class="flex flex-col m-2 md:ml-4">
          <label for="category"
            >Category <span class="text-red-500">*</span></label
          >
          <input
            id="category"
            v-model="formData.category"
            type="text"
            required
            class="input w-7/8 focus:border-green"
            placeholder="Enter category"
          />
        </div>
        <div class="flex flex-col m-2 md:ml-4">
          <label for="serial_id"
            >Serial ID <span class="text-red-500">*</span></label
          >
          <input
            id="serial_id"
            v-model="formData.serial_id"
            type="text"
            required
            class="input w-7/8 focus:border-green"
            placeholder="Enter serial ID"
          />
        </div>
        <div class="flex flex-col m-2 md:ml-4">
          <label for="scanned">Scanned?</label>
          <select
            id="scanned"
            v-model="formData.scanned"
            class="input w-7/8 focus:border-green"
          >
            <option :value="true">Yes</option>
            <option :value="false">No</option>
          </select>
        </div>
        <div class="flex flex-col m-2 md:ml-4">
          <label for="composer">Composer</label>
          <input
            id="composer"
            v-model="formData.composer"
            type="text"
            class="input w-7/8 focus:border-green"
            placeholder="Enter composer"
          />
        </div>
        <div class="flex flex-col m-2 md:ml-4">
          <label for="arranger">Arranger</label>
          <input
            id="arranger"
            v-model="formData.arranger"
            type="text"
            class="input w-7/8 focus:border-green"
            placeholder="Enter arranger"
          />
        </div>
        <div class="flex flex-col m-2 md:ml-4">
          <label for="level">Level</label>
          <input
            id="level"
            v-model="formData.level"
            type="text"
            class="input w-7/8 focus:border-green"
            placeholder="Enter level (ex: ME, E, VE)"
          />
        </div>
        <div class="flex flex-col m-2 md:ml-4">
          <label for="NYSSMA_level">NYSSMA Level</label>
          <input
            id="NYSSMA_level"
            v-model="formData.NYSSMA_level"
            type="text"
            class="input w-7/8 focus:border-green"
            placeholder="Enter NYSSMA level"
          />
        </div>
        <div class="flex flex-col m-2 md:ml-4">
          <label for="notes">Notes</label>
          <input
            id="notes"
            v-model="formData.notes"
            type="text"
            class="input w-7/8 focus:border-green"
            placeholder="Enter notes"
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          :disabled="isSubmitting"
          class="btn mx-2 md:ml-4 my-4 align-self-center bg-deep-green hover:bg-emerald-900 text-white"
        >
          <span v-if="isSubmitting">Adding Music...</span>
          <span v-else>Add Music</span>
        </button>
        <button
          type="button"
          @click="resetForm"
          class="btn bg-white border-none hover:shadow-none hover:underline"
        >
          Reset
        </button>
      </div>
    </form>
    <div
      v-if="message"
      class="mt-6 mx-2 md:ml-4 p-4 rounded-md"
      :class="
        messageType === 'success'
          ? 'bg-green-50 text-green-800 border border-green-200'
          : 'bg-red-50 text-red-800 border border-red-200'
      "
    >
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useMusicStore } from "@/stores/musicStore";

const musicStore = useMusicStore();

const formData = reactive({
  title: "",
  category: "",
  serial_id: "",
  scanned: false,
  composer: "",
  arranger: "",
  level: "",
  NYSSMA_level: "",
  notes: "",
});

const isSubmitting = ref(false);
const message = ref("");
const messageType = ref<"success" | "error">("success");

const submitMusic = async () => {
  isSubmitting.value = true;
  message.value = "";

  try {
    if (!formData.title || !formData.category || !formData.serial_id) {
      showMessage(
        "Please fill in all required fields (Title, Category, Serial ID)",
        "error",
      );
      return;
    }

    const musicData = {
      title: formData.title.trim(),
      category: formData.category.trim(),
      serial_id: formData.serial_id.trim(),
      scanned: formData.scanned,
      composer: formData.composer.trim(),
      arranger: formData.arranger.trim(),
      level: formData.level.trim(),
      NYSSMA_level: formData.NYSSMA_level.trim(),
      notes: formData.notes.trim(),
    };

    await musicStore.addSingleMusic(musicData as any);

    showMessage("Music added successfully", "success");
    resetForm();
  } catch (error) {
    showMessage(
      `Error adding music: ${error instanceof Error ? error.message : "Unknown error"}`,
      "error",
    );
    console.error("Add music error:", error);
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  Object.assign(formData, {
    title: "",
    category: "",
    serial_id: "",
    scanned: false,
    composer: "",
    arranger: "",
    level: "",
    NYSSMA_level: "",
    notes: "",
  });
  message.value = "";
};

const showMessage = (msg: string, type: "success" | "error") => {
  message.value = msg;
  messageType.value = type;
  if (type === "success") {
    setTimeout(() => {
      if (message.value === msg) {
        message.value = "";
      }
    }, 5000);
  }
};
</script>
