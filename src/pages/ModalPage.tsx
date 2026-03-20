import React, { useState } from 'react';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';

type OpenModal =
  | 'size-sm' | 'size-md' | 'size-lg'
  | 'variant-default' | 'variant-danger' | 'variant-success' | 'variant-info'
  | 'no-title' | 'no-close-btn' | 'no-backdrop-close' | 'with-footer'
  | 'long-content'
  | null;

export default function ModalPage() {
  const [open, setOpen] = useState<OpenModal>(null);
  const close = () => setOpen(null);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7fafc', padding: '48px 40px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>

        {/* Page header */}
        <div style={{ marginBottom: 48 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#1a202c' }}>Modal</h1>
          <p style={{ marginTop: 8, fontSize: 14, color: '#718096', lineHeight: 1.6 }}>
            A clean, accessible dialog with a semi-transparent backdrop.
            Supports size and variant props, optional title, close button, footer, and keyboard/backdrop dismissal.
          </p>
        </div>

        {/* ── Sizes ─────────────────────────────────────────────────────────── */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#a0aec0' }}>
            Sizes
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, padding: 24, backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e2e8f0' }}>
            <Button name="Small (400px)"  size="sm" color="secondary" onClick={() => setOpen('size-sm')} />
            <Button name="Medium (560px)" size="sm" color="secondary" onClick={() => setOpen('size-md')} />
            <Button name="Large (720px)"  size="sm" color="secondary" onClick={() => setOpen('size-lg')} />
          </div>
        </section>

        {/* ── Variants ──────────────────────────────────────────────────────── */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#a0aec0' }}>
            Variants
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, padding: 24, backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e2e8f0' }}>
            <Button name="Default"  size="sm" color="primary"   onClick={() => setOpen('variant-default')} />
            <Button name="Danger"   size="sm" color="danger"    onClick={() => setOpen('variant-danger')} />
            <Button name="Success"  size="sm" color="success"   onClick={() => setOpen('variant-success')} />
            <Button name="Info"     size="sm" color="secondary" onClick={() => setOpen('variant-info')} />
          </div>
        </section>

        {/* ── Configurations ────────────────────────────────────────────────── */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#a0aec0' }}>
            Configurations
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, padding: 24, backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e2e8f0' }}>
            <Button name="No title"              size="sm" color="secondary" onClick={() => setOpen('no-title')} />
            <Button name="No close button"       size="sm" color="secondary" onClick={() => setOpen('no-close-btn')} />
            <Button name="Backdrop locked"       size="sm" color="secondary" onClick={() => setOpen('no-backdrop-close')} />
            <Button name="With footer actions"   size="sm" color="secondary" onClick={() => setOpen('with-footer')} />
            <Button name="Long scrollable content" size="sm" color="secondary" onClick={() => setOpen('long-content')} />
          </div>
        </section>

        {/* Prop reference */}
        <section>
          <h2 style={{ margin: '0 0 16px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#a0aec0' }}>
            Props Reference
          </h2>
          <div style={{ backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            {[
              { prop: 'isOpen',           type: 'boolean',           def: '—',         desc: 'Controls modal visibility (required)' },
              { prop: 'onClose',          type: '() => void',        def: '—',         desc: 'Called on close button / backdrop / Escape (required)' },
              { prop: 'children',         type: 'React.ReactNode',   def: '—',         desc: 'Modal body content (required)' },
              { prop: 'title',            type: 'string',            def: 'undefined', desc: 'Optional heading in the header' },
              { prop: 'size',             type: "'sm'|'md'|'lg'",    def: "'md'",      desc: 'Max-width: 400 / 560 / 720 px' },
              { prop: 'variant',          type: "'default'|'danger'|'success'|'info'", def: "'default'", desc: 'Top border accent color' },
              { prop: 'showCloseButton',  type: 'boolean',           def: 'true',      desc: 'Renders the ✕ button in the header' },
              { prop: 'closeOnBackdrop',  type: 'boolean',           def: 'true',      desc: 'Dismiss by clicking the backdrop' },
              { prop: 'footer',           type: 'React.ReactNode',   def: 'undefined', desc: 'Optional footer slot (right-aligned)' },
              { prop: 'className',        type: 'string',            def: "''",        desc: 'Extra class on the modal panel' },
            ].map(({ prop, type, def, desc }, i) => (
              <div
                key={prop}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '140px 200px 100px 1fr',
                  padding: '10px 20px',
                  fontSize: 13,
                  backgroundColor: i % 2 === 0 ? '#fff' : '#f7fafc',
                  borderBottom: i < 9 ? '1px solid #edf2f7' : 'none',
                  gap: 8,
                  alignItems: 'center',
                }}
              >
                <code style={{ fontFamily: 'monospace', color: '#3182ce', fontSize: 12 }}>{prop}</code>
                <code style={{ fontFamily: 'monospace', color: '#718096', fontSize: 11 }}>{type}</code>
                <code style={{ fontFamily: 'monospace', color: '#a0aec0', fontSize: 11 }}>{def}</code>
                <span style={{ color: '#4a5568' }}>{desc}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── Size modals ────────────────────────────────────────────────────────── */}
      <Modal isOpen={open === 'size-sm'} onClose={close} size="sm" title="Small Modal">
        <p style={{ margin: 0 }}>This modal has a max-width of 400 px — ideal for quick confirmations or short messages.</p>
      </Modal>

      <Modal isOpen={open === 'size-md'} onClose={close} size="md" title="Medium Modal">
        <p style={{ margin: 0 }}>This is the default size at 560 px. A good fit for forms, detail views, or multi-step flows.</p>
      </Modal>

      <Modal isOpen={open === 'size-lg'} onClose={close} size="lg" title="Large Modal">
        <p style={{ margin: 0 }}>The large variant stretches to 720 px, giving plenty of room for data-heavy content like tables or previews.</p>
      </Modal>

      {/* ── Variant modals ─────────────────────────────────────────────────────── */}
      <Modal isOpen={open === 'variant-default'} onClose={close} variant="default" title="Default Variant">
        <p style={{ margin: 0 }}>The blue top border is used for general-purpose dialogs — informational prompts, settings, and neutral actions.</p>
      </Modal>

      <Modal
        isOpen={open === 'variant-danger'}
        onClose={close}
        variant="danger"
        title="Delete Account"
        footer={
          <>
            <Button name="Cancel" color="secondary" size="sm" onClick={close} />
            <Button name="Delete account" color="danger" size="sm" onClick={close} />
          </>
        }
      >
        <p style={{ margin: 0 }}>
          Are you sure you want to delete your account? <strong>This action cannot be undone.</strong> All your data, workspaces, and integrations will be permanently removed.
        </p>
      </Modal>

      <Modal isOpen={open === 'variant-success'} onClose={close} variant="success" title="Changes Saved">
        <p style={{ margin: 0 }}>Your profile has been updated successfully. The changes are live and visible to your team.</p>
      </Modal>

      <Modal isOpen={open === 'variant-info'} onClose={close} variant="info" title="What's New in v3.2">
        <p style={{ margin: 0 }}>
          We've shipped faster search, redesigned notifications, and a new command palette. Press <kbd style={{ background: '#edf2f7', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>⌘ K</kbd> anywhere to try it.
        </p>
      </Modal>

      {/* ── Configuration modals ───────────────────────────────────────────────── */}
      <Modal isOpen={open === 'no-title'} onClose={close}>
        <p style={{ margin: 0, textAlign: 'center', paddingTop: 8 }}>
          This modal has no <code style={{ background: '#edf2f7', padding: '1px 5px', borderRadius: 4, fontSize: 13 }}>title</code> prop. The close button still floats in the top-right corner and the backdrop click still works.
        </p>
      </Modal>

      <Modal isOpen={open === 'no-close-btn'} onClose={close} showCloseButton={false} title="Locked Header">
        <p style={{ margin: '0 0 12px' }}>The ✕ button is hidden. You can still dismiss this modal by clicking the backdrop or pressing <kbd style={{ background: '#edf2f7', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>Esc</kbd>.</p>
        <Button name="Got it" color="primary" size="sm" onClick={close} />
      </Modal>

      <Modal isOpen={open === 'no-backdrop-close'} onClose={close} closeOnBackdrop={false} title="Backdrop Locked">
        <p style={{ margin: '0 0 12px' }}>Clicking outside this modal does nothing. Use the close button or <kbd style={{ background: '#edf2f7', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>Esc</kbd> to dismiss.</p>
        <Button name="Dismiss" color="secondary" size="sm" onClick={close} />
      </Modal>

      <Modal
        isOpen={open === 'with-footer'}
        onClose={close}
        title="Unsaved Changes"
        variant="warning"

        footer={
          <>
            <Button name="Discard changes" color="secondary" size="sm" onClick={close} />
            <Button name="Save & continue"  color="primary"   size="sm" onClick={close} />
          </>
        }
      >
        <p style={{ margin: 0 }}>
          You have unsaved changes in this form. Would you like to save them before leaving, or discard them entirely?
        </p>
      </Modal>

      <Modal isOpen={open === 'long-content'} onClose={close} title="Terms of Service" size="md">
        {Array.from({ length: 12 }, (_, i) => (
          <p key={i} style={{ marginTop: 0, marginBottom: 12 }}>
            {i === 0
              ? 'This modal body is scrollable. When content exceeds the viewport height, the panel stays fixed while the body scrolls independently.'
              : `Section ${i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.`}
          </p>
        ))}
      </Modal>
    </div>
  );
}
