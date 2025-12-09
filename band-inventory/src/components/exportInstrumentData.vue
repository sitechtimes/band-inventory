<template>
  <button @click="downloadTemplate"
    class="bg-grey-blue hover:cursor-pointer ml-4 hover:bg-deep-blue text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2">
    Download Instrument Data
  </button>
</template>

<script setup lang="ts">
import * as ExcelJS from 'exceljs'

const downloadTemplate = async () => {
  try {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Instruments')
    worksheet.columns = [
      { header: 'Category', key: 'category', width: 15 },
      { header: 'Section', key: 'section', width: 15 },
      { header: 'Serial Model', key: 'serial_model', width: 15 },
      { header: 'Case Number', key: 'case_number', width: 15 },
      { header: 'Manufacturer', key: 'manufacturer', width: 20 },
      { header: 'SITHS ID', key: 'siths_id', width: 15 },
      { header: 'Condition', key: 'condition', width: 15 },
      { header: 'Year Purchased', key: 'year_purchased', width: 15 },
      { header: 'Price', key: 'price', width: 15 },
      { header: 'Retired', key: 'retired', width: 15 },
      { header: 'Barcode', key: 'barcode', width: 15 },
      { header: 'Location', key: 'location', width: 20 },
      { header: 'Description', key: 'description', width: 30 },
      { header: 'Notes', key: 'notes', width: 30 }
    ]
    worksheet.getRow(1).font = { bold: true, size: 12 }
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFD3E3F4' }
    }
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.addRow({
      category: 'Brass',
      section: 'Trumpet',
      serial_model: '12345',
      case_number: '1',
      manufacturer: 'Bach',
      siths_id: '1001',
      condition: 'Good',
      year_purchased: '2023',
      price: '500',
      retired: 'Active',
      barcode: '100001',
      location: 'Band Room',
      description: 'Student trumpet', 
      notes: 'Needs mouthpiece'
    })
    worksheet.addRow({
      category: 'Woodwind',
      section: 'Clarinet',
      serial_model: '67890',
      case_number: '2',
      manufacturer: 'Yamaha',
      siths_id: '1002',
      condition: 'Excellent',
      year_purchased: '2024',
      price: '600',
      retired: 'Active',
      barcode: '100002',
      location: 'Storage',
      description: 'Professional clarinet',
      notes: 'hallo hallo'
    })
    worksheet.addRow([])
    const noteRow = worksheet.addRow(['Notes: The first two rows are examples. Please remove them and add your own data. Set assignment to null for now and then add any assignments on the instrument details page. DELETE THIS NOTE BEFORE UPLOADING PLEASE.'])
    noteRow.font = { italic: true, bold: true }
    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'instrument_upload_template.xlsx'
    link.click()
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Template download error:', error)
  }
}
</script>
