---
name: Modal component design system conventions
description: Design tokens, styling approach, and component patterns used in this React project
type: project
---

This project uses inline React styles (no CSS-in-JS library, no Tailwind). Components are hand-crafted with a Chakra UI-inspired color palette.

**Color tokens in use:**
- Background page: `#f7fafc`
- Modal panel bg: `#ffffff`
- Title text: `#1a202c`
- Body text: `#4a5568`
- Muted/placeholder: `#718096`, `#a0aec0`
- Border subtle: `#edf2f7`, `#e2e8f0`
- Primary accent: `#3182ce` (blue)
- Danger: `#e53e3e`
- Success: `#38a169`
- Info: `#319795`

**Typography:**
- Font family: `sans-serif` (system stack, no web font loaded)
- Page h1: 28px / weight 800
- Section labels: 11px / weight 700 / uppercase / letter-spacing 0.08em
- Modal title (h2): 18px / weight 700
- Body text: 14px / line-height 1.6

**Component structure:**
- Modal: backdrop div > dialog div (role=dialog, aria-modal, aria-labelledby) > header > body > footer
- Sizes: sm=400px, md=560px, lg=720px max-width
- Variants: default/danger/success/info — expressed only as a top border accent color
- Dev server: Vite at http://localhost:5173
- Nav: top-right dark bar with buttons: Button | InputText | Modal

**Why:** Establishes baseline for all future component reviews in this repo.
**How to apply:** Use these tokens when suggesting color or spacing fixes to keep suggestions consistent with the existing palette.
