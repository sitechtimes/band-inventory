<template>
  <div class="dropdown" :class="{ 'dropdown-open': isOpen }" @mouseenter="isOpen = true" @mouseleave="isOpen = false">
    <div 
      tabindex="0" 
      role="button" 
      class="input cursor-pointer w-48 overflow-hidden text-ellipsis whitespace-nowrap"
      :id="id"
    >
      <span :class="{ 'text-gray-400': !selectedLabel }">
        {{ selectedLabel || placeholder }}
      </span>
    </div>
    <ul 
      tabindex="-1" 
      class="dropdown-content menu bg-base-100 rounded-box z-[100] w-52 p-2 shadow-lg border border-gray-200"
    >
      <li v-if="selectModel !== ''" @click="selectOption('')">
        <a>Clear Selection</a>
      </li>
      <li v-for="option in options" :key="String(option.value)" @click="selectOption(option.value)">
        <a :class="{ 'bg-gray-200': selectModel === option.value }">
          {{ option.label }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
  id: string;
  title: string;
  placeholder: string;
  options: Array<{ value: string | boolean; label: string }>;
}>();

const selectModel = defineModel<string | boolean>();
const isOpen = ref(false);

const selectedLabel = computed(() => {
  if (selectModel.value === '' || selectModel.value === undefined) return '';
  const selected = props.options.find(opt => opt.value === selectModel.value);
  return selected?.label || '';
});

const selectOption = (value: string | boolean) => {
  selectModel.value = value;
  isOpen.value = false;
};
</script>
