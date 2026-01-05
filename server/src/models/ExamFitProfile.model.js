import mongoose from "mongoose";

const examFitProfileSchema = new mongoose.Schema(
  {
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExamCore",
      required: true,
      unique: true,
      index: true,
    },

    // 1–5 scale (higher = more required)
    riskTolerance: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },

    financialLoad: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },

    familyDependency: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },

    languageDependency: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },

    coachingDependency: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },

    timeIsolation: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },

    mentalResilience: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },

    emotionalStability: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },

    scaleDescription: {
      type: String,
      default: "0 = none, 5 = extreme requirement",
    },
  },
  { timestamps: true }
);

export default mongoose.model("ExamFitProfile", examFitProfileSchema);
