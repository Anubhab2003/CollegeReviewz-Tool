import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import basiclogo1 from "../assets/basiclogo1.png";

export default function ReportPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.reportUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        No report found
      </div>
    );
  }

  const { reportUrl } = state;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      {/* HEADER */}
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <img src={basiclogo1} className="w-10 h-10" alt="CollegeReviewZ" />
        <span className="text-xl font-bold">
          CollegeReview<span className="text-indigo-500">Z</span>
        </span>
      </div>

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-slate-900 rounded-3xl p-10 max-w-md w-full text-center shadow-2xl"
      >
        <h1 className="text-3xl font-extrabold mb-4 text-indigo-400">
          Assessment Completed 🎉
        </h1>

        <p className="text-gray-300 mb-8">
          Your career report is ready.
        </p>

        {/* ✅ USE BACKEND URL DIRECTLY */}
        <a
          href={reportUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-4 mb-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold"
        >
          📄 Download PDF Report
        </a>

        <button
          onClick={() => navigate("/")}
          className="w-full py-4 rounded-xl bg-green-600 hover:bg-green-700 font-bold"
        >
          🔁 Take Assessment Again
        </button>
      </motion.div>
    </div>
  );
}
