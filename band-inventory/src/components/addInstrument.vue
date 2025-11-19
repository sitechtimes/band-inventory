<template>
  <div class="max-w-4xl mx-auto p-6 mt-6">
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Add Instruments</h1>
      <div class="mb-8">
        <div class="flex space-x-4 mb-6">
          <button
            class="px-4 py-2 text-sm font-medium rounded-sm transition-colors"
            @click="activeTab = 'excel'"
            :class="
              activeTab === 'excel'
                ? 'bg-grey-blue text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            "
          >
            Upload Excel File
          </button>
          <button
            class="px-4 py-2 text-sm font-medium rounded-sm transition-colors"
            @click="activeTab = 'manual'"
            :class="
              activeTab === 'manual'
                ? 'bg-grey-blue text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            "
          >
            Add Manually
          </button>
        </div>
      </div>
      <div v-if="activeTab === 'excel'" class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold text-gray-700">Upload Excel File of Instruments</h2>
          <templateDownload />
        </div>
        <div
          class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-grey-blue transition-colors"
        >
          <input
            type="file"
            ref="fileInput"
            @change="handleFileUpload"
            accept=".xlsx,.xls"
            class="hidden"
          />
          <div
            v-if="!selectedFile"
            @click="fileInput?.click()"
            class="cursor-pointer"
          >
            <img
              src="/upload.png"
              alt="Upload"
              class="mx-auto h-12 w-12 text-gray-400"
            />
            <p class="mt-2 text-sm text-gray-600">Click to upload Excel file</p>
            <p class="text-xs text-gray-500 mt-1">
              Supports .xlsx and .xls files
            </p>
          </div>

          <div v-else class="text-left">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <p class="text-green font-bold text-xl mr-4">✓</p>
                <span class="font-medium text-gray-900">{{
                  selectedFile.name
                }}</span>
              </div>
              <button
                @click="clearFile"
                class="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Remove
              </button>
            </div>

            <div v-if="excelData.length > 0" class="space-y-4">
              <div class="flex items-center justify-between">
                <button
                  @click="processExcelData"
                  :disabled="isProcessing"
                  class="bg-deep-green text-white px-4 py-2 rounded-md hover:bg-emerald-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span v-if="isProcessing">Processing...</span>
                  <span v-else>Upload to Database</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="activeTab === 'manual'">
        <manuallyAdd />
      </div>
      <div
        v-if="message && activeTab === 'excel'"
        class="mt-6 p-4 rounded-md"
        :class="
          messageType === 'success'
            ? 'bg-green-50 text-green-800 border border-green-200'
            : 'bg-red-50 text-red-800 border border-red-200'
        "
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as ExcelJS from 'exceljs'
import { useInstrumentStore } from '@/stores/instrumentStore'
import manuallyAdd from './manuallyAdd.vue'
import templateDownload from './templateDownload.vue'

const instrumentStore = useInstrumentStore();

const activeTab = ref<"excel" | "manual">("excel");

const fileInput = ref<HTMLInputElement>();
const selectedFile = ref<File | null>(null);
const excelData = ref<any[]>([]);
const tableHeaders = ref<string[]>([]);

const isProcessing = ref(false);
const message = ref("");
const messageType = ref<"success" | "error">("success");

const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;

  if (!file.name.match(/\.(xlsx|xls)$/)) {
    showMessage("Please select a valid Excel file (.xlsx or .xls)", "error");
    return;
  }

  selectedFile.value = file;
  await parseExcelFile(file);
};

const parseExcelFile = async (file: File) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const arrayBuffer = await file.arrayBuffer();
    await workbook.xlsx.load(arrayBuffer);

    const worksheet = workbook.worksheets[0];
    if (!worksheet) {
      showMessage("No worksheet found in Excel file", "error");
      return;
    }

    const rows: any[][] = [];
    worksheet.eachRow((row) => {
      const rowData: any[] = [];
      row.eachCell((cell, colNumber) => {
        rowData[colNumber - 1] = cell.value || "";
      });
      rows.push(rowData);
    });

    if (rows.length === 0) {
      showMessage("No data found in Excel file", "error");
      return;
    }

    const headers = rows[0] as string[];
    tableHeaders.value = headers;

    const dataRows = rows.slice(1);
    excelData.value = dataRows.map((row) => {
      const obj: any = {};
      headers.forEach((header, index) => {
        obj[header] = row[index] || "";
      });
      return obj;
    });

    showMessage(
      `Successfully parsed ${excelData.value.length} rows from Excel file`,
      "success",
    );
  } catch (error) {
    showMessage(
      "Error parsing Excel file. Please ensure it is a valid Excel file.",
      "error",
    );
    console.error("Excel parsing error:", error);
  }
};

const processExcelData = async () => {
  if (excelData.value.length === 0) return;
  isProcessing.value = true;
  message.value = "";
  try {
    const instruments = excelData.value.map(row => ({
      category: row.category || row.Category || '',
      section: row.section || row.Section || '',
      serial_model: parseInt(row.serial_model || row['Serial/Model'] || row['Serial Model'] || '0') || 0,
      case_number: parseInt(row.case_number || row['Case Number'] || row['CaseNumber'] || '0') || 0,
      manufacturer: row.manufacturer || row.Manufacturer || '',
      siths_id: parseInt(row.siths_id || row['SITHS ID'] || row['SITHS_ID'] || '0') || 0,
      condition: row.condition || row.Condition || 'Good',
      year_purchased: parseInt(row.year_purchased || row['Year Purchased'] || row['YearPurchased'] || '0') || 0,
      price: parseInt(row.price || row['Price'] || row['Price'] || '0') || 0,
      retired: (row.retired || row.Retired || 'Active') === 'Retired',
      barcode: parseInt(row.barcode || row.Barcode || '0') || 0,
      notes: row.notes || row.Notes || '',
      location: row.location || row.Location || '',
      description: row.description || row.Description || '',
      assignments: []
    }))

    const validInstruments = instruments.filter(
      (instrument) =>
        instrument.category && instrument.section && instrument.manufacturer,
    );

    if (validInstruments.length === 0) {
      showMessage(
        "No valid instruments found in Excel file. Please check your data format.",
        "error",
      );
      return;
    }

    await instrumentStore.bulkUploadInstruments(validInstruments as any)

    showMessage(`Successfully uploaded ${validInstruments.length} instruments to the database!`, 'success')
    clearFile()

    showMessage(
      `Successfully uploaded ${validInstruments.length} instruments to the database!`,
      "success",
    );
    clearFile();
  } catch (error) {
    showMessage(
      `Error uploading instruments: ${error instanceof Error ? error.message : "Unknown error"}`,
      "error",
    );
    console.error("Upload error:", error);
  } finally {
    isProcessing.value = false;
  }
};

const clearFile = () => {
  selectedFile.value = null;
  excelData.value = [];
  tableHeaders.value = [];
  if (fileInput.value) {
    fileInput.value.value = "";
  }
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
<style scoped></style>
