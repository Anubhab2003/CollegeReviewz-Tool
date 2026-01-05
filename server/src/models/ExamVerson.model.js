import mongoose from "mongoose";

const examVersionSchema = new mongoose.Schema(
  {
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExamCore",
      required: true,
    },

    examFrequency: {
      type: String,
      required: true,
    },

    examMode: {
      type: [String], // CBT, OMR, Hybrid etc.
      required: true,
    },

    examFunctionalType: {
      type: [String], // Screening, Selection, Credential
      required: true,
    },

    recordVersion: {
      type: String,
      required: true, // e.g. "2024.1"
    },

    applicableFromYear: {
      type: Number,
      required: true,
    },

    applicableToYear: {
      type: Number, // null = current
      default: null,
    },

    lastUpdatedDate: {
      type: Date,
      required: true,
    },

    sourceType: {
      type: String,
      required: true,
    },

    reviewerStatus: {
      type: String,
      enum: ["Reviewed", "Locked", "Draft"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ExamVersion", examVersionSchema);
