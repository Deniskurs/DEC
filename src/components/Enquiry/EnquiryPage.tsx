// src/components/Enquiry/EnquiryPage.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";
import EnquiryHero from "./components/EnquiryHero";
import ClientSelector from "./ClientSelector";

const EnquiryPage = () => {
  const [clientType, setClientType] = useState<"new" | "existing" | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.key) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rich-blue-900 to-rich-blue-800">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(252,249,240,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(252,249,240,0.1),transparent_60%)]" />

        {/* Dynamic Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-cream-50/20 rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative">
        {/* Back Navigation */}
        <motion.div
          className="fixed top-24 left-8 z-50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rich-blue-800/80 backdrop-blur-sm border border-cream-50/10 text-cream-50/80 hover:text-cream-50 hover:bg-rich-blue-700/80 transition-all duration-300 group"
          >
            <LuArrowLeft className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back</span>
          </button>
        </motion.div>

        {/* Hero Section */}
        <EnquiryHero />

        {/* Main Content */}
        <div className="relative py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ClientSelector activeType={clientType} onSelect={setClientType} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryPage;
