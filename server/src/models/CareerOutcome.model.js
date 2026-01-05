import mongoose from "mongoose";

const careerOutcomeSchema = new mongoose.Schema(
  {
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExamCore",
      required: true,
      index: true,
    },

    careerDomains: {
      type: [String],
      required: true,
      // e.g. ["Engineering", "Finance", "Consulting"]
    },

    careerRoles: {
      type: [String],
      required: true,
      // e.g. ["Software Engineer", "Analyst"]
    },

    exactJobTitles: {
      type: [String],
      default: [],
      // e.g. ["SDE-1", "Graduate Engineer Trainee"]
    },

    sectorEntry: {
      type: [String],
      required: true,
      // e.g. ["Private", "PSU", "Govt", "Academia"]
    },

    professionalTitle: {
      type: String,
      // e.g. "Engineer (Er.)", "Dr.", "Advocate"
    },

    licenseOrCertification: {
      type: String,
      // e.g. "Medical Registration", "COP", "CTET Certificate"
    },

    legallyMandatory: {
      type: Boolean,
      required: true,
    },

    careerMobility: {
      type: String,
      enum: [
        "Very Low",
        "Low",
        "Medium",
        "High",
        "Very High",
        "Extreme"
      ],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("CareerOutcome", careerOutcomeSchema);
