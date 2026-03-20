import React, { useEffect, useRef, useState } from 'react';

type ModalSize    = 'sm' | 'md' | 'lg';
type ModalVariant = 'default' | 'danger' | 'success' | 'info' | 'warning';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: ModalSize;
  variant?: ModalVariant;
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  footer?: React.ReactNode;
  className?: string;
}

const sizeMap: Record<ModalSize, number> = {
  sm: 400,
  md: 560,
  lg: 720,
};

const variantMap: Record<ModalVariant, string> = {
  default: '#3182ce',
  danger:  '#e53e3e',
  success: '#38a169',
  info:    '#319795',
  warning: '#dd6b20',
};

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  variant = 'default',
  showCloseButton = true,
  closeOnBackdrop = true,
  footer,
  className = '',
}: ModalProps) {
  const [closeBtnHovered, setCloseBtnHovered] = useState(false);
  const [closeBtnFocused, setCloseBtnFocused] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Scroll lock
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Save the element that had focus before the modal opened
    const previouslyFocused = document.activeElement as HTMLElement | null;

    // Move focus into the dialog
    dialogRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab') return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last  = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const accentColor = variantMap[variant];
  const maxWidth    = sizeMap[size];
  const hasTitle    = title !== undefined;

  return (
    <div
      onClick={closeOnBackdrop ? onClose : undefined}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.5)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 16,
      }}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={hasTitle ? 'modal-title' : undefined}
        aria-label={!hasTitle ? 'Modal' : undefined}
        aria-describedby="modal-description"
        onClick={(e) => e.stopPropagation()}
        className={className}
        style={{
          backgroundColor: '#fff',
          borderRadius: 12,
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.18), 0 8px 24px rgba(0, 0, 0, 0.10)',
          maxWidth,
          width: '100%',
          maxHeight: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          borderTop: `3px solid ${accentColor}`,
          fontFamily: 'sans-serif',
          outline: 'none',
          position: 'relative',
        }}
      >
        {/* Header — only rendered when a title is present */}
        {hasTitle && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px 24px 16px',
              borderBottom: '1px solid #edf2f7',
              flexShrink: 0,
            }}
          >
            <h2
              id="modal-title"
              style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#1a202c', lineHeight: 1.3 }}
            >
              {title}
            </h2>

            {showCloseButton && (
              <button
                onClick={onClose}
                aria-label="Close modal"
                onMouseEnter={() => setCloseBtnHovered(true)}
                onMouseLeave={() => setCloseBtnHovered(false)}
                onFocus={() => setCloseBtnFocused(true)}
                onBlur={() => setCloseBtnFocused(false)}
                style={{
                  marginLeft: 12,
                  background: closeBtnHovered ? '#f7fafc' : 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: closeBtnHovered ? '#2d3748' : '#718096',
                  fontSize: 16,
                  lineHeight: '1',
                  width: 44,
                  height: 44,
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'background 0.15s ease, color 0.15s ease',
                  outline: closeBtnFocused ? '2px solid #3182ce' : 'none',
                  outlineOffset: 2,
                }}
              >
                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Floating close button when there is no title */}
        {!hasTitle && showCloseButton && (
          <button
            onClick={onClose}
            aria-label="Close modal"
            onMouseEnter={() => setCloseBtnHovered(true)}
            onMouseLeave={() => setCloseBtnHovered(false)}
            onFocus={() => setCloseBtnFocused(true)}
            onBlur={() => setCloseBtnFocused(false)}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              background: closeBtnHovered ? '#f7fafc' : 'none',
              border: 'none',
              cursor: 'pointer',
              color: closeBtnHovered ? '#2d3748' : '#718096',
              fontSize: 16,
              lineHeight: '1',
              width: 44,
              height: 44,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
              transition: 'background 0.15s ease, color 0.15s ease',
              outline: closeBtnFocused ? '2px solid #3182ce' : 'none',
              outlineOffset: 2,
            }}
          >
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        )}

        {/* Body */}
        <div
          id="modal-description"
          style={{
            padding: hasTitle ? '20px 24px' : '28px 24px 20px',
            overflowY: 'auto',
            flex: 1,
            color: '#4a5568',
            fontSize: 14,
            lineHeight: 1.6,
          }}
        >
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            style={{
              padding: '16px 24px',
              borderTop: '1px solid #edf2f7',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 8,
              flexShrink: 0,
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
