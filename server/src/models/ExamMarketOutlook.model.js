import mongoose from "mongoose";

const ExamMarketOutlookSchema = new mongoose.Schema(
  {
    examId: {
      type: String,
      required: true,
      index: true,
      trim: true,
      uppercase: true, // Engg001, PG003, GVTEX-001
    },

    jobDemand: {
      type: String,
      required: true,
      enum: ["Low", "Medium", "High", "Very High", "Elite"],
    },

    fiveYearGrowth: {
      type: String,
      required: true,
      enum: ["Negative", "Stable", "Positive", "High", "Explosive"],
    },

    automationRisk: {
      type: String,
      required: true,
      enum: ["Very Low", "Low", "Medium", "High", "Very High"],
    },

    globalPortability: {
      type: String,
      required: true,
      enum: ["None", "Low", "Medium", "High", "Very High", "Maximum"],
    },

    regionalSaturation: {
      type: String,
      required: true,
      enum: ["Low", "Medium", "High", "Very High"],
    },

    lastReviewedYear: {
      type: Number,
      required: true,
      min: 2000,
      max: 2100,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
    versionKey: false,
  }
);

// Prevent duplicate outlook entries for the same exam
ExamMarketOutlookSchema.index({ examId: 1 }, { unique: true });

const ExamMarketOutlook = mongoose.model(
  "ExamMarketOutlook",
  ExamMarketOutlookSchema
);

export default ExamMarketOutlook;
