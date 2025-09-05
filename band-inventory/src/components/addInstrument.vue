<template>
  <div class="max-w-4xl mx-auto p-6 mt-6">
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Add Instruments</h1>
      <div class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold text-gray-700">Upload Excel File</h2>
        </div>
        <div
          class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
          <input type="file" ref="fileInput" @change="handleFileUpload" accept=".xlsx,.xls" class="hidden" />
          <div v-if="!selectedFile" @click="fileInput?.click()" class="cursor-pointer">
            <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p class="mt-2 text-sm text-gray-600">Click to upload Excel file</p>
            <p class="text-xs text-gray-500 mt-1">Supports .xlsx and .xls files</p>
          </div>

          <div v-else class="text-left">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <svg class="h-8 w-8 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="font-medium text-gray-900">{{ selectedFile.name }}</span>
              </div>
              <button @click="clearFile" class="text-red-500 hover:text-red-700 text-sm font-medium">
                Remove
              </button>
            </div>

            <div v-if="excelData.length > 0" class="space-y-4">
              <div class="flex items-center justify-between">
                <button @click="processExcelData" :disabled="isProcessing"
                  class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                  <span v-if="isProcessing">Processing...</span>
                  <span v-else>Upload to Database</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="message" class="mt-6 p-4 rounded-md"
        :class="messageType === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as XLSX from 'xlsx'
import { useInstrumentStore } from '@/stores/instrumentStore'

const instrumentStore = useInstrumentStore()

const fileInput = ref<HTMLInputElement>()
const selectedFile = ref<File | null>(null)
const excelData = ref<any[]>([])
const tableHeaders = ref<string[]>([])

const isProcessing = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file)
    return

  if (!file.name.match(/\.(xlsx|xls)$/)) {
    showMessage('Please select a valid Excel file (.xlsx or .xls)', 'error')
    return
  }

  selectedFile.value = file
  parseExcelFile(file)
}

const parseExcelFile = (file: File) => {
  const reader = new FileReader()

  reader.onload = (e) => {
    try {
      const data = new Uint8Array(e.target?.result as ArrayBuffer)
      const workbook = XLSX.read(data, { type: 'array' })
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
      const headers = jsonData[0] as string[]
      tableHeaders.value = headers

      const dataRows = jsonData.slice(1) as any[][]
      excelData.value = dataRows.map(row => {
        const obj: any = {}
        headers.forEach((header, index) => {
          obj[header] = row[index] || ''
        })
        return obj
      })

      showMessage(`Successfully parsed ${excelData.value.length} rows from Excel file`, 'success')
    } catch (error) {
      showMessage('Error parsing Excel file. Please ensure it\'s a valid Excel file.', 'error')
      console.error('Excel parsing error:', error)
    }
  }
  reader.readAsArrayBuffer(file)
}

const processExcelData = async () => {
  if (excelData.value.length === 0) return
  isProcessing.value = true
  message.value = ''
  try {
    const instruments = excelData.value.map(row => ({
      category: row.category || row.Category || '',
      section: row.section || row.Section || '',
      serial_model: parseInt(row.serial_model || row['Serial/Model'] || row['Serial Model'] || '0') || 0,
      case_number: parseInt(row.case_number || row['Case Number'] || row['CaseNumber'] || '0') || 0,
      manufacturer: row.manufacturer || row.Manufacturer || '',
      siths_id: parseInt(row.siths_id || row['SITHS ID'] || row['SITHS_ID'] || '0') || 0,
      assigned_to: row.assigned_to || row['Assigned To'] || row['AssignedTo'] || '',
      condition: row.condition || row.Condition || 'Good',
      year_purchased: parseInt(row.year_purchased || row['Year Purchased'] || row['YearPurchased'] || '0') || 0,
      barcode: parseInt(row.barcode || row.Barcode || '0') || 0
    }))

    const validInstruments = instruments.filter(instrument =>
      instrument.category &&
      instrument.section &&
      instrument.manufacturer
    )

    if (validInstruments.length === 0) {
      showMessage('No valid instruments found in Excel file. Please check your data format.', 'error')
      return
    }

    await instrumentStore.bulkUploadInstruments(validInstruments)

    showMessage(`Successfully uploaded ${validInstruments.length} instruments to the database!`, 'success')
    clearFile()

  } catch (error) {
    showMessage(`Error uploading instruments: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error')
    console.error('Upload error:', error)
  } finally {
    isProcessing.value = false
  }
}

const handleSuccess = (msg: string) => {
  showMessage(msg, 'success')
}
const handleError = (msg: string) => {
  showMessage(msg, 'error')
}

const clearFile = () => {
  selectedFile.value = null
  excelData.value = []
  tableHeaders.value = []
  if (fileInput.value) {
    fileInput.value.value = ''
  }
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
<style scoped></style>