import React from 'react';

interface AvatarProps {
  name: string;
  size?: number;
  bgColor?: string;
  textColor?: string;
  fontSize?: number;
}

const PALETTE = [
  '#e53e3e', '#dd6b20', '#d69e2e', '#38a169',
  '#319795', '#3182ce', '#553c9a', '#b83280',
  '#e91e8c', '#00bcd4', '#4caf50', '#ff5722',
];

function getColorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function Avatar({
  name,
  size = 40,
  bgColor,
  textColor = '#fff',
  fontSize,
}: AvatarProps) {
  const bg = bgColor ?? getColorFromName(name);
  const fs = fontSize ?? size * 0.4;
  const initials = getInitials(name);

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: bg,
        color: textColor,
        fontSize: fs,
        fontWeight: 600,
        fontFamily: 'sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        flexShrink: 0,
      }}
      aria-label={name}
      role="img"
    >
      {initials}
    </div>
  );
}
