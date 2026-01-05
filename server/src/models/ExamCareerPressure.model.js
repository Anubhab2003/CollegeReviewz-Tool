import mongoose from "mongoose";

const ExamCareerPressureSchema = new mongoose.Schema(
  {
    examId: {
      type: String,
      required: true,
      index: true,
      trim: true,
      uppercase: true, // ENGG001, PG003, GVTEX-001
    },

    careerStageTag: {
      type: String,
      required: true,
      enum: [
        "Exposure",
        "Foundation",
        "Early Profile",
        "Early Lock-In",
        "Mid Lock-In",
        "Late Lock-In",
        "Elite Talent",
        "Specialized Entry",
        "Survival Entry",
        "Technical Specialist",
      ],
    },

    roiProfile: {
      type: String,
      required: true,
      enum: [
        "Profile Asset",
        "Skill Audit",
        "Global Benchmark",
        "High Yield",
        "Medium Yield",
        "Low Yield",
        "High Variance",
        "Extreme Variance",
        "Binary",
        "Infinite",
        "Negative Skew",
        "Long Horizon",
        "Slow Burn",
      ],
    },

    prestigeSensitivity: {
      type: String,
      required: true,
      enum: ["Low", "Medium", "High", "Very High", "Extreme", "Maximum"],
    },

    urbanBiasIndex: {
      type: String,
      required: true,
      enum: [
        "Negative",
        "Very Low",
        "Low",
        "Medium",
        "High",
        "Very High",
        "Extreme",
      ],
    },

    socialStatusDependency: {
      type: String,
      required: true,
      enum: ["Low", "Medium", "High", "Very High"],
    },

    competitionIntensity: {
      type: String,
      required: true,
      enum: [
        "Low",
        "Medium",
        "High",
        "Very High",
        "Extreme",
        "Maximum",
      ],
    },

    policySensitivity: {
      type: String,
      required: true,
      enum: [
        "Low",
        "Medium",
        "High",
        "Very High",
        "Critical",
      ],
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },

    lastReviewedYear: {
      type: Number,
      required: true,
      min: 2000,
      max: 2100,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// One pressure profile per exam
ExamCareerPressureSchema.index({ examId: 1 }, { unique: true });

const ExamCareerPressure = mongoose.model(
  "ExamCareerPressure",
  ExamCareerPressureSchema
);

export default ExamCareerPressure;
