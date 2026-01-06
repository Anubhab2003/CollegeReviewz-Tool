import mongoose from "mongoose";

const studentProfileSchema = new mongoose.Schema(
  {
    // ─────────────────────────────
    // BASIC IDENTITY
    // ─────────────────────────────
    studentId: {
      type: String,
      required: true,
      index: true,
      unique: true
    },

    age: {
      type: Number,
      required: true,
      min: 12,
      max: 30
    },

    currentClass: {
      type: String,
      enum: [
        "Class 9",
        "Class 10",
        "Class 11",
        "Class 12",
        "Dropper",
        "Undergraduate"
      ],
      required: true
    },

    stream: {
      type: String,
      enum: ["Science", "Commerce", "Arts", "Undecided"],
      required: true
    },

    // ─────────────────────────────
    // FINANCIAL REALITY
    // ─────────────────────────────
    familyAnnualBudget: {
      type: String,
      enum: [
        "< 1 Lakh",
        "1–3 Lakh",
        "3–6 Lakh",
        "6–10 Lakh",
        "> 10 Lakh"
      ],
      required: true
    },

    educationLoanComfort: {
      type: String,
      enum: ["No", "Maybe", "Yes"],
      required: true
    },

    coachingAffordability: {
      type: Boolean,
      required: true
    },

    // ─────────────────────────────
    // ASSESSMENT SIGNAL OUTPUTS (0–100)
    // ─────────────────────────────
    assessmentSignals: {
      cognitive: { type: Number, min: 0, max: 100 },
      numeracy: { type: Number, min: 0, max: 100 },
      academic: { type: Number, min: 0, max: 100 },
      verbal: { type: Number, min: 0, max: 100 },
      interest: { type: Number, min: 0, max: 100 },
      discipline: { type: Number, min: 0, max: 100 },
      risk: { type: Number, min: 0, max: 100 },
      finance: { type: Number, min: 0, max: 100 }
    },

    globalScore: {
      type: Number,
      min: 0,
      max: 100
    },

    assessmentVersion: {
      type: String,
      default: "v2.0"
    }
  },
  { timestamps: true }
);

export default mongoose.model("StudentProfile", studentProfileSchema);
