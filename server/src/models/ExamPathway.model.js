import mongoose from "mongoose";

const examPathwaySchema = new mongoose.Schema(
  {
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExamCore",
      required: true,
      unique: true, 
      // one dominant pathway model per exam (for now)
    },

    immediateOutcome: {
      type: String,
      required: true,
      // e.g. "Admission", "Scholarship", "Job Allocation"
    },

    primaryPathway: {
      type: String,
      required: true,
      // e.g. "B.Tech", "5-Year Integrated MBA", "IAS/IPS"
    },

    secondaryPathways: {
      type: [String],
      default: [],
      // e.g. ["Study Abroad", "Private Colleges", "PSU Jobs"]
    },

    pathwayLockInLevel: {
      type: String,
      enum: [
        "None",
        "Low",
        "Partial",
        "Strong",
        "Irreversible"
      ],
      required: true,
    },

    notes: {
      type: String,
      // counselling explanation (optional)
    },
  },
  { timestamps: true }
);

export default mongoose.model("ExamPathway", examPathwaySchema);
