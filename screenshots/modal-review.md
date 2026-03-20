# Modal Component — UX/Accessibility Review

**Reviewed on:** 2026-03-16
**Viewports tested:** Desktop (1280×800), Mobile (375×812)

---

## Screenshots

| File | Description |
|------|-------------|
| `modal-01-default-page.png` | Demo page — all sections visible |
| `modal-02-small-modal.png` | Small (400px) modal open |
| `modal-03-large-modal.png` | Large (720px) modal open |
| `modal-04-danger-modal.png` | Danger variant (Delete Account) |
| `modal-05-footer-actions-modal.png` | Footer actions (Unsaved Changes) |
| `modal-06-no-title-modal.png` | No-title configuration |
| `modal-07-mobile-page.png` | Demo page at 375px |
| `modal-08-mobile-small-modal.png` | Small modal at 375px |
| `modal-09-focus-close-button.png` | Tab focus — close button (no ring visible) |
| `modal-10-focus-footer-button.png` | Tab focus — close button (ring visible) |

---

## Visual Design — 8/10

### Strengths
- The backdrop is excellent — `rgba(15, 23, 42, 0.5)` with `blur(3px)` produces a rich, modern frosted-glass effect. The dark-navy tint gives it premium depth without fully obscuring context.
- The top accent border (`3px solid`) is a clean, well-established pattern for signaling semantic intent (danger red, success green, etc.).
- Box shadow combination `0 24px 64px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.10)` is well-layered — convincing elevation without looking cartoonish.
- `border-radius: 12px` is appropriately generous and consistent across all modal sizes.
- The header divider line (`1px solid #edf2f7`) provides clean visual separation without being heavy.
- The footer button layout (right-aligned, 8px gap, "Discard" before "Save") follows the correct primary-action-last convention.
- The demo page is well-structured: uppercase 11px section labels, card containers with subtle borders, and an inline props-reference table.

### Issues

| Severity | Issue | Recommendation |
|----------|-------|----------------|
| 🟡 Important | Close button is **32×32px**, below the 44×44px minimum touch target guideline. Painful on mobile. | Increase to `width: 44px; height: 44px` while keeping the visible icon size unchanged. |
| 🟡 Important | Close button default color `#a0aec0` on white may not clear WCAG SC 1.4.11 (3:1 UI component contrast). | Nudge to `#718096` to clear the threshold. |
| 🟡 Important | "No title" modal: close button floats alone in a header wrapper — awkward layout with top accent and no title. | When `title` is undefined, use `position: absolute` for the close button and remove the header wrapper entirely. |
| 🟡 Important | `variant="warning"` used in `ModalPage.tsx` did not exist in `variantMap` — silently produced no border. | Added `warning: '#dd6b20'` to `variantMap` and the `ModalVariant` type. ✅ Fixed |
| 🟢 Minor | `fontFamily: 'sans-serif'` renders inconsistently across platforms (Arial on Windows, Helvetica on macOS). | Adopt `'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'`. |
| 🟢 Minor | No entrance/exit animation — modal appears instantaneously. | Add a CSS keyframe (`opacity` + `scale` from 0.96) gated behind `prefers-reduced-motion`. |

---

## User Experience — 8/10

### Strengths
- Escape key and backdrop click dismissal both work correctly.
- `closeOnBackdrop={false}` works as advertised.
- "With footer actions" modal correctly orders actions: destructive left, primary right.
- Danger modal body bolds "This action cannot be undone." — surfaces critical information appropriately.
- Scrollable body is correctly scoped: header and footer stay fixed while content scrolls.
- Props reference table on the demo page is thorough and developer-friendly.

### Issues

| Severity | Issue | Recommendation |
|----------|-------|----------------|
| 🔴 Critical | Danger modal had **no action buttons** — a "Delete Account" warning with only a close button is a dead end. | Added Cancel + "Delete account" footer buttons to the demo. ✅ Fixed |
| 🟡 Important | "No title" modal used `textAlign: center` on body text, making multi-line text harder to read. | Left-align body text universally. |
| 🟡 Important | **No focus trap** — Tab can escape the modal into the blurred background. | Implemented Tab/Shift+Tab trap in `useEffect` using `querySelectorAll` of focusable elements. ✅ Fixed |
| 🟡 Important | **No scroll lock** — background page scrolls while modal is open. | Added `document.body.style.overflow = 'hidden'` on open, restored on close. ✅ Fixed |
| 🟡 Important | `variant="warning"` bug (see Visual Design) also meant the "Unsaved Changes" modal showed the wrong visual signal. | Fixed by adding `warning` variant. ✅ Fixed |
| 🟢 Minor | Variant demo trigger buttons used colored buttons, implying the modal body would be tinted (it is not — only the top border changes). | Use neutral/secondary buttons for all demo triggers, or add a label explaining the effect. |

---

## Accessibility — 7/10 (WCAG 2.1 AA: Partial)

### Strengths
- `role="dialog"` and `aria-modal="true"` correctly applied.
- `aria-labelledby="modal-title"` when title is present; `aria-label="Modal"` as fallback.
- `<h2 id="modal-title">` is the correct heading level for a dialog title.
- Escape key handling via `document`-level `keydown` listener.
- Close button has `aria-label="Close modal"`.
- `stopPropagation` on dialog panel prevents backdrop-click firing inside the modal.
- Visible focus ring present on close button (browser default).

### Issues

| Severity | Issue | Recommendation |
|----------|-------|----------------|
| 🔴 Critical | **Focus not moved into the modal on open** (WCAG SC 2.4.3). Keyboard focus stayed on the trigger button. | Added `dialogRef.current?.focus()` in `useEffect` + `tabIndex={-1}` on the dialog div. ✅ Fixed |
| 🔴 Critical | **Focus not returned to trigger on close** (WCAG SC 2.4.3). Focus went to `<body>` after closing. | Saved `document.activeElement` before open; restored via `previouslyFocused?.focus()` in cleanup. ✅ Fixed |
| 🔴 Critical | **No focus trap** (WCAG SC 2.1.2). Tab escaped into background content. | Implemented trap in the same `useEffect` as the Escape handler. ✅ Fixed |
| 🟡 Important | Close button focus ring was raw browser default — inconsistent across browsers. | Added explicit `outline: '2px solid #3182ce'` via `closeBtnFocused` state. ✅ Fixed |
| 🟡 Important | `✕` Unicode character renders at unexpected sizes cross-platform. | Replaced with inline SVG `<path d="M1 1l12 12M13 1L1 13" .../>` with `aria-hidden="true"`. ✅ Fixed |
| 🟡 Important | No `aria-describedby` on dialog — screen readers don't announce body text automatically. | Added `id="modal-description"` on body div and `aria-describedby="modal-description"` on dialog. ✅ Fixed |
| 🟡 Important | Scroll lock missing (accessibility dimension: arrow-key navigation shifts background). | Fixed via `document.body.style.overflow`. ✅ Fixed |
| 🟢 Minor | `aria-label="Modal"` fallback is generic — unhelpful to screen reader users when no title is provided. | Encourage consumers to always pass `title` or a meaningful `aria-label`. |
| 🟢 Minor | No `prefers-reduced-motion` consideration for future animations. | Gate any future animation in `@media (prefers-reduced-motion: no-preference)`. |

---

## Overall Score: 7.5 / 10

The component is visually polished — the backdrop blur, layered shadow, and accent border are production-quality. The primary gaps were in focus management (three critical WCAG failures) and a handful of demo/variant bugs.

### What was fixed after the review

| Fix | Status |
|-----|--------|
| Focus moves into modal on open | ✅ |
| Focus returns to trigger on close | ✅ |
| Tab/Shift+Tab trapped inside modal | ✅ |
| Scroll lock on `document.body` | ✅ |
| `warning` variant added to type + variantMap | ✅ |
| Danger modal demo given Cancel + Delete footer buttons | ✅ |
| `aria-describedby="modal-description"` on dialog | ✅ |
| Close button touch target increased to 44×44px | ✅ |
| Close button color nudged to `#718096` for contrast | ✅ |
| Close button explicit focus ring via state | ✅ |
| Close button icon replaced with SVG | ✅ |
| Titleless modal close button uses `position: absolute` | ✅ |

### Remaining recommendations (not yet implemented)

- Entrance animation (`opacity` + `scale`) gated behind `prefers-reduced-motion`
- Consistent font stack (`Inter, -apple-system, …`)
- Neutral trigger buttons on the Variants demo section
