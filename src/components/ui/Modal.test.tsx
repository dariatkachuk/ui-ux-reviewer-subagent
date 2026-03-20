import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Modal from './Modal';

describe('Modal', () => {
  // ── Visibility ───────────────────────────────────────────────────────────────

  it('renders when isOpen is true', () => {
    render(<Modal isOpen onClose={() => {}}><p>Content</p></Modal>);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<Modal isOpen={false} onClose={() => {}}><p>Content</p></Modal>);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  // ── Content ──────────────────────────────────────────────────────────────────

  it('renders children inside the modal', () => {
    render(<Modal isOpen onClose={() => {}}><p>Hello world</p></Modal>);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('renders the title when provided', () => {
    render(<Modal isOpen onClose={() => {}} title="Confirm Action"><p>Body</p></Modal>);
    expect(screen.getByText('Confirm Action')).toBeInTheDocument();
  });

  it('renders footer content when provided', () => {
    render(
      <Modal isOpen onClose={() => {}} footer={<button>Save changes</button>}>
        <p>Body</p>
      </Modal>
    );
    expect(screen.getByRole('button', { name: 'Save changes' })).toBeInTheDocument();
  });

  it('does not render footer when footer prop is omitted', () => {
    render(<Modal isOpen onClose={() => {}}><p>Body</p></Modal>);
    expect(screen.queryByRole('button', { name: 'Save changes' })).not.toBeInTheDocument();
  });

  // ── Close interactions ───────────────────────────────────────────────────────

  it('calls onClose when the close button is clicked', () => {
    const onClose = vi.fn();
    render(<Modal isOpen onClose={onClose}><p>Content</p></Modal>);
    fireEvent.click(screen.getByRole('button', { name: 'Close modal' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the backdrop is clicked', () => {
    const onClose = vi.fn();
    const { container } = render(<Modal isOpen onClose={onClose}><p>Content</p></Modal>);
    fireEvent.click(container.firstChild!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when the modal panel itself is clicked', () => {
    const onClose = vi.fn();
    render(<Modal isOpen onClose={onClose}><p>Content</p></Modal>);
    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not call onClose on backdrop click when closeOnBackdrop is false', () => {
    const onClose = vi.fn();
    const { container } = render(
      <Modal isOpen onClose={onClose} closeOnBackdrop={false}><p>Content</p></Modal>
    );
    fireEvent.click(container.firstChild!);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when Escape key is pressed', () => {
    const onClose = vi.fn();
    render(<Modal isOpen onClose={onClose}><p>Content</p></Modal>);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose for non-Escape key presses', () => {
    const onClose = vi.fn();
    render(<Modal isOpen onClose={onClose}><p>Content</p></Modal>);
    fireEvent.keyDown(document, { key: 'Enter' });
    expect(onClose).not.toHaveBeenCalled();
  });

  // ── showCloseButton ──────────────────────────────────────────────────────────

  it('shows the close button by default', () => {
    render(<Modal isOpen onClose={() => {}}><p>Content</p></Modal>);
    expect(screen.getByRole('button', { name: 'Close modal' })).toBeInTheDocument();
  });

  it('hides the close button when showCloseButton is false', () => {
    render(<Modal isOpen onClose={() => {}} showCloseButton={false}><p>Content</p></Modal>);
    expect(screen.queryByRole('button', { name: 'Close modal' })).not.toBeInTheDocument();
  });

  // ── size variant ─────────────────────────────────────────────────────────────

  it('defaults to md size (maxWidth 560px)', () => {
    render(<Modal isOpen onClose={() => {}}><p>Content</p></Modal>);
    expect(screen.getByRole('dialog')).toHaveStyle({ maxWidth: '560px' });
  });

  it('applies sm size (maxWidth 400px)', () => {
    render(<Modal isOpen onClose={() => {}} size="sm"><p>Content</p></Modal>);
    expect(screen.getByRole('dialog')).toHaveStyle({ maxWidth: '400px' });
  });

  it('applies lg size (maxWidth 720px)', () => {
    render(<Modal isOpen onClose={() => {}} size="lg"><p>Content</p></Modal>);
    expect(screen.getByRole('dialog')).toHaveStyle({ maxWidth: '720px' });
  });

  // ── variant ──────────────────────────────────────────────────────────────────

  it('applies default variant accent color', () => {
    render(<Modal isOpen onClose={() => {}}><p>Content</p></Modal>);
    expect(screen.getByRole('dialog')).toHaveStyle({ borderTopColor: '#3182ce' });
  });

  it('applies danger variant accent color', () => {
    render(<Modal isOpen onClose={() => {}} variant="danger"><p>Content</p></Modal>);
    expect(screen.getByRole('dialog')).toHaveStyle({ borderTopColor: '#e53e3e' });
  });

  it('applies success variant accent color', () => {
    render(<Modal isOpen onClose={() => {}} variant="success"><p>Content</p></Modal>);
    expect(screen.getByRole('dialog')).toHaveStyle({ borderTopColor: '#38a169' });
  });

  it('applies info variant accent color', () => {
    render(<Modal isOpen onClose={() => {}} variant="info"><p>Content</p></Modal>);
    expect(screen.getByRole('dialog')).toHaveStyle({ borderTopColor: '#319795' });
  });

  it('applies warning variant accent color', () => {
    render(<Modal isOpen onClose={() => {}} variant="warning"><p>Content</p></Modal>);
    expect(screen.getByRole('dialog')).toHaveStyle({ borderTopColor: '#dd6b20' });
  });

  // ── className ────────────────────────────────────────────────────────────────

  it('applies custom className to the dialog panel', () => {
    render(<Modal isOpen onClose={() => {}} className="my-modal"><p>Content</p></Modal>);
    expect(screen.getByRole('dialog')).toHaveClass('my-modal');
  });

  // ── accessibility ────────────────────────────────────────────────────────────

  it('has aria-modal="true" on the dialog element', () => {
    render(<Modal isOpen onClose={() => {}}><p>Content</p></Modal>);
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('has aria-describedby="modal-description" on the dialog element', () => {
    render(<Modal isOpen onClose={() => {}}><p>Content</p></Modal>);
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-describedby', 'modal-description');
  });

  it('dialog is programmatically focusable (tabIndex=-1)', () => {
    render(<Modal isOpen onClose={() => {}}><p>Content</p></Modal>);
    expect(screen.getByRole('dialog')).toHaveAttribute('tabindex', '-1');
  });

  it('has aria-labelledby pointing to modal-title when title is provided', () => {
    render(<Modal isOpen onClose={() => {}} title="Settings"><p>Content</p></Modal>);
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-labelledby', 'modal-title');
  });

  it('title element has id="modal-title"', () => {
    render(<Modal isOpen onClose={() => {}} title="Delete Account"><p>Content</p></Modal>);
    expect(document.getElementById('modal-title')).toHaveTextContent('Delete Account');
  });

  it('has aria-label="Modal" when no title is provided', () => {
    render(<Modal isOpen onClose={() => {}}><p>Content</p></Modal>);
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'Modal');
  });

  it('close button has accessible aria-label', () => {
    render(<Modal isOpen onClose={() => {}}><p>Content</p></Modal>);
    expect(screen.getByRole('button', { name: 'Close modal' })).toBeInTheDocument();
  });
});
