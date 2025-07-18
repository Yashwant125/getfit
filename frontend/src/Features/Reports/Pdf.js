// src/Reports/Pdf.js
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Captures any given HTML element and exports it as a PDF.
 * @param {HTMLElement} element - DOM element reference to export
 * @param {string} filename - PDF file name (default = "download.pdf")
 */
export const exportPageAsPDF = async (element, filename = "download.pdf") => {
  try {
    const canvas = await html2canvas(element, {
      useCORS: true,
      allowTaint: true,
      scale: 2, // sharper quality
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(filename);
  } catch (error) {
    console.error("PDF export failed:", error);
  }
};
