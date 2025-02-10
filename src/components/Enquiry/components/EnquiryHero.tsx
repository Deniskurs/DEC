// src/components/Enquiry/components/EnquiryHero.tsx
import { motion } from "framer-motion";
import { LuShield, LuChartNoAxesCombined, LuBriefcase } from "react-icons/lu";

const EnquiryHero = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-rich-blue-900 via-rich-blue-800 to-rich-blue-700 overflow-hidden">
      {/* Luxury Background Effects */}
      <div className="absolute inset-0">
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
      </div>

      {/* Main Content */}
      <div className="relative w-full max-w-7xl mx-auto px-8 lg:px-12 py-24">
        <div className="max-w-3xl">
          {/* Ultra-Premium Title Animation */}
          <motion.h2
            className="text-lg font-semibold text-center md:text-left text-cream-50/90 mb-8 tracking-[0.2em] uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="relative">
              <span className="relative z-10">DELTA EDGE CAPITAL</span>
              <motion.span
                className="absolute bottom-0 left-0 w-full h-[1px] bg-cream-50/30"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            </span>
          </motion.h2>

          <motion.h1
            className="text-4xl sm:text-5xl text-center md:text-left lg:text-6xl font-bold mb-8 text-white leading-[1.2]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="block">Your Investment Journey</span>
            <span className="block mt-2 bg-gradient-to-r from-cream-50 via-cream-50/90 to-cream-50 bg-clip-text text-transparent">
              Begins Here
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-cream-50/90 mb-12 md:text-left text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Whether you're a new investor or an existing client, our team is
            here to help you achieve your financial goals.
          </motion.p>

          {/* Feature Cards */}
          <motion.div
            className="grid md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {[
              {
                icon: LuShield,
                title: "Secure & Private",
                description: "Bank-grade security for your data",
              },
              {
                icon: LuChartNoAxesCombined,
                title: "Market Leaders",
                description: "Top-tier performance track record",
              },
              {
                icon: LuBriefcase,
                title: "Expert Support",
                description: "Dedicated relationship managers",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-cream-50/5 backdrop-blur-sm border border-cream-50/10"
              >
                <feature.icon className="h-6 w-6 text-cream-50 mb-4" />
                <h3 className="text-cream-50 font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-cream-50/70 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-rich-blue-900 to-transparent" />
    </section>
  );
};

export default EnquiryHero;
