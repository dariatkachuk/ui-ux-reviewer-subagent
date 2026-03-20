import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Avatar from './Avatar';

describe('Avatar', () => {
  it('renders initials for a two-word name', () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByRole('img', { name: 'John Doe' })).toHaveTextContent('JD');
  });

  it('renders single initial for a one-word name', () => {
    render(<Avatar name="Alice" />);
    expect(screen.getByRole('img', { name: 'Alice' })).toHaveTextContent('A');
  });

  it('caps initials at 2 chars for multi-word names', () => {
    render(<Avatar name="Jean Claude Van Damme" />);
    expect(screen.getByRole('img', { name: 'Jean Claude Van Damme' })).toHaveTextContent('JC');
  });

  it('applies default size of 40px', () => {
    render(<Avatar name="Bob Smith" />);
    const el = screen.getByRole('img', { name: 'Bob Smith' });
    expect(el).toHaveStyle({ width: '40px', height: '40px' });
  });

  it('applies custom size', () => {
    render(<Avatar name="Bob Smith" size={56} />);
    const el = screen.getByRole('img', { name: 'Bob Smith' });
    expect(el).toHaveStyle({ width: '56px', height: '56px' });
  });

  it('applies explicit bgColor', () => {
    render(<Avatar name="Alice" bgColor="#7c3aed" />);
    const el = screen.getByRole('img', { name: 'Alice' });
    expect(el).toHaveStyle({ backgroundColor: '#7c3aed' });
  });

  it('applies custom textColor', () => {
    render(<Avatar name="Alice" textColor="#000" />);
    const el = screen.getByRole('img', { name: 'Alice' });
    expect(el).toHaveStyle({ color: '#000' });
  });

  it('applies custom fontSize', () => {
    render(<Avatar name="Alice" fontSize={20} />);
    const el = screen.getByRole('img', { name: 'Alice' });
    expect(el).toHaveStyle({ fontSize: '20px' });
  });

  it('defaults fontSize to 40% of size', () => {
    render(<Avatar name="Alice" size={50} />);
    const el = screen.getByRole('img', { name: 'Alice' });
    expect(el).toHaveStyle({ fontSize: '20px' });
  });

  it('generates the same auto color for the same name', () => {
    const { rerender } = render(<Avatar name="Stable Name" />);
    const color1 = (screen.getByRole('img', { name: 'Stable Name' }) as HTMLElement).style.backgroundColor;
    rerender(<Avatar name="Stable Name" />);
    const color2 = (screen.getByRole('img', { name: 'Stable Name' }) as HTMLElement).style.backgroundColor;
    expect(color1).toBe(color2);
  });

  it('renders as a circle (border-radius 50%)', () => {
    render(<Avatar name="Alice" />);
    const el = screen.getByRole('img', { name: 'Alice' });
    expect(el).toHaveStyle({ borderRadius: '50%' });
  });
});
