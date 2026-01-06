<template>
  <button @click="exportToExcel"
    class="btn ml-4 bg-deep-green hover:bg-emerald-900 text-white px-4 py-2 rounded-md flex items-center gap-2">
    Export Instruments
  </button>
</template>

<script setup lang="ts">
import * as ExcelJS from 'exceljs'
import { useInstrumentStore } from '@/stores/instrumentStore'
import { storeToRefs } from 'pinia'

const instrumentStore = useInstrumentStore()
const { showedInstruments } = storeToRefs(instrumentStore)

const exportToExcel = async () => {
  try {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Instruments')

    worksheet.columns = [
      { header: 'Category', key: 'category', width: 15 },
      { header: 'Section', key: 'section', width: 15 },
      { header: 'Serial Model', key: 'serial_model', width: 15 },
      { header: 'Case Number', key: 'case_number', width: 15 },
      { header: 'Manufacturer', key: 'manufacturer', width: 20 },
      { header: 'SI Tech HS ID', key: 'siths_id', width: 15 },
      { header: 'Condition', key: 'condition', width: 15 },
      { header: 'Year Purchased', key: 'year_purchased', width: 15 },
      { header: 'Price', key: 'price', width: 12 },
      { header: 'Barcode', key: 'barcode', width: 15 },
      { header: 'Location', key: 'location', width: 20 },
      { header: 'Description', key: 'description', width: 30 },
      { header: 'Notes', key: 'notes', width: 30 },
      { header: 'Retired', key: 'retired', width: 10 }
    ]
    worksheet.getRow(1).font = { bold: true, size: 12 }
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' }
    showedInstruments.value.forEach((instrument) => {
      worksheet.addRow({
        category: instrument.category || '',
        section: instrument.section || '',
        serial_model: instrument.serial_model || '',
        case_number: instrument.case_number || '',
        manufacturer: instrument.manufacturer || '',
        siths_id: instrument.siths_id || '',
        condition: instrument.condition || '',
        year_purchased: instrument.year_purchased || '',
        price: instrument.price || '',
        barcode: instrument.barcode || '',
        location: instrument.location || '',
        description: instrument.description || '',
        notes: instrument.notes || '',
        retired: instrument.retired ? 'Yes' : 'No'
      })
    })
    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    const date = new Date().toISOString().split('T')[0]
    link.download = `instruments_export_${date}.xlsx`
    link.click()
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Export error:', error)
  }
}
</script>
