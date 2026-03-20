import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import InputText from './InputText';

describe('InputText', () => {
  // ── Default render ──────────────────────────────────────────────────────────

  it('renders a labelled input', () => {
    render(<InputText name="Full Name" />);
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
  });

  it('renders the label text', () => {
    render(<InputText name="Email Address" />);
    expect(screen.getByText('Email Address')).toBeInTheDocument();
  });

  it('defaults to text input (type=name)', () => {
    render(<InputText name="Full Name" />);
    expect(screen.getByLabelText('Full Name')).toHaveAttribute('type', 'text');
  });

  it('defaults to not required', () => {
    render(<InputText name="Full Name" />);
    expect(screen.getByLabelText('Full Name')).not.toBeRequired();
  });

  it('enforces maxLength of 30', () => {
    render(<InputText name="Full Name" />);
    expect(screen.getByLabelText('Full Name')).toHaveAttribute('maxLength', '30');
  });

  // ── type prop ───────────────────────────────────────────────────────────────

  it('maps type="email" to input type="email"', () => {
    render(<InputText name="Email" type="email" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
  });

  it('maps type="phone" to input type="tel"', () => {
    render(<InputText name="Phone" type="phone" />);
    expect(screen.getByLabelText('Phone')).toHaveAttribute('type', 'tel');
  });

  it('maps type="name" to input type="text"', () => {
    render(<InputText name="Full Name" type="name" />);
    expect(screen.getByLabelText('Full Name')).toHaveAttribute('type', 'text');
  });

  it('maps type="address" to input type="text"', () => {
    render(<InputText name="Address" type="address" />);
    expect(screen.getByLabelText('Address')).toHaveAttribute('type', 'text');
  });

  it('maps type="password" to input type="password"', () => {
    render(<InputText name="Password" type="password" />);
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
  });

  // ── placeholder ─────────────────────────────────────────────────────────────

  it('uses default placeholder for email type', () => {
    render(<InputText name="Email" type="email" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('placeholder', 'you@example.com');
  });

  it('uses default placeholder for phone type', () => {
    render(<InputText name="Phone" type="phone" />);
    expect(screen.getByLabelText('Phone')).toHaveAttribute('placeholder', '+1 (555) 000-0000');
  });

  it('uses default placeholder for password type', () => {
    render(<InputText name="Password" type="password" />);
    expect(screen.getByLabelText('Password')).toHaveAttribute('placeholder', '••••••••');
  });

  it('overrides placeholder with custom value', () => {
    render(<InputText name="Email" type="email" placeholder="Enter your work email" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('placeholder', 'Enter your work email');
  });

  // ── required prop ───────────────────────────────────────────────────────────

  it('marks input as required when required=true', () => {
    render(<InputText name="Full Name" required />);
    expect(screen.getByLabelText('Full Name')).toBeRequired();
  });

  it('sets aria-required when required=true', () => {
    render(<InputText name="Full Name" required />);
    expect(screen.getByLabelText('Full Name')).toHaveAttribute('aria-required', 'true');
  });

  it('shows asterisk indicator when required', () => {
    render(<InputText name="Full Name" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('does not show asterisk when not required', () => {
    render(<InputText name="Full Name" />);
    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });

  // ── disabled state ──────────────────────────────────────────────────────────

  it('disables the input when disabled=true', () => {
    render(<InputText name="Full Name" disabled />);
    expect(screen.getByLabelText('Full Name')).toBeDisabled();
  });

  it('applies not-allowed cursor when disabled', () => {
    render(<InputText name="Full Name" disabled />);
    expect(screen.getByLabelText('Full Name')).toHaveStyle({ cursor: 'not-allowed' });
  });

  it('applies muted background when disabled', () => {
    render(<InputText name="Full Name" disabled />);
    expect(screen.getByLabelText('Full Name')).toHaveStyle({ backgroundColor: '#f7fafc' });
  });

  // ── onChange ────────────────────────────────────────────────────────────────

  it('calls onChange with the new value when typing', () => {
    const handleChange = vi.fn();
    render(<InputText name="Full Name" value="" onChange={handleChange} />);
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'Alice' } });
    expect(handleChange).toHaveBeenCalledWith('Alice');
  });

  it('reflects controlled value', () => {
    render(<InputText name="Full Name" value="Jane Doe" onChange={vi.fn()} />);
    expect(screen.getByLabelText('Full Name')).toHaveValue('Jane Doe');
  });

  // ── focus / blur states ─────────────────────────────────────────────────────

  it('applies blue border on focus', () => {
    render(<InputText name="Full Name" />);
    const input = screen.getByLabelText('Full Name');
    fireEvent.focus(input);
    expect(input).toHaveStyle({ borderColor: '#3182ce' });
  });

  it('restores default border on blur', () => {
    render(<InputText name="Full Name" />);
    const input = screen.getByLabelText('Full Name');
    fireEvent.focus(input);
    fireEvent.blur(input);
    expect(input).toHaveStyle({ borderColor: '#cbd5e0' });
  });

  // ── accessibility ───────────────────────────────────────────────────────────

  it('associates label with input via htmlFor', () => {
    render(<InputText name="Full Name" />);
    const input = screen.getByLabelText('Full Name');
    expect(input).toHaveAttribute('id', 'full-name');
  });

  it('sets autocomplete attribute for email type', () => {
    render(<InputText name="Email" type="email" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('autoComplete', 'email');
  });

  it('sets autocomplete attribute for password type', () => {
    render(<InputText name="Password" type="password" />);
    expect(screen.getByLabelText('Password')).toHaveAttribute('autoComplete', 'current-password');
  });

  // ── className ───────────────────────────────────────────────────────────────

  it('applies custom className to the wrapper', () => {
    const { container } = render(<InputText name="Full Name" className="my-wrapper" />);
    expect(container.firstChild).toHaveClass('my-wrapper');
  });
});
