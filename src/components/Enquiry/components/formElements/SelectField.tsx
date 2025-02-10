// src/components/Enquiry/components/formElements/SelectField.tsx
interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  error,
  ...props
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-rich-blue-900">
        {label}
      </label>
      <select
        {...props}
        className="w-full px-4 py-3 rounded-lg bg-rich-blue-50/50 border border-rich-blue-100 focus:ring-2 focus:ring-rich-blue-600"
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
