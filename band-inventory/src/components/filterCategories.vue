<template>
  <label :for="id" class="sr-only">{{ title }}</label>
  <input
    class="input md:w-1/5"
    :placeholder="placeholder"
    type="text"
    :id="id"
    v-model="inputModel"
  />
</template>

<script setup lang="ts">
defineProps<{
  id: string;
  title: string;
  placeholder: string;
}>();

const inputModel = defineModel<string | number>();
</script>
