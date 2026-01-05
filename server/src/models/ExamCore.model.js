import mongoose from "mongoose";

const examCoreSchema = new mongoose.Schema(
  {
    examId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    category: {
      type: Number,
      required: true,
    },

    examName: {
      type: String,
      required: true,
      trim: true,
    },

    fullOfficialName: {
      type: String,
      required: true,
    },

    conductingAuthority: {
      type: String,
      required: true,
    },

    authorityType: {
      type: String,
      required: true,
    },

    examLevel: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ExamCore", examCoreSchema);
