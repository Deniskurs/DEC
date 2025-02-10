// src/components/Enquiry/components/formElements/TextArea.tsx
interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  ...props
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-rich-blue-900">
        {label}
      </label>
      <textarea
        {...props}
        className="w-full px-4 py-3 rounded-lg bg-rich-blue-50/50 border border-rich-blue-100 focus:ring-2 focus:ring-rich-blue-600 focus:border-transparent"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
