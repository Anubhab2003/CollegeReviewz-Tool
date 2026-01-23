import { motion } from "framer-motion";

export default function AnimatedPageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="w-full flex justify-center px-4 py-16"
    >
      {children}
    </motion.div>
  );
}
