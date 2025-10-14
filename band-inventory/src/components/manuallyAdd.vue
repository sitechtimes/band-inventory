<template>
  <div class="m-4">
    <h2 class="text-xl font-semibold text-gray-700">Add Single Instrument Manually</h2>
    <form @submit.prevent="submitInstrument" class="shadow-sm rounded-sm gap-x-4 mt-4">
      <div class="grid @max-md:grid-rows-2 md:grid-cols-2">
        <div class="flex flex-col m-2 md:ml-4">
          <label for="category">Category <span class="text-red-500">*</span></label>
          <input id="category" v-model="formData.category" type="text" required
            class="input w-7/8 focus:border-green" placeholder="Enter category" />
        </div>
        <div class="flex flex-col m-2 md:ml-4">
          <label for="section">Section <span class="text-red-500">*</span></label>
          <input id="section" v-model="formData.section" type="text" required
            class="input w-7/8 focus:border-green" placeholder="Enter section" />
        </div>
        <div class="flex flex-col m-2 md:ml-4">
          <label for="serial_model">Serial/Model Number</label>
          <input id="serial_model" v-model.number="formData.serial_model" type="number"
            class="input w-7/8 focus:border-green" placeholder="Enter serial or model number" />
        </div>
        <div class="flex flex-col m-2 md:ml-4">
          <label for="case_number">Case Number</label>
          <input id="case_number" v-model.number="formData.case_number" type="number"
            class="input w-7/8 focus:border-green" placeholder="Enter case number" />
        </div>
        <div class="flex flex-col m-2 md:ml-4">
          <label for="manufacturer">Manufacturer <span class="text-red-500">*</span></label>
          <input id="manufacturer" v-model="formData.manufacturer" type="text" required
            class="input w-7/8 focus:border-green" placeholder="Enter manufacturer" />
        </div>
        <div class="flex flex-col m-2 md:ml-4">
          <label for="siths_id">SITHS ID</label>
          <input id="siths_id" v-model.number="formData.siths_id" type="number"
            class="input w-7/8 focus:border-green" placeholder="Enter SITHS ID" />
        </div>
        <div class="flex flex-col m-2 md:ml-4">
          <label for="condition">Condition</label>
          <select id="condition" v-model="formData.condition" class="input w-7/8 focus:border-green">
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
            <option value="Needs Repair">Needs Repair</option>
          </select>
        </div>
        <div class="flex flex-col m-2 md:ml-4">
          <label for="year_purchased">Year Purchased</label>
          <input id="year_purchased" v-model.number="formData.year_purchased" type="number" min="1900"
            :max="new Date().getFullYear()" class="input w-7/8 focus:border-green"
            placeholder="Enter year purchased" />
        </div>
        <div class="flex flex-col m-2 md:ml-4">
          <label for="price">Price</label>
          <input id="price" v-model.number="formData.price" type="number"
            class="input w-7/8 focus:border-green" placeholder="Enter price" />
        </div>
        <div class="flex flex-col m-2 md:ml-4">
          <label for="retired">Retired?</label>
          <select id="retired" v-model="formData.retired" class="input w-7/8 focus:border-green">
            <option value="Retired">Retired</option>
            <option value="Active">Active</option>
          </select>
        </div>
        <div class="flex flex-col m-2 md:ml-4">
          <label for="barcode">Barcode</label>
          <input id="barcode" v-model.number="formData.barcode" type="number"
            class="input w-7/8 focus:border-green" placeholder="Enter barcode number" />
        </div>
        <div class="flex flex-col m-2 md:ml-4">
          <label for="notes">Notes <span class="text-red-500">*</span></label>
          <input id="notes" v-model="formData.notes" type="text" required
            class="input w-7/8 focus:border-green" placeholder="Enter notes" />
        </div>
      </div>
      <div>
        <button type="submit" :disabled="isSubmitting"
          class="btn mx-2 md:ml-4 my-4 align-self-center bg-deep-green hover:bg-deep-green text-white">
          <span v-if="isSubmitting">Adding Instrument...</span>
          <span v-else>Add Instrument</span>
        </button>
        <button type="button" @click="resetForm"
          class="btn bg-white border-none hover:shadow-none hover:underline">
          Reset
        </button>
      </div>
    </form>
    <div v-if="message" class="mt-6 mx-2 md:ml-4 p-4 rounded-md"
      :class="messageType === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'">
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useInstrumentStore } from '@/stores/instrumentStore'

const instrumentStore = useInstrumentStore()

const formData = reactive({
  category: '',
  section: '',
  serial_model: 0,
  case_number: 0,
  manufacturer: '',
  siths_id: 0,
  condition: 'Good',
  year_purchased: 0,
  price: 0,
  retired: 'Active',
  barcode: 0,
  notes: ''
})

const isSubmitting = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')

const submitInstrument = async () => {
  isSubmitting.value = true
  message.value = ''

  try {
    if (!formData.category || !formData.section || !formData.manufacturer) {
      showMessage('Please fill in all required fields (Category, Section, Manufacturer)', 'error')
      return
    }

    const instrumentData = {
      category: formData.category.trim(),
      section: formData.section.trim(),
      serial_model: formData.serial_model || 0,
      case_number: formData.case_number || 0,
      manufacturer: formData.manufacturer.trim(),
      siths_id: formData.siths_id || 0,
      condition: formData.condition,
      year_purchased: formData.year_purchased || 0,
      price: formData.price || 0,
      retired: formData.retired === 'Retired',
      barcode: formData.barcode || 0,
      notes: formData.notes.trim(),
      location: '',
      description: '',
      assignments: [],
      repair_needed: '',
      repair_date: new Date(),
      repair_notes: '',
      requested_by: '',
      assigned_to: '',
      assigned_date: new Date(),
      return_date: undefined,
      open: false
    }

    await instrumentStore.addSingleInstrument(instrumentData)

    showMessage('Instrument added successfully', 'success')
    resetForm()

  } catch (error) {
    showMessage(`Error adding instrument: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error')
    console.error('Add instrument error:', error)
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  Object.assign(formData, {
    category: '',
    section: '',
    serial_model: 0,
    case_number: 0,
    manufacturer: '',
    siths_id: 0,
    condition: 'Good',
    year_purchased: 0,
    price: 0,
    retired: 'Active',
    barcode: 0,
    notes: ''
  })
  message.value = ''
}

const showMessage = (msg: string, type: 'success' | 'error') => {
  message.value = msg
  messageType.value = type
  if (type === 'success') {
    setTimeout(() => {
      if (message.value === msg) {
        message.value = ''
      }
    }, 5000)
  }
}
</script>
