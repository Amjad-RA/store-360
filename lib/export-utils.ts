"use client"

import html2canvas from "html2canvas-pro"
import jsPDF from "jspdf"

export async function exportDashboardAsPdf(elementId: string) {
  const element = document.getElementById(elementId)
  if (!element) return

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      onclone: (clonedDoc) => {
        // Fix any styling issues in the cloned document before rendering
        const tables = clonedDoc.querySelectorAll(".overflow-auto")
        tables.forEach((table) => {
          // Remove height constraints for export
          ;(table as HTMLElement).style.height = "auto"
          ;(table as HTMLElement).style.maxHeight = "none"
          ;(table as HTMLElement).style.overflow = "visible"
        })
      },
    })

    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    const imgWidth = 210 // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
    pdf.save("dashboard-export.pdf")
  } catch (error) {
    console.error("Error exporting as PDF:", error)
    alert("Failed to export as PDF. Please try again.")
  }
}

export async function exportDashboardAsPng(elementId: string) {
  const element = document.getElementById(elementId)
  if (!element) return

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false, // Use theme background color
      onclone: (clonedDoc) => {
        // Fix any styling issues in the cloned document before rendering
        const tables = clonedDoc.querySelectorAll(".overflow-auto")
        tables.forEach((table) => {
          // Remove height constraints for export
          ;(table as HTMLElement).style.height = "auto"
          ;(table as HTMLElement).style.maxHeight = "none"
          ;(table as HTMLElement).style.overflow = "visible"
        })
      },
    })

    const link = document.createElement("a")
    link.download = "dashboard-export.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
  } catch (error) {
    console.error("Error exporting as PNG:", error)
    alert("Failed to export as PNG. Please try again.")
  }
}

export async function exportWidgetAsPdf(elementId: string) {
  const element = document.getElementById(elementId)
  if (!element) return

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      onclone: (clonedDoc) => {
        // Fix any styling issues in the cloned document before rendering
        const tables = clonedDoc.querySelectorAll(".overflow-auto")
        tables.forEach((table) => {
          // Remove height constraints for export
          ;(table as HTMLElement).style.height = "auto"
          ;(table as HTMLElement).style.maxHeight = "none"
          ;(table as HTMLElement).style.overflow = "visible"
        })
      },
    })

    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a5",
    })

    const imgWidth = 210 // A5 width in mm (landscape)
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
    pdf.save("widget-export.pdf")
  } catch (error) {
    console.error("Error exporting as PDF:", error)
    alert("Failed to export as PDF. Please try again.")
  }
}

export async function exportWidgetAsPng(elementId: string) {
  const element = document.getElementById(elementId)
  if (!element) return

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      onclone: (clonedDoc) => {
        // Fix any styling issues in the cloned document before rendering
        const tables = clonedDoc.querySelectorAll(".overflow-auto")
        tables.forEach((table) => {
          // Remove height constraints for export
          ;(table as HTMLElement).style.height = "auto"
          ;(table as HTMLElement).style.maxHeight = "none"
          ;(table as HTMLElement).style.overflow = "visible"
        })
      },
    })

    const link = document.createElement("a")
    link.download = "widget-export.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
  } catch (error) {
    console.error("Error exporting as PNG:", error)
    alert("Failed to export as PNG. Please try again.")
  }
}