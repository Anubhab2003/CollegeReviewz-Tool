import mongoose from "mongoose";

const careerRiskProfileSchema = new mongoose.Schema(
  {
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExamCore",
      required: true,
      unique: true,
      index: true,
    },

    careerEntryType: {
      type: String,
      enum: ["Direct", "Indirect", "Direct/Indirect"],
      required: true,
    },

    degreeDependency: {
      type: String,
      enum: ["None", "Optional", "Mandatory"],
      required: true,
    },

    careerFlexibility: {
      type: String,
      enum: ["Very Low", "Low", "Medium", "High", "Very High"],
      required: true,
    },

    retryPenalty: {
      type: String,
      enum: ["Zero", "Low", "Medium", "High", "Extreme"],
      required: true,
    },

    failureCost: {
      type: String,
      enum: ["Very Low", "Low", "Medium", "High", "Extreme"],
      required: true,
    },

    avgTimeToFirstIncomeYears: {
      type: Number,
      required: true,
    },

    avgTimeToCareerStabilityYears: {
      type: Number,
      required: true,
    },

    typicalCareerCeiling: {
      type: String,
      // e.g. "Very High", "Limitless", "Cabinet Secretary"
      required: true,
    },

    incomeVariance: {
      type: String,
      enum: ["Low", "Medium", "High", "Very High", "Extreme"],
      required: true,
    },

    stressLevel: {
      type: String,
      enum: ["Low", "Medium", "High", "Very High", "Extreme"],
      required: true,
    },

    dropoutProbabilityPercent: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },

    burnoutRisk: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      required: true,
    },

    backupCareerAvailability: {
      type: String,
      enum: ["None", "Limited", "Multiple"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("CareerRiskProfile", careerRiskProfileSchema);
