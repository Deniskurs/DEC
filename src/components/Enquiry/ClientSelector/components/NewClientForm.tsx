// src/components/Enquiry/ClientSelector/components/NewClientForm.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import {
  InputField,
  SelectField,
  TextArea,
} from "../../components/formElements";

interface NewClientFormProps {
  onBack: () => void;
}

const NewClientForm: React.FC<NewClientFormProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    investmentLevel: "",
    name: "",
    email: "",
    phone: "",
    location: "",
    investmentGoals: "",
    timeline: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const investmentLevels = [
    { value: "250k_1m", label: "£250,000 - £1,000,000" },
    { value: "1m_5m", label: "£1,000,000 - £5,000,000" },
    { value: "5m_plus", label: "£5,000,000+" },
  ];

  const timelineOptions = [
    { value: "immediate", label: "Immediate" },
    { value: "3months", label: "Within 3 months" },
    { value: "6months", label: "Within 6 months" },
    { value: "exploring", label: "Just exploring" },
  ];

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
          Start Your Investment Journey
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <SelectField
                label="Investment Capacity"
                options={investmentLevels}
                value={formData.investmentLevel}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    investmentLevel: e.target.value,
                  }))
                }
              />

              <SelectField
                label="Investment Timeline"
                options={timelineOptions}
                value={formData.timeline}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    timeline: e.target.value,
                  }))
                }
              />

              <TextArea
                label="Investment Goals"
                placeholder="Tell us about your investment objectives..."
                value={formData.investmentGoals}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    investmentGoals: e.target.value,
                  }))
                }
                rows={4}
              />

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-rich-blue-600 text-white rounded-xl hover:bg-rich-blue-700 transition-colors"
                >
                  Next
                  <LuArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <InputField
                label="Full Name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
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
                required
              />

              <InputField
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
              />

              <InputField
                label="Location"
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
              />

              <TextArea
                label="Additional Information"
                placeholder="Any specific questions or requirements..."
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    message: e.target.value,
                  }))
                }
                rows={4}
              />

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-rich-blue-600 hover:text-rich-blue-700"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-rich-blue-600 text-white rounded-xl hover:bg-rich-blue-700 transition-colors"
                >
                  Submit
                  <LuArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}
        </form>
      </div>
    </motion.div>
  );
};

export default NewClientForm;
