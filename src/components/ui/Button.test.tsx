import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';

describe('Button', () => {
  // ── Default render ──────────────────────────────────────────────────────────

  it('renders with required name prop', () => {
    render(<Button name="Submit" />);
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('defaults to type="button"', () => {
    render(<Button name="Click me" />);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('defaults to primary color', () => {
    render(<Button name="Click me" />);
    expect(screen.getByRole('button')).toHaveStyle({ backgroundColor: '#3182ce' });
  });

  it('defaults to md size', () => {
    render(<Button name="Click me" />);
    expect(screen.getByRole('button')).toHaveStyle({ padding: '8px 16px', fontSize: '14px' });
  });

  // ── type prop ───────────────────────────────────────────────────────────────

  it('renders type="submit" when specified', () => {
    render(<Button name="Save" type="submit" />);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('renders type="reset" when specified', () => {
    render(<Button name="Reset" type="reset" />);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');
  });

  // ── color variant ───────────────────────────────────────────────────────────

  it('applies primary color', () => {
    render(<Button name="Primary" color="primary" />);
    expect(screen.getByRole('button')).toHaveStyle({ backgroundColor: '#3182ce' });
  });

  it('applies secondary color', () => {
    render(<Button name="Secondary" color="secondary" />);
    expect(screen.getByRole('button')).toHaveStyle({ backgroundColor: '#718096' });
  });

  it('applies danger color', () => {
    render(<Button name="Delete" color="danger" />);
    expect(screen.getByRole('button')).toHaveStyle({ backgroundColor: '#e53e3e' });
  });

  it('applies success color', () => {
    render(<Button name="Confirm" color="success" />);
    expect(screen.getByRole('button')).toHaveStyle({ backgroundColor: '#38a169' });
  });

  it('applies warning color', () => {
    render(<Button name="Warning" color="warning" />);
    expect(screen.getByRole('button')).toHaveStyle({ backgroundColor: '#dd6b20' });
  });

  // ── size variant ────────────────────────────────────────────────────────────

  it('applies sm size styles', () => {
    render(<Button name="Small" size="sm" />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveStyle({ padding: '6px 12px', fontSize: '13px', borderRadius: '4px' });
  });

  it('applies md size styles', () => {
    render(<Button name="Medium" size="md" />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveStyle({ padding: '8px 16px', fontSize: '14px', borderRadius: '6px' });
  });

  it('applies lg size styles', () => {
    render(<Button name="Large" size="lg" />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveStyle({ padding: '12px 24px', fontSize: '16px', borderRadius: '8px' });
  });

  // ── disabled state ──────────────────────────────────────────────────────────

  it('is disabled when disabled prop is true', () => {
    render(<Button name="Submit" disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies reduced opacity when disabled', () => {
    render(<Button name="Submit" disabled />);
    expect(screen.getByRole('button')).toHaveStyle({ opacity: '0.5' });
  });

  it('applies not-allowed cursor when disabled', () => {
    render(<Button name="Submit" disabled />);
    expect(screen.getByRole('button')).toHaveStyle({ cursor: 'not-allowed' });
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<Button name="Submit" disabled onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  // ── onClick ─────────────────────────────────────────────────────────────────

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button name="Submit" onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // ── hover state ─────────────────────────────────────────────────────────────

  it('changes background on mouseenter (hover)', () => {
    render(<Button name="Hover me" color="primary" />);
    const btn = screen.getByRole('button');
    fireEvent.mouseEnter(btn);
    expect(btn).toHaveStyle({ backgroundColor: '#2b6cb0' });
  });

  it('restores background on mouseleave', () => {
    render(<Button name="Hover me" color="primary" />);
    const btn = screen.getByRole('button');
    fireEvent.mouseEnter(btn);
    fireEvent.mouseLeave(btn);
    expect(btn).toHaveStyle({ backgroundColor: '#3182ce' });
  });

  it('does not change background on hover when disabled', () => {
    render(<Button name="Hover me" color="primary" disabled />);
    const btn = screen.getByRole('button');
    fireEvent.mouseEnter(btn);
    expect(btn).toHaveStyle({ backgroundColor: '#3182ce' });
  });

  // ── focus state ─────────────────────────────────────────────────────────────

  it('applies outline on focus', () => {
    render(<Button name="Focus me" />);
    const btn = screen.getByRole('button');
    fireEvent.focus(btn);
    expect(btn).toHaveStyle({ outline: '3px solid rgba(49, 130, 206, 0.5)' });
  });

  it('removes outline on blur', () => {
    render(<Button name="Focus me" />);
    const btn = screen.getByRole('button');
    fireEvent.focus(btn);
    fireEvent.blur(btn);
    expect(btn).toHaveStyle({ outline: 'none' });
  });

  // ── active state ────────────────────────────────────────────────────────────

  it('changes background on mousedown (active)', () => {
    render(<Button name="Press me" color="primary" />);
    const btn = screen.getByRole('button');
    fireEvent.mouseDown(btn);
    expect(btn).toHaveStyle({ backgroundColor: '#2c5282' });
  });

  it('restores background on mouseup', () => {
    render(<Button name="Press me" color="primary" />);
    const btn = screen.getByRole('button');
    fireEvent.mouseEnter(btn);
    fireEvent.mouseDown(btn);
    fireEvent.mouseUp(btn);
    expect(btn).toHaveStyle({ backgroundColor: '#2b6cb0' });
  });

  // ── className ───────────────────────────────────────────────────────────────

  it('applies custom className', () => {
    render(<Button name="Styled" className="my-custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('my-custom-class');
  });

  // ── accessibility ───────────────────────────────────────────────────────────

  it('has aria-disabled when disabled', () => {
    render(<Button name="Submit" disabled />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  });

  it('has aria-disabled=false when enabled', () => {
    render(<Button name="Submit" />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'false');
  });
});
