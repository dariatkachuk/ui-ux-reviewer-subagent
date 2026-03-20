import React, { useState } from 'react';

type ButtonColor = 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  name: string;
  type?: 'button' | 'submit' | 'reset';
  color?: ButtonColor;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const colorMap: Record<ButtonColor, { base: string; hover: string; active: string }> = {
  primary:   { base: '#3182ce', hover: '#2b6cb0', active: '#2c5282' },
  secondary: { base: '#718096', hover: '#4a5568', active: '#2d3748' },
  danger:    { base: '#e53e3e', hover: '#c53030', active: '#9b2c2c' },
  success:   { base: '#38a169', hover: '#2f855a', active: '#276749' },
  warning:   { base: '#dd6b20', hover: '#c05621', active: '#9c4221' },
};

const sizeMap: Record<ButtonSize, { padding: string; fontSize: number; borderRadius: number }> = {
  sm: { padding: '6px 12px',  fontSize: 13, borderRadius: 4 },
  md: { padding: '8px 16px',  fontSize: 14, borderRadius: 6 },
  lg: { padding: '12px 24px', fontSize: 16, borderRadius: 8 },
};

export default function Button({
  name,
  type = 'button',
  color = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = '',
}: ButtonProps) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [active, setActive]   = useState(false);

  const { base, hover, active: activeColor } = colorMap[color];
  const { padding, fontSize, borderRadius }  = sizeMap[size];

  let bgColor = base;
  if (active && !disabled)  bgColor = activeColor;
  else if (hovered && !disabled) bgColor = hover;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setActive(false); }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        padding,
        fontSize,
        borderRadius,
        backgroundColor: bgColor,
        color: '#fff',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        fontWeight: 600,
        fontFamily: 'sans-serif',
        outline: focused ? '3px solid rgba(49, 130, 206, 0.5)' : 'none',
        outlineOffset: focused ? 2 : 0,
        transition: 'background-color 0.15s ease, opacity 0.15s ease',
        userSelect: 'none',
      }}
      aria-disabled={disabled}
    >
      {name}
    </button>
  );
}
