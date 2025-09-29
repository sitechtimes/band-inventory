<template>
  <div class="max-w-2xl mx-auto p-6">
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Add Instrument Manually</h2>
      <form @submit.prevent="submitInstrument" class="space-y-6">
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700 mb-2">
            Category <span class="text-red-500">*</span>
          </label>
          <input id="category" v-model="formData.category" type="text" required
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter category" />
        </div>
        <div>
          <label for="section" class="block text-sm font-medium text-gray-700 mb-2">
            Section <span class="text-red-500">*</span>
          </label>
          <input id="section" v-model="formData.section" type="text" required
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter section" />
        </div>
        <div>
          <label for="serial_model" class="block text-sm font-medium text-gray-700 mb-2">
            Serial/Model Number
          </label>
          <input id="serial_model" v-model.number="formData.serial_model" type="number"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter serial or model number" />
        </div>
        <div>
          <label for="case_number" class="block text-sm font-medium text-gray-700 mb-2">
            Case Number
          </label>
          <input id="case_number" v-model.number="formData.case_number" type="number"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter case number" />
        </div>
        <div>
          <label for="manufacturer" class="block text-sm font-medium text-gray-700 mb-2">
            Manufacturer <span class="text-red-500">*</span>
          </label>
          <input id="manufacturer" v-model="formData.manufacturer" type="text" required
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter manufacturer" />
        </div>
        <div>
          <label for="siths_id" class="block text-sm font-medium text-gray-700 mb-2">
            SITHS ID
          </label>
          <input id="siths_id" v-model.number="formData.siths_id" type="number"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter SITHS ID" />
        </div>
        <div>
          <label for="condition" class="block text-sm font-medium text-gray-700 mb-2">
            Condition
          </label>
          <select id="condition" v-model="formData.condition"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
            <option value="Needs Repair">Needs Repair</option>
          </select>
        </div>
        <div>
          <label for="year_purchased" class="block text-sm font-medium text-gray-700 mb-2">
            Year Purchased
          </label>
          <input id="year_purchased" v-model.number="formData.year_purchased" type="number" min="1900"
            :max="new Date().getFullYear()"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter year purchased" />
        </div>
        <div>
          <label for="price" class="block text-sm font-medium text-gray-700 mb-2">
            Price
          </label>
          <input id="price" v-model.number="formData.price" type="number"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder=" Enter price" />
        </div>
        <div>
          <label for="retired" class="block text-sm font-medium text-gray-700 mb-2">
            Retired?
          </label>
          <select id="condition" v-model="formData.retired"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="Retired">Retired</option>
            <option value="Active">Active</option>
          </select>
        </div>
        <div>
          <label for="barcode" class="block text-sm font-medium text-gray-700 mb-2">
            Barcode
          </label>
          <input id="barcode" v-model.number="formData.barcode" type="number"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter barcode number" />
        </div>
        <div>
          <label for="notes" class="block text-sm font-medium text-gray-700 mb-2">
            Notes <span class="text-red-500">*</span>
          </label>
          <input id="notes" v-model="formData.notes" type="text" required
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter notes" />
        </div>
        <div class="flex justify-end space-x-4">
          <button type="button" @click="resetForm"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500">
            Reset
          </button>
          <button type="submit" :disabled="isSubmitting"
            class="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
            <span v-if="isSubmitting">Adding Instrument...</span>
            <span v-else>Add Instrument</span>
          </button>
        </div>
      </form>
      <div v-if="message" class="mt-6 p-4 rounded-md"
        :class="messageType === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'">
        {{ message }}
      </div>
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
      retired: formData.retired,
      barcode: formData.barcode || 0,
      notes: formData.notes.trim()
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
