// services/report.generator.js
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

/* ───────────────── UTIL ───────────────── */

const safe = (v) => (Array.isArray(v) ? v : []);

const newPage = (doc) => {
  doc.addPage();
  doc.moveDown();
};

/* ───────────────── FONT SETUP ───────────────── */

const FONT_PATH = path.join(
  process.cwd(),
  "src/assets/fonts/NotoSans-Regular.ttf"
);

/* ───────────────── MAIN GENERATOR ───────────────── */

export const generateAssessmentReport = ({
  studentProfile,
  signals,
  careers
}) => {
  const doc = new PDFDocument({ size: "A4", margin: 50 });

  const filePath = path.join(
    "reports",
    `career-report-${studentProfile.studentId}.pdf`
  );

  fs.mkdirSync("reports", { recursive: true });
  doc.pipe(fs.createWriteStream(filePath));

  /* REGISTER & APPLY FONT (🔥 REQUIRED) */
  doc.registerFont("Noto", FONT_PATH);
  doc.font("Noto");

  /* ───────────────── HEADER ───────────────── */

  doc.fontSize(20).text("Career Assessment Handbook", {
    align: "center"
  });

  doc.moveDown(2);

  doc.fontSize(12)
    .text(`Student ID: ${studentProfile.studentId}`)
    .text(`Class: ${studentProfile.currentClass}`)
    .text(`Stream: ${studentProfile.stream}`)
    .text(`Family Budget: ${studentProfile.familyAnnualBudget}`);

  /* ───────────────── APTITUDE ───────────────── */

  newPage(doc);
  doc.fontSize(14).text("Aptitude Breakdown", { underline: true });
  doc.moveDown();

  Object.entries(signals).forEach(([k, v]) => {
    doc.text(`${k.toUpperCase()}: ${v}/100`);
  });

  /* ───────────────── CAREERS ───────────────── */

  careers.forEach((career, index) => {
    newPage(doc);

    doc.fontSize(16).text(
      `${index + 1}. ${career.name}`,
      { underline: true }
    );

    doc.moveDown(0.5);

    doc.fontSize(12)
      .text(`Tier: ${career.tier}`)
      .text(`Compatibility Score: ${career.compatibilityScore}%`);

    doc.moveDown();
    doc.text("Career Options in India:");
    safe(career.roles).forEach((r) => doc.text(`• ${r}`));

    if (safe(career.rolesAbroad).length) {
      doc.moveDown();
      doc.text("Career Options Abroad:");
      safe(career.rolesAbroad).forEach((r) => doc.text(`• ${r}`));
    }

    if (safe(career.bestInstitutesIndia).length) {
      doc.moveDown();
      doc.text("Top Institutes (India):");
      safe(career.bestInstitutesIndia).forEach((i) => doc.text(`• ${i}`));
    }

    if (safe(career.bestInstitutesAbroad).length) {
      doc.moveDown();
      doc.text("Top Institutes (Abroad):");
      safe(career.bestInstitutesAbroad).forEach((i) => doc.text(`• ${i}`));
    }

    doc.moveDown();

    /* FEES — FIXED ₹ */
    if (career.feesIndia) {
      doc.text(`Estimated Fees (India): ₹${career.feesIndia}`);
    } else {
      doc.text(`Estimated Fees (India): Varies`);
    }

    if (career.feesAbroad) {
      doc.text(`Estimated Fees (Abroad): ${career.feesAbroad}`);
    }

    /* SALARY — ₹ WILL RENDER CORRECTLY */
    if (career.salaryIndia) {
      doc.moveDown();
      doc.text(`Average Salary (India): ${career.salaryIndia}`);
    }

    if (career.salaryAbroad) {
      doc.text(`Average Salary (Abroad): ${career.salaryAbroad}`);
    }

    if (safe(career.roadmap).length) {
      doc.moveDown();
      doc.text("Recommended Roadmap:");
      safe(career.roadmap).forEach((s, i) =>
        doc.text(`${i + 1}. ${s}`)
      );
    }

    if (safe(career.whyRecommended).length) {
      doc.moveDown();
      doc.text("Why Recommended:");
      safe(career.whyRecommended).forEach((r) =>
        doc.text(`• ${r}`)
      );
    }

    if (safe(career.whyNotRecommended).length) {
      doc.moveDown();
      doc.text("Why This May NOT Be Ideal:");
      safe(career.whyNotRecommended).forEach((r) =>
        doc.text(`• ${r}`)
      );
    }
  });

  /* ───────────────── FINAL NOTE ───────────────── */

  newPage(doc);
  doc.fontSize(14).text("Final Note", { underline: true });
  doc.moveDown();

  doc.fontSize(11).text(
    "This handbook is a decision-support tool — not a verdict.\n" +
    "Careers evolve with effort, exposure, and adaptability.\n\n" +
    "Use this report as a compass — not a cage."
  );

  doc.end();
  return filePath;
};
