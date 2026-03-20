import React, { useState } from 'react';
import Button from '../components/ui/Button';

const sectionStyle: React.CSSProperties = {
  marginBottom: 40,
};

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#a0aec0',
  marginBottom: 16,
  fontFamily: 'sans-serif',
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 12,
  alignItems: 'center',
  padding: 24,
  backgroundColor: '#fff',
  borderRadius: 12,
  border: '1px solid #e2e8f0',
};

export default function ButtonPage() {
  const [clickCount, setClickCount] = useState(0);
  const [lastAction, setLastAction] = useState<string | null>(null);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7fafc', padding: 40, fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: 30, fontWeight: 700, color: '#1a202c', margin: 0 }}>Button</h1>
          <p style={{ marginTop: 8, color: '#718096', fontSize: 15 }}>
            Visual demo of all color variants, sizes, and interactive states.
          </p>
        </div>

        {/* Color variants */}
        <div style={sectionStyle}>
          <p style={labelStyle}>Color Variants</p>
          <div style={rowStyle}>
            <Button name="Primary"   color="primary"   onClick={() => setLastAction('Primary clicked')} />
            <Button name="Secondary" color="secondary" onClick={() => setLastAction('Secondary clicked')} />
            <Button name="Danger"    color="danger"    onClick={() => setLastAction('Danger clicked')} />
            <Button name="Success"   color="success"   onClick={() => setLastAction('Success clicked')} />
            <Button name="Warning"   color="warning"   onClick={() => setLastAction('Warning clicked')} />
          </div>
        </div>

        {/* Size variants */}
        <div style={sectionStyle}>
          <p style={labelStyle}>Size Variants</p>
          <div style={rowStyle}>
            <Button name="Small"  size="sm" />
            <Button name="Medium" size="md" />
            <Button name="Large"  size="lg" />
          </div>
        </div>

        {/* Disabled state */}
        <div style={sectionStyle}>
          <p style={labelStyle}>Disabled State</p>
          <div style={rowStyle}>
            <Button name="Primary"   color="primary"   disabled />
            <Button name="Secondary" color="secondary" disabled />
            <Button name="Danger"    color="danger"    disabled />
            <Button name="Success"   color="success"   disabled />
            <Button name="Warning"   color="warning"   disabled />
          </div>
        </div>

        {/* Type variants */}
        <div style={sectionStyle}>
          <p style={labelStyle}>Type Variants</p>
          <div style={rowStyle}>
            <Button name="type=button" type="button"  color="primary" />
            <Button name="type=submit" type="submit"  color="success" />
            <Button name="type=reset"  type="reset"   color="secondary" />
          </div>
        </div>

        {/* Interactive counter */}
        <div style={sectionStyle}>
          <p style={labelStyle}>Interactive — Click Counter</p>
          <div style={{ ...rowStyle, flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Button
                name={`Clicked ${clickCount} time${clickCount !== 1 ? 's' : ''}`}
                color="primary"
                size="lg"
                onClick={() => setClickCount(c => c + 1)}
              />
              <Button
                name="Reset Counter"
                color="secondary"
                onClick={() => setClickCount(0)}
              />
            </div>
            {lastAction && (
              <p style={{ margin: 0, fontSize: 13, color: '#4a5568' }}>
                Last action: <strong>{lastAction}</strong>
              </p>
            )}
          </div>
        </div>

        {/* Size × Color matrix */}
        <div style={sectionStyle}>
          <p style={labelStyle}>Size × Color Matrix</p>
          <div style={{ ...rowStyle, flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}>
            {(['sm', 'md', 'lg'] as const).map(size => (
              <div key={size} style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ width: 24, fontSize: 12, color: '#a0aec0', fontFamily: 'monospace' }}>{size}</span>
                {(['primary', 'secondary', 'danger', 'success', 'warning'] as const).map(color => (
                  <Button key={color} name={color} size={size} color={color} />
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
