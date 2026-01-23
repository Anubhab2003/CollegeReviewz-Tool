import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const fadeIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
};

export default function AssessmentSuccess({ reportPath }) {
  const navigate = useNavigate();

  return (
    <motion.div
      {...fadeIn}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl bg-slate-900/80 backdrop-blur-xl
      rounded-3xl shadow-2xl p-10 text-center border border-indigo-500/30"
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
        className="text-green-400 text-6xl mb-6"
      >
        ✔
      </motion.div>

      <h1 className="text-3xl font-extrabold text-indigo-400 mb-3">
        Assessment Completed
      </h1>

      <p className="text-slate-300 mb-10">
        Your career report has been generated successfully.
      </p>

      <div className="flex flex-col gap-4">
        {/* DOWNLOAD */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate("/report", { state: { reportPath } })}
          className="w-full py-4 rounded-xl bg-indigo-600
          text-white font-bold text-lg shadow-lg"
        >
          📄 Download PDF Report
        </motion.button>

        {/* RESTART */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate("/assessment")}
          className="w-full py-4 rounded-xl bg-emerald-500
          text-white font-bold text-lg shadow-lg"
        >
          🔁 Take Assessment Again
        </motion.button>
      </div>
    </motion.div>
  );
}
