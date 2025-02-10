// src/components/Enquiry/ClientSelector/components/ExistingClientForm.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { LuArrowLeft, LuArrowRight, LuShieldCheck } from "react-icons/lu";
import {
  InputField,
  SelectField,
  TextArea,
} from "../../components/formElements";

interface ExistingClientFormProps {
  onBack: () => void;
}

const ExistingClientForm: React.FC<ExistingClientFormProps> = ({ onBack }) => {
  const [verificationStatus, setVerificationStatus] = useState<
    "pending" | "verified" | "failed"
  >("pending");
  const [formData, setFormData] = useState({
    clientId: "",
    name: "",
    email: "",
    requestType: "",
    message: "",
  });

  const requestTypes = [
    { value: "meeting", label: "Schedule Meeting with Relationship Manager" },
    { value: "report", label: "Request Portfolio Report" },
    { value: "update", label: "Update Investment Strategy" },
    { value: "support", label: "General Support" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden"
    >
      <div className="p-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-rich-blue-600 hover:text-rich-blue-700 mb-6"
        >
          <LuArrowLeft className="h-4 w-4" />
          Back
        </button>

        <h2 className="text-2xl font-bold text-rich-blue-900 mb-8">
          Delta Edge Client Portal
        </h2>

        {verificationStatus === "pending" ? (
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-rich-blue-600 mb-6">
              <LuShieldCheck className="h-5 w-5" />
              <span>Please verify your identity to continue</span>
            </div>

            <InputField
              label="Client ID"
              type="text"
              value={formData.clientId}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  clientId: e.target.value,
                }))
              }
              placeholder="Your DEC client ID"
              required
            />

            <InputField
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              placeholder="Registered email address"
              required
            />

            <div className="flex justify-end">
              <button
                onClick={() => setVerificationStatus("verified")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-rich-blue-600 text-white rounded-xl hover:bg-rich-blue-700 transition-colors"
              >
                Verify Identity
                <LuArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-4 bg-green-50 rounded-lg border border-green-100 mb-6">
              <div className="flex items-center gap-2 text-green-700">
                <LuShieldCheck className="h-5 w-5" />
                <span className="font-medium">Identity Verified</span>
              </div>
            </div>

            <SelectField
              label="How can we help?"
              options={requestTypes}
              value={formData.requestType}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  requestType: e.target.value,
                }))
              }
              required
            />

            <TextArea
              label="Message"
              placeholder="Please provide details about your request..."
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  message: e.target.value,
                }))
              }
              rows={4}
              required
            />

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-rich-blue-600 text-white rounded-xl hover:bg-rich-blue-700 transition-colors"
              >
                Submit Request
                <LuArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}

        {/* Premium Support Notice */}
        <div className="mt-8 p-4 rounded-xl bg-rich-blue-50/50 border border-rich-blue-100">
          <h3 className="text-rich-blue-900 font-semibold mb-2">
            24/7 Premium Support
          </h3>
          <p className="text-rich-blue-600 text-sm">
            As a valued client, you have access to our dedicated support team at
            any time. For urgent matters, you can also contact your relationship
            manager directly.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ExistingClientForm;
