// src/components/Enquiry/ClientSelector/index.tsx
import React from "react";
import { motion } from "framer-motion";
import { LuUserPlus, LuUsers, LuArrowRight } from "react-icons/lu";
import NewClientForm from "./components/NewClientForm";
import ExistingClientForm from "./components/ExistingClientForm";

interface ClientSelectorProps {
  activeType: "new" | "existing" | null;
  onSelect: (type: "new" | "existing" | null) => void;
}

const ClientSelector: React.FC<ClientSelectorProps> = ({
  activeType,
  onSelect,
}) => {
  if (activeType === "new") {
    return <NewClientForm onBack={() => onSelect(null)} />;
  }

  if (activeType === "existing") {
    return <ExistingClientForm onBack={() => onSelect(null)} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-cream-50 mb-8 text-center">
        How Can We Assist You Today?
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* New Client Card */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect("new")}
          className="group relative p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-rich-blue-100 hover:bg-rich-blue-50/50 transition-all duration-300"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-rich-blue-100/50 text-rich-blue-600">
              <LuUserPlus className="h-6 w-6" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-rich-blue-900 mb-2">
                New to Delta Edge Capital?
              </h3>
              <p className="text-rich-blue-600/90 mb-4">
                Learn how our sophisticated investment strategies can help
                protect and grow your wealth.
              </p>
              <div className="flex items-center text-rich-blue-600 font-medium">
                Start A Conversation
                <LuArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </motion.button>

        {/* Existing Client Card */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect("existing")}
          className="group relative p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-rich-blue-100 hover:bg-rich-blue-50/50 transition-all duration-300"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-rich-blue-100/50 text-rich-blue-600">
              <LuUsers className="h-6 w-6" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-rich-blue-900 mb-2">
                Already a Client?
              </h3>
              <p className="text-rich-blue-600/90 mb-4">
                Connect with your relationship manager or access premium support
                services.
              </p>
              <div className="flex items-center text-rich-blue-600 font-medium">
                Access Support
                <LuArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ClientSelector;
