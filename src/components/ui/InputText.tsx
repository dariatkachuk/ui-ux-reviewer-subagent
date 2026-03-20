import React, { useState } from 'react';

type InputType = 'email' | 'phone' | 'name' | 'address' | 'password';

interface InputTextProps {
  name: string;
  type?: InputType;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const MAX_LENGTH = 30;

const htmlTypeMap: Record<InputType, string> = {
  email:    'email',
  phone:    'tel',
  name:     'text',
  address:  'text',
  password: 'password',
};

const autocompleteMap: Record<InputType, string> = {
  email:    'email',
  phone:    'tel',
  name:     'name',
  address:  'street-address',
  password: 'current-password',
};

const placeholderMap: Record<InputType, string> = {
  email:    'you@example.com',
  phone:    '+1 (555) 000-0000',
  name:     'Full name',
  address:  '123 Main St',
  password: '••••••••',
};

export default function InputText({
  name,
  type = 'name',
  required = false,
  value,
  onChange,
  placeholder,
  disabled = false,
  className = '',
}: InputTextProps) {
  const [focused, setFocused] = useState(false);

  const id = name.toLowerCase().replace(/\s+/g, '-');
  const resolvedPlaceholder = placeholder ?? placeholderMap[type];

  const borderColor = focused
    ? '#3182ce'
    : disabled
    ? '#e2e8f0'
    : '#cbd5e0';

  return (
    <div
      className={className}
      style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'sans-serif' }}
    >
      <label
        htmlFor={id}
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: disabled ? '#a0aec0' : '#4a5568',
          userSelect: 'none',
        }}
      >
        {name}
        {required && (
          <span style={{ color: '#e53e3e', marginLeft: 4 }} aria-hidden="true">
            *
          </span>
        )}
      </label>

      <input
        id={id}
        type={htmlTypeMap[type]}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        placeholder={resolvedPlaceholder}
        disabled={disabled}
        required={required}
        maxLength={MAX_LENGTH}
        autoComplete={autocompleteMap[type]}
        aria-label={name}
        aria-required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          padding: '8px 12px',
          fontSize: 14,
          borderRadius: 6,
          border: `2px solid ${borderColor}`,
          outline: 'none',
          backgroundColor: disabled ? '#f7fafc' : '#fff',
          color: disabled ? '#a0aec0' : '#1a202c',
          cursor: disabled ? 'not-allowed' : 'text',
          width: '100%',
          boxSizing: 'border-box',
          transition: 'border-color 0.15s ease',
        }}
      />
    </div>
  );
}
