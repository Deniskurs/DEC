// BackgroundEffects.tsx
import { motion } from "framer-motion";

const BackgroundEffects = () => {
  return (
    <>
      {/* Luxury Particle Effect Background */}
      <motion.div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(252, 249, 240, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, rgba(252, 249, 240, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 20%, rgba(252, 249, 240, 0.15) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 8,
            ease: "linear",
            repeat: Infinity,
          }}
        />

        {/* Dynamic Light Trails */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "linear-gradient(45deg, transparent 0%, rgba(252, 249, 240, 0.03) 50%, transparent 100%)",
              "linear-gradient(180deg, transparent 0%, rgba(252, 249, 240, 0.03) 50%, transparent 100%)",
              "linear-gradient(45deg, transparent 0%, rgba(252, 249, 240, 0.03) 50%, transparent 100%)",
            ],
          }}
          transition={{
            duration: 5,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      </motion.div>

      {/* Luxury Ambient Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 0.6, 0.4] }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-cream-50/10 to-transparent opacity-40" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-rich-blue-500/10 to-transparent opacity-30" />
        </motion.div>
      </div>

      {/* Border Glow */}
      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-white/[0.08]" />
      <div className="absolute inset-px rounded-2xl sm:rounded-3xl border border-white/[0.04]" />

      {/* Premium Bottom Fade */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-rich-blue-900 to-transparent"
        animate={{ opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </>
  );
};

export default BackgroundEffects;
