# Design System: Sahil New In

## 1. Visual Theme & Atmosphere

Modern, clean, and content-focused. The aesthetic balances professional minimalism with bold accent colors. Heavy use of responsive fluid spacing with large viewport-based padding. The design prioritizes readability and visual hierarchy through font contrast (delicate Rische for headlines vs. clean Geist for body).

## 2. Color Palette & Roles

| Color Name | Hex Code | Role |
|------------|----------|------|
| Default Light | #f5f5f7 | Background, page surface |
| Default Dark | #131314 | Text, primary content |
| Primary | #db2f27 | CTAs, emphasis, brand accent |
| Secondary | #e7c700 | Highlights, decorative accents |
| Accent | #008cbc | Links, interactive elements |

## 3. Typography Rules

**Primary Font:** Geist Sans (system fallback: Arial)
- Body text, UI elements, standard content

**Monospace Font:** Geist Mono
- Code, technical content

**Display Font:** Rische
- Headlines, section titles (weight: 100)

**Scale:**
- Section titles: 50px (rem(50))
- Base size: 16px

## 4. Component Stylings

### Buttons
- Borderless, background none
- Width: fit-content
- Cursor: pointer
- Font: inherit from parent

### Cards / Containers
- Border-radius: 10px (rem(10))
- Images: 16:9 aspect ratio, object-fit cover
- Full width with overflow hidden

### Forms
- Select inputs: 1px solid dark border, 8px radius, 8px 16px padding
- Inputs, textareas, buttons: inherit font styling

### Lists
- No default list styling (list-style: none)

### Links
- Inherit color, no underline
- Display: block
- Font: inherit

## 5. Layout Principles

**Responsive Padding Strategy:**
- Default (mobile): 4vw horizontal padding
- Large (1025px+): 12vw horizontal padding
- XXLarge (2040px+): 20vw horizontal padding

**Full Width Container:**
- Max-width: 100%
- Viewport-width based sizing
- Fluid padding that increases on larger screens

**Content Width:**
- Standard content padding: 6vw (mobile), 4vw (large), 10vw (xlarge)

**Easing:**
- Default animation easing: cubic-bezier(0.45, 0, 0.55, 1)

## 6. Breakpoints

| Name | Min Width |
|------|-----------|
| medium | 820px |
| large | 1025px |
| xlarge | 1450px |
| xxlarge | 2040px |

## 7. Utility Mixins

- `full_width` — Responsive full-width container with fluid padding
- `full_padding_x` — Horizontal padding utility
- `project_img` — 16:9 aspect ratio image container with cover fit
- `font_rische` — Display font mixin (100 weight)
- `breakpoint(size)` — Media query mixin for responsive design