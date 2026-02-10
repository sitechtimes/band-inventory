<template>
  <button
    @click="downloadTemplate"
    class="bg-grey-blue hover:cursor-pointer hover:bg-deep-blue text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2"
  >
    Download Excel Template
  </button>
</template>

<script setup lang="ts">
import * as ExcelJS from "exceljs";

const downloadTemplate = async () => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Music");
    worksheet.columns = [
      { header: "Title", key: "title", width: 25 },
      { header: "Category", key: "category", width: 18 },
      { header: "Serial ID", key: "serial_id", width: 15 },
      { header: "Scanned", key: "scanned", width: 10 },
      { header: "Composer", key: "composer", width: 20 },
      { header: "Arranger", key: "arranger", width: 20 },
      { header: "Level", key: "level", width: 12 },
      { header: "NYSSMA Level", key: "NYSSMA_level", width: 15 },
      { header: "Notes", key: "notes", width: 30 },
    ];
    worksheet.getRow(1).font = { bold: true, size: 12 };
    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFD3E3F4" },
    };
    worksheet.getRow(1).alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    worksheet.addRow({
      title: "March of the Eagles",
      category: "March",
      serial_id: "M-2002",
      scanned: "No",
      composer: "John Philip Sousa",
      arranger: "",
      level: "E",
      NYSSMA_level: "III",
      notes: "",
    });
    worksheet.addRow([]);
    const noteRow = worksheet.addRow([
      "Notes: The first row is an example. Please remove it and add your own data. DELETE THIS NOTE BEFORE UPLOADING PLEASE.",
    ]);
    noteRow.font = { italic: true, bold: true };
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "music_upload_template.xlsx";
    link.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Template download error:", error);
  }
};
</script>

