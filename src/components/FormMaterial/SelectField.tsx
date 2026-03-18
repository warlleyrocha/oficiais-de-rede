// components/SelectField.tsx
import type { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

type SelectFieldProps<T extends FieldValues> = Readonly<{
  label: string;
  id: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
  options: { value: string; label: string }[];
  className?: string;
  labelClassName?: string;
}> &
  React.SelectHTMLAttributes<HTMLSelectElement>;

export function SelectField<T extends FieldValues>({
  label,
  id,
  name,
  register,
  error,
  options,
  className = '',
  labelClassName = '',
  ...props
}: SelectFieldProps<T>) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label
        htmlFor={id}
        className={`text-[#302b4b] text-[14px] font-medium mb-2 ${labelClassName}`}
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          {...register(name)}
          {...props}
          className={`
            w-full px-4 py-2 pr-10 border border-gray-200 rounded-lg
            bg-white text-[#302b4b] placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500
            transition-colors duration-200
            appearance-none
            ${error ? 'border-red-400' : ''}
          `}
        >
          {options.map((opt, i) => (
            <option key={`${opt.value}-${i}`} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-[16px]">
          <svg
            className="h-5 w-5 text-[#302b4b]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
