<template>
  <button @click="exportToExcel"
    class="btn ml-4 bg-deep-green hover:bg-emerald-900 text-white px-4 py-2 rounded-md flex items-center gap-2">
    Export Music
  </button>
</template>

<script setup lang="ts">
import * as ExcelJS from 'exceljs'
import { useMusicStore } from '@/stores/musicStore'
import { storeToRefs } from 'pinia'

const musicStore = useMusicStore()
const { shownMusic } = storeToRefs(musicStore)
const exportToExcel = async () => {
  try {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Music')

    worksheet.columns = [
      { header: 'Title', key: 'title', width: 30 },
      { header: 'Category', key: 'category', width: 15 },
      { header: 'Serial ID', key: 'serial_id', width: 12 },
      { header: 'Scanned', key: 'scanned', width: 12 },
      { header: 'Composer', key: 'composer', width: 20 },
      { header: 'Arranger', key: 'arranger', width: 20 },
      { header: 'Level', key: 'level', width: 12 },
      { header: 'NYSSMA Level', key: 'NYSSMA_level', width: 15 },
      { header: 'Notes', key: 'notes', width: 35 }
    ]
    worksheet.getRow(1).font = { bold: true, size: 12}
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' }

    shownMusic.value.forEach((music) => {
      worksheet.addRow({
        title: music.title || '',
        category: music.category || '',
        serial_id: music.serial_id || '',
        scanned: music.scanned ? 'Yes' : 'No',
        composer: music.composer || '',
        arranger: music.arranger || '',
        level: music.level || '',
        NYSSMA_level: music.NYSSMA_level || '',
        notes: music.notes || ''
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
    link.download = `music_library_export_${date}.xlsx`
    link.click()
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Export error:', error)
  }
}
</script>
