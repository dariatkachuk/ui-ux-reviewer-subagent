import React, { useState } from 'react';
import InputText from '../components/ui/InputText';

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

const cardStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  padding: 24,
  backgroundColor: '#fff',
  borderRadius: 12,
  border: '1px solid #e2e8f0',
};

const rowStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 20,
};

export default function InputTextPage() {
  const [email, setEmail]       = useState('');
  const [phone, setPhone]       = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress]   = useState('');
  const [password, setPassword] = useState('');

  const charCount = fullName.length;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7fafc', padding: 40, fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: 30, fontWeight: 700, color: '#1a202c', margin: 0 }}>InputText</h1>
          <p style={{ marginTop: 8, color: '#718096', fontSize: 15 }}>
            Text input with type variants, required state, and 30-character limit.
          </p>
        </div>

        {/* Type variants */}
        <div style={sectionStyle}>
          <p style={labelStyle}>Type Variants</p>
          <div style={cardStyle}>
            <div style={rowStyle}>
              <InputText name="Full Name"     type="name"     />
              <InputText name="Email Address" type="email"    />
              <InputText name="Phone Number"  type="phone"    />
              <InputText name="Home Address"  type="address"  />
            </div>
            <InputText name="Password" type="password" />
          </div>
        </div>

        {/* Required state */}
        <div style={sectionStyle}>
          <p style={labelStyle}>Required vs Optional</p>
          <div style={cardStyle}>
            <div style={rowStyle}>
              <InputText name="First Name"    type="name"  required />
              <InputText name="Email Address" type="email" required />
              <InputText name="Nickname"      type="name"  />
              <InputText name="Website"       type="address" />
            </div>
          </div>
        </div>

        {/* Disabled state */}
        <div style={sectionStyle}>
          <p style={labelStyle}>Disabled State</p>
          <div style={cardStyle}>
            <div style={rowStyle}>
              <InputText name="Full Name"     type="name"     disabled value="Jane Doe" />
              <InputText name="Email Address" type="email"    disabled value="jane@example.com" />
              <InputText name="Phone Number"  type="phone"    disabled value="+1 (555) 123-4567" />
              <InputText name="Password"      type="password" disabled value="secret123" />
            </div>
          </div>
        </div>

        {/* Interactive — full signup form */}
        <div style={sectionStyle}>
          <p style={labelStyle}>Interactive — Signup Form</p>
          <div style={cardStyle}>
            <div style={rowStyle}>
              <InputText
                name="Full Name"
                type="name"
                required
                value={fullName}
                onChange={setFullName}
              />
              <InputText
                name="Email Address"
                type="email"
                required
                value={email}
                onChange={setEmail}
              />
              <InputText
                name="Phone Number"
                type="phone"
                value={phone}
                onChange={setPhone}
              />
              <InputText
                name="Home Address"
                type="address"
                value={address}
                onChange={setAddress}
              />
            </div>
            <InputText
              name="Password"
              type="password"
              required
              value={password}
              onChange={setPassword}
            />

            {/* Live character count for Full Name */}
            {fullName.length > 0 && (
              <p style={{ margin: 0, fontSize: 12, color: charCount >= 28 ? '#e53e3e' : '#a0aec0' }}>
                Full Name: {charCount} / 30 characters
              </p>
            )}

            {/* Form summary */}
            {(email || phone || fullName || address) && (
              <div style={{
                padding: '12px 16px',
                backgroundColor: '#f0fff4',
                borderRadius: 8,
                border: '1px solid #c6f6d5',
                fontSize: 13,
                color: '#276749',
                lineHeight: 1.6,
              }}>
                <strong>Live preview:</strong><br />
                {fullName  && <span>Name: {fullName}<br /></span>}
                {email     && <span>Email: {email}<br /></span>}
                {phone     && <span>Phone: {phone}<br /></span>}
                {address   && <span>Address: {address}<br /></span>}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
