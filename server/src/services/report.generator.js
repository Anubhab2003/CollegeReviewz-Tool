import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generateAssessmentReport = ({
  studentProfile,
  careers,
  backups
}) => {
  const doc = new PDFDocument();
  const fileName = `career-report-${studentProfile.studentId}.pdf`;
  const filePath = path.join("reports", fileName);

  fs.mkdirSync("reports", { recursive: true });
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text("Career Assessment Report", { align: "center" });
  doc.moveDown();

  doc.fontSize(12).text(`Student ID: ${studentProfile.studentId}`);
  doc.text(`Class: ${studentProfile.currentClass}`);
  doc.text(`Stream: ${studentProfile.stream}`);
  doc.text(`Family Budget: ${studentProfile.familyAnnualBudget}`);
  doc.moveDown();

  doc.fontSize(14).text("Recommended Career Paths");
  doc.moveDown(0.5);

  careers.forEach((career, i) => {
    doc.text(
      `${i + 1}. ${career.name} (${career.tier})`,
      { indent: 10 }
    );
    career.explanation.forEach((line) =>
      doc.fontSize(10).text(`• ${line}`, { indent: 20 })
    );
    doc.moveDown(0.3);
  });

  if (backups.length > 0) {
    doc.moveDown();
    doc.fontSize(14).text("Backup Options");
    backups.forEach((b, i) =>
      doc.fontSize(11).text(`${i + 1}. ${b}`, { indent: 10 })
    );
  }

  doc.moveDown();
  doc
    .fontSize(10)
    .text(
      "This report is guidance-based and considers aptitude, discipline, risk, and finance.",
      { align: "center" }
    );

  doc.end();
  return filePath;
};
