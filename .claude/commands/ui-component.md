# UI Component Generator

## Purpose

Create a reusable React UI component in `src/components/ui/`, following the exact conventions of this project.

---

## Project Context

This project uses:

- **React** with **TypeScript** (`.tsx`) — confirmed via `tsconfig.json`
- **Vitest** for testing — confirmed via `vitest.config.ts` and `vitest.setup.ts`
- **`@testing-library/react`** for component tests — confirmed via `Avatar.test.tsx`
- **Flat file structure** — components live directly in `src/components/ui/` as `ComponentName.tsx`, not inside subfolders
- **Co-located tests** — test file sits next to the component: `ComponentName.test.tsx`

> Always re-read `Avatar.tsx` and `Avatar.test.tsx` before generating anything. They are the source of truth for code style, prop patterns, and test structure in this project.

---

## Step 1 — Read Existing Patterns First

Before writing a single line, always read:

- `Avatar.tsx` (root or `src/components/ui/`) — source of truth for component style
- `Avatar.test.tsx` — source of truth for test style

Extract and mirror:

- How the props interface is named and exported
- Whether `React.FC` or plain function declaration is used
- How `className` prop is handled and merged
- How variants or conditional classes are structured
- How the test file imports the component
- Which matchers and assertions are used in tests

---

## Step 2 — Gather Requirements

If not already provided by the user, ask for:

- **Component name** — PascalCase (e.g. `Button`, `Badge`, `InputField`)
- **What it does** — one sentence
- **Props** — names, types, and whether they are required or optional
- **Variants** — any visual states (e.g. `size`, `variant`, `color`)

Do not ask about TypeScript, testing library, or file location — those are already known from the project.

---

## Step 3 — File Structure

Always create exactly **two files**, flat in `src/components/ui/`:

```
src/components/ui/
├── ComponentName.tsx        ← the component
└── ComponentName.test.tsx   ← the tests
```

No subdirectories. No separate CSS files unless the user explicitly requests them.

---

## Step 4 — Write the Component (`ComponentName.tsx`)

### Rules

- Match the exact code style of `Avatar.tsx` — function syntax, export style, prop interface naming
- Always define and **export** the props interface so consumers can import the type
- Always accept a `className?: string` prop and merge it onto the root element
- Use `variant` as the prop name for visual alternatives (not `type`, not `color`)
- No hardcoded user-facing strings — all text comes through props
- No hardcoded pixel values or colors — use Tailwind classes or CSS variables
- Prefer a `variantMap` / `sizeMap` object for mapping prop values to classes over inline ternaries

### Template structure to follow

```tsx
// src/components/ui/ComponentName.tsx

import React from "react";

export interface ComponentNameProps {
  // required props first
  // optional props after, each with a JSDoc comment
  /** Additional CSS classes */
  className?: string;
}

const ComponentName: React.FC<ComponentNameProps> = ({
  // destructure with defaults for optional props
  className = "",
}) => {
  return <element className={`base-classes ${className}`}>{/* content */}</element>;
};

export default ComponentName;
```

> Adjust the function signature style (arrow vs declaration) to match whatever `Avatar.tsx` uses.

---

## Step 5 — Write the Tests (`ComponentName.test.tsx`)

### Rules

- Mirror the import style and `describe` block structure from `Avatar.test.tsx` exactly
- Every prop must have at least one test covering its effect
- Always test the default render (no props beyond required ones)
- Always test that `className` is merged correctly onto the root element
- Use `screen` queries — never query by index or container traversal
- Use `userEvent` for interactions if the component has click/keyboard handlers

### Test coverage checklist

- [ ] Renders without crashing with only required props
- [ ] Renders the correct content / label / children
- [ ] Each `variant` or `size` applies the expected class or attribute
- [ ] `disabled` state prevents interaction (if applicable)
- [ ] `onClick` / event handlers are called correctly (if applicable)
- [ ] Custom `className` is appended to the root element
- [ ] Accessibility attributes are present (`aria-*`, `role`) where relevant

### Template structure to follow

```tsx
// src/components/ui/ComponentName.test.tsx

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ComponentName from './ComponentName';

describe('ComponentName', () => {
  it('renders without crashing', () => {
    render(<ComponentName {/* minimum required props */} />);
    // assertion
  });

  it('applies custom className', () => {
    const { container } = render(
      <ComponentName className="custom" {/* required props */} />
    );
    expect(container.firstChild).toHaveClass('custom');
  });

  // one describe block per variant/behavior group if there are many cases
});
```

> Adjust imports and assertion style to match `Avatar.test.tsx` exactly.

---

## Step 6 — Check for a Barrel File

Check whether `src/components/ui/index.ts` exists.

- **If it exists** — append only, do not overwrite:
  ```ts
  export { default as ComponentName } from "./ComponentName";
  export type { ComponentNameProps } from "./ComponentName";
  ```
- **If it does not exist** — do not create it unless the user asks.

---

## Step 7 — Create a Showcase Page (`src/pages/ComponentNamePage.tsx`)

Create a dedicated page that visually demonstrates every prop, variant, and state of the component.

### Rules

- Render the component with **multiple realistic examples** — one per meaningful prop combination
- Each example group must have a visible `<h2>` label describing what it shows
- Use **realistic content** — real-looking labels and values, not `"foo"` or `"test"`
- Export the page as a **default export** named `<ComponentName>Page`
- Keep the page **self-contained** — no external data fetching, no required context providers
- Add **interactive examples** for any props involving user interaction (clicks, inputs, toggles)

### Page template

```tsx
// src/pages/ComponentNamePage.tsx

import React from 'react';
import ComponentName from '../components/ui/ComponentName';

const ComponentNamePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-3xl mx-auto">

        {/* Page header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">ComponentName</h1>
          <p className="mt-2 text-gray-500">
            Visual demo of all variants and states.
          </p>
        </div>

        {/* Repeat this section block for each variant / prop group */}
        <section className="mb-10">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">
            Section title (e.g. Variants / Sizes / States)
          </h2>
          <div className="flex flex-wrap gap-4 items-center p-6 bg-white rounded-xl border border-gray-200">
            <ComponentName {/* realistic props */} />
          </div>
        </section>

      </div>
    </div>
  );
};

export default ComponentNamePage;
```

---

## Step 8 — Register the Route

Find the router / entry-point file. Check these locations in order:

1. `src/App.tsx`
2. `src/router.tsx`
3. `src/main.tsx`

**Always read the file before editing** — never overwrite blindly.

**If a router already exists:** append the new route without removing any existing routes:

```tsx
import ComponentNamePage from "./pages/ComponentNamePage";

// Inside <Routes> — append, never replace existing routes:
<Route path="/component-name" element={<ComponentNamePage />} />;
```

**If no router exists yet:** do NOT install `react-router-dom` automatically. Instead, add a simple toggle to `App.tsx` that switches between the existing view and the new demo page. Preserve all existing `App.tsx` content inside the `!showDemo` block — never delete or reformat it:

```tsx
// Minimal no-router toggle — add at the top of the existing App component
const [showDemo, setShowDemo] = React.useState(false);

return (
  <>
    {/* Unobtrusive toggle button fixed in top-right corner */}
    <div style={{ position: 'fixed', top: 0, right: 0, zIndex: 9999,
      padding: '6px 12px', background: '#1e293b', borderBottomLeftRadius: '8px' }}>
      <button
        onClick={() => setShowDemo(v => !v)}
        style={{ color: '#fff', fontSize: '13px', cursor: 'pointer', border: 'none', background: 'none' }}
      >
        {showDemo ? '← Back to App' : 'View ComponentName Demo →'}
      </button>
    </div>

    {!showDemo && (/* existing App JSX — completely unchanged */)}
    {showDemo && <ComponentNamePage />}
  </>
);
```

Note the no-router approach in the output summary and recommend the user add `react-router-dom` manually if they plan to add more pages.

---

## Step 9 — Add a Header Nav Link

Find the header / navigation component. Check these locations in order:

1. `src/components/Header.tsx`
2. `src/components/Nav.tsx`
3. `src/layout/Header.tsx`
4. `src/layout/Nav.tsx`
5. Any component that renders a `<nav>` or `<header>` tag

**Always read the file before editing** — never overwrite blindly. **Append only** — never remove existing links.

**If a header exists:** add a new `<NavLink>` for the new page:

```tsx
<NavLink to="/component-name">ComponentName</NavLink>
```

**If no header exists:** create `src/components/Header.tsx` and render it inside `App.tsx` at the top level (inside the router but outside `<Routes>`):

```tsx
// src/components/Header.tsx
import React from "react";
import { NavLink } from "react-router-dom";

const Header: React.FC = () => (
  <nav className="flex gap-4 p-4 bg-white border-b border-gray-200">
    <NavLink to="/component-name">ComponentName</NavLink>
  </nav>
);

export default Header;
```

> If no router is present, use a plain `<a>` tag as a placeholder and note it in the output summary.

---

## Step 10 — Output Summary

After all files are created, respond with:

1. **Files created** — full path of every file written or edited
2. **Props table** — markdown table: Prop | Type | Default | Required | Description
3. **Usage example** — minimal working snippet:

   ```tsx
   import ComponentName from '@/components/ui/ComponentName';

   <ComponentName
     {/* required props */}
     {/* most common optional props */}
   />
   ```

4. **How to view the demo:**
   - With router: `npm run dev` → open `http://localhost:5173/component-name`
   - Without router: `npm run dev` → click **"View ComponentName Demo →"** in the top-right corner
5. **Test command:**
   ```bash
   npx vitest run src/components/ui/ComponentName.test.tsx
   ```

---

## Constraints

| Rule                                             | Reason                                                |
| ------------------------------------------------ | ----------------------------------------------------- |
| Always read `Avatar.tsx` first                   | Single source of truth for code style                 |
| Always read `Avatar.test.tsx` first              | Single source of truth for test style                 |
| Always read router / header files before editing | Never overwrite existing routes or nav links          |
| Flat files only — no subdirectories              | Matches current project structure                     |
| TypeScript always — no `.jsx` or `.js`           | Project is fully TypeScript                           |
| Vitest + `@testing-library/react` only           | Already configured, no new deps                       |
| Never use `any`                                  | Use proper types or `unknown`                         |
| Never skip the test file                         | Tests are co-located and required                     |
| Never skip the showcase page                     | Every component needs a visual preview                |
| Never delete existing `App.tsx` content          | Only append or wrap, never replace                    |
| **Never install new packages automatically**     | Get explicit user approval before adding dependencies |
| Demo page must show all variants and states      | Placeholder/lorem content is not acceptable           |

---

## Example Invocations

```
/ui-component Button with variants primary, secondary, danger and a disabled state
/ui-component Badge showing a label and a color variant (success, warning, error, info)
/ui-component InputField with label, placeholder, error message, and disabled state
/ui-component Spinner with size variants sm, md, lg
/ui-component Tooltip wrapping children with a text prop and position top/bottom/left/right
```

## Review the Work

- **Invoke the ui-ux-reviewer subagent** to review your work and implement suggestions where needed
- Iterate in the review process when needed
