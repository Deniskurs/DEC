import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  ...props
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-rich-blue-900">
        {label}
      </label>
      <input
        {...props}
        className="w-full px-4 py-3 rounded-lg bg-rich-blue-50/50 border border-rich-blue-100 focus:ring-2 focus:ring-rich-blue-600 focus:border-transparent"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
