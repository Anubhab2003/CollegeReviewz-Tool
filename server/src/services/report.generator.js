// services/report.generator.js
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const addPage = (doc) => doc.addPage();

export const generateAssessmentReport = ({
  studentProfile,
  signals,
  careers
}) => {
  const doc = new PDFDocument({ margin: 50 });
  const filePath = path.join(
    "reports",
    `career-report-${studentProfile.studentId}.pdf`
  );

  fs.mkdirSync("reports", { recursive: true });
  doc.pipe(fs.createWriteStream(filePath));

  // ─── COVER ───
  doc.fontSize(22).text("Career Assessment Handbook", { align: "center" });
  doc.moveDown(2);

  doc.fontSize(12)
    .text(`Student ID: ${studentProfile.studentId}`)
    .text(`Class: ${studentProfile.currentClass}`)
    .text(`Stream: ${studentProfile.stream}`)
    .text(`Family Budget: ${studentProfile.familyAnnualBudget}`)
    .text(`Loan Comfort: ${studentProfile.educationLoanComfort}`);

  addPage(doc);

  // ─── SIGNALS ───
  doc.fontSize(16).text("Aptitude Breakdown");
  doc.moveDown();

  Object.entries(signals).forEach(([k, v]) => {
    doc.text(`${k.toUpperCase()}: ${v}/100`);
  });

  // ─── CAREERS ───
  careers.forEach((career, i) => {
    addPage(doc);

    doc.fontSize(16).text(`${i + 1}. ${career.name}`);
    doc.moveDown();

    doc.text(`Tier: ${career.tier}`);
    doc.text(`Compatibility Score: ${career.compatibilityScore}%`);
    doc.moveDown();

    doc.text("Career Examples (India):");
    career.examplesIndia?.forEach(e => doc.text(`• ${e}`));

    doc.moveDown();
    doc.text("Required Exams:");
    career.exams?.forEach(e => doc.text(`• ${e}`));

    doc.moveDown();
    doc.text("Roadmap:");
    career.roadmap?.forEach((r, idx) =>
      doc.text(`${idx + 1}. ${r}`)
    );

    doc.moveDown();
    doc.text("Why Recommended:");
    career.whyRecommended?.forEach(r => doc.text(`• ${r}`));

    doc.moveDown();
    doc.text("Why Not Recommended:");
    career.whyNotRecommended?.forEach(r => doc.text(`• ${r}`));
  });

  // ─── CLOSING ───
  addPage(doc);
  doc.text(
    "Thank you for choosing our Career Assessment Service.\n\n" +
    "This report is a guide, not a restriction. Careers evolve, and so will you.\n\n" +
    "Use this handbook as a compass — not a cage."
  );

  doc.end();
  return filePath;
};
