import { useState, useRef, useEffect } from 'react';
import type { FieldError } from 'react-hook-form';

type ComboboxOption = {
  value: string;
  label: string;
};

type ComboboxFieldProps = Readonly<{
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  error?: FieldError;
  options: ComboboxOption[];
  placeholder?: string;
  className?: string;
}>;

export function ComboboxField({
  label,
  id,
  value,
  onChange,
  error,
  options,
  placeholder = '',
  className = '',
}: ComboboxFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const filtered = options.filter(
    (opt) => opt.value !== '' && opt.label.toLowerCase().includes(inputValue.toLowerCase()),
  );

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setInputValue(val);
    setIsOpen(true);
    setHighlightedIndex(-1);
    onChange(val);
  }

  function handleSelect(opt: ComboboxOption) {
    setInputValue(opt.label);
    onChange(opt.value);
    setIsOpen(false);
    setHighlightedIndex(-1);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen && e.key === 'ArrowDown') {
      setIsOpen(true);
      return;
    }

    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filtered.length) {
          handleSelect(filtered[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  }

  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const item = listRef.current.children[highlightedIndex] as HTMLElement | undefined;
      item?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`flex flex-col ${className}`}>
      <label
        htmlFor={id}
        className="text-[#302b4b] text-[14px] font-medium mb-2"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          className={`
            w-full px-4 py-2 pr-10 border border-gray-200 rounded-lg
            bg-white text-[#302b4b] placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500
            transition-colors duration-200
            ${error ? 'border-red-400' : ''}
          `}
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setIsOpen((prev) => !prev)}
          className="absolute inset-y-0 right-0 flex items-center pr-[16px]"
        >
          <svg
            className={`h-5 w-5 text-[#302b4b] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
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
        </button>

        {isOpen && filtered.length > 0 && (
          <div
            ref={listRef}
            className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg"
          >
            {filtered.map((opt, i) => (
              <button
                key={opt.value}
                type="button"
                onMouseDown={() => handleSelect(opt)}
                onMouseEnter={() => setHighlightedIndex(i)}
                className={`
                  w-full text-left cursor-pointer px-4 py-2 text-[#302b4b] text-sm
                  ${i === highlightedIndex ? 'bg-blue-50' : 'hover:bg-gray-50'}
                `}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
