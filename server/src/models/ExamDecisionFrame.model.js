import mongoose from "mongoose";

const examDecisionFrameSchema = new mongoose.Schema(
  {
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExamCore",
      required: true,
      unique: true,
      index: true,
    },

    decisionLabel: {
      type: String,
      required: true,
      // e.g. "The Iron Gate of India"
    },

    keyTradeOffs: {
      type: [String],
      required: true,
      /*
        Examples:
        - "High status vs very low probability"
        - "Brand vs branch"
        - "Speed vs depth"
      */
    },

    summaryNarrative: {
      type: String,
      /*
        Optional: 2–3 line human explanation.
        Example:
        "This exam rewards extreme patience and emotional resilience.
         Prestige is high, but failure probability is brutal."
      */
    },

    cautionTag: {
      type: String,
      enum: [
        "High Risk",
        "Binary Outcome",
        "Long Gestation",
        "High Cost",
        "Low Mobility",
        "Emotionally Demanding",
        "Safe Bet",
        "Brand Dependent"
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("ExamDecisionFrame", examDecisionFrameSchema);
