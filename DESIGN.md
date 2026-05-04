# High-Contrast Modern Portfolio Design System

## Vibe, Aesthetic & Brand Persona
- **Visual Context**: A modern, high-contrast, gallery-like portfolio. It uses bold typography, generous whitespace, and physics-based micro-interactions to create a premium, immersive experience. The brand persona is confident, creative, and highly polished, relying on large typography rather than complex graphics to make a statement.
- **Target Emotion**: Premium, authoritative, artistic, and highly engaging. Designed to evoke awe and a sense of refined craftsmanship. Target audience: high-end clients, design agencies, and creative peers.
- **Key UI Patterns**: Oversized typography with character-reveals on scroll, parallax hero elements, interactive magnetic blobs in the background, large project numbers, and smooth accordion FAQs.

## Colors & Theming Context
- **Color Philosophy**: A high-contrast dual-tone approach with off-white and near-black, punctuated by distinct primary and secondary accents that bring life to the layout via animated blobs.
- **Backgrounds**: 
  - `#f5f5f7` (`--bg-offwhite`, `$color_default_light`) — Main page background.
  - `#ffffff` (`--bg-pure`, `$color_default_dark`) — Project cards background.
- **Text**: 
  - `#131314` (`--text-dark`) — Primary text, paragraphs, and standard headings.
  - `rgba(19, 19, 20, 0.6)` (`--text-muted`) — Subtitles and secondary information.
- **Primary/Accent**: 
  - `#db2f27` (`--primary-red`, `$color_primary`) — Used for major standout headings, hero text, and primary animated background blob.
  - `#e7c700` (`--secondary-yellow`, `$color_secondary`) — Used for secondary animated background blob and highlights.
  - `#008cbc` (`--accent-cyan`, `$color_accent`) — Used for links and interactive elements.
- **Gradients & Shadows**: 
  - `0 10px 30px rgba(0,0,0,0.05)` — Subtle drop shadow used on project cards for depth against the off-white background.
  - `blur(80px)` — Backdrop filter and standard filter used on colored background blobs.


## Typography Context
- **Typographic Voice**: Bold and expressive headings paired with clean, highly readable body copy to maintain structural clarity while still being artistic.
- **Headings**: `rische` (or Playfair Display fallback) — Display serif.
  - Hero Title (`h1`): clamp(3rem, 8vw, 6rem) / weight 400 / line-height 1.1 / color `--primary-red`.
  - Section Titles (`h2`): clamp(2.5rem, 5vw, 4rem) / weight 400 / line-height 1.1 / color `--primary-red`.
- **Body**: `Geist` (or Inter fallback) — Clean sans-serif.
  - Paragraphs (`p`): 16px / weight 400 / line-height 1.6 / color `--text-dark`.
  - Subheaders (`h3`): 24px / weight 300 / line-height 1.6 / color `--primary-red`.
  - Tags/Meta (`Geist Mono`): 13.6px (0.85rem) / weight 500 / uppercase / letter-spacing 0.05em.

## Layout & Spatial Context
- **Layout Philosophy**: Airy and sparse. Content is allowed to breathe, giving the user focus on the large typographic elements and high-quality imagery or project showcases.
- **Container**: Max-width of 1200px, horizontally centered.
- **Spacing System**: Base unit of 8px. Common gaps are 48px (3rem). Section padding is 64px to 128px vertically.
- **Component Structures**:
  - **Hero**: Full viewport height. Features a massive slanted typography treatment. Background is minimal except for the magnetic, blurred color blobs.
  - **About/Content Sections**: Background off-white. Text columns are constrained to 60ch for optimal readability. 
  - **Work/Project Carousel**: Grid layout (`grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`) with 48px gap. Cards have pure white backgrounds with subtle shadows.
  - **CTA Sections**: Clean layouts with pill-shaped outline buttons.
- **Header/Navbar**: Sticky header with logo on left, navigation links on right. 
- **Footer**: Simple layout, social links, copyright.
- **Whole Website Padding**: Horizontal padding of 32px (2rem) on desktop, 16px (1rem) on mobile. Vertical section padding of 64px (4rem).
- **Element-Specific Padding**: Button padding is 16px 32px (1rem 2rem). Card padding is 32px (2rem). Tag padding is 4px 12px (0.25rem 0.75rem).

## Responsive Layout Strategy
- **Breakpoints**: 
  - `1024px` — Tablet landscape
  - `768px` — Tablet portrait
  - `480px` — Mobile
- **Mobile Behavior**: Fluid typography scales down h1/h2 via clamp(). Grids reflow from multiple columns to single column. 
- **Tablet Behavior**: Intermediate adaptations, mostly grid columns adjusting from 3 to 2.
- **Responsive Navigation**: Navbar links collapse into a hamburger menu opening a full-screen or drawer overlay.
- **Responsive Spacing**: Section padding reduces from 64px to 32px. Card gaps reduce from 48px to 24px.

## Animations, Interactions & Motion Context
- **Motion Philosophy**: Elastic and physics-based. It feels highly responsive to user input, avoiding stiff, linear transitions.
- **Micro-interactions**: Links and buttons use a 0.3s ease transition. Buttons change background to text color and text to background color, with slight letter-spacing expansion (0.05em).
- **Custom Cursor**: Custom cursor that scales up when hovering over clickable elements and reveals text like "View Project".
- **Element States**: 
  - Button Default: Transparent background, dark text/border. 
  - Button Hover: Dark background, light text, 0.05em letter spacing, 0.3s ease.
- **Interactive Background Animations**: Two major blurred blobs (Red and Yellow) that float and follow cursor movement loosely with spring physics.
- **Scroll Animations**: Smooth scroll using Lenis. Hero elements translate Y on scroll (parallax). Text enters via character-by-character reveal (staggered) on viewport enter.
- **Page Transitions**: Standard SPA-like transitions (likely Framer Motion route transitions) fading out current content and sliding in new content.
- **Libraries Detected**: Framer Motion, Lenis (for smooth scroll), potentially GSAP for timeline animations.
# High-Contrast Modern Portfolio Design System

## Vibe, Aesthetic & Brand Persona
- **Visual Context**: A modern, high-contrast, gallery-like portfolio. It uses bold typography, generous whitespace, and physics-based micro-interactions to create a premium, immersive experience. The brand persona is confident, creative, and highly polished, relying on large typography rather than complex graphics to make a statement.
- **Target Emotion**: Premium, authoritative, artistic, and highly engaging. Designed to evoke awe and a sense of refined craftsmanship. Target audience: high-end clients, design agencies, and creative peers.
- **Key UI Patterns**: Oversized typography with character-reveals on scroll, parallax hero elements, interactive magnetic blobs in the background, large project numbers, and smooth accordion FAQs.

## Colors & Theming Context
- **Color Philosophy**: A high-contrast dual-tone approach with off-white and near-black, punctuated by distinct primary and secondary accents that bring life to the layout via animated blobs.
- **Backgrounds**: 
  - `#f5f5f7` (`--bg-offwhite`, `$color_default_light`) — Main page background.
  - `#ffffff` (`--bg-pure`, `$color_default_dark`) — Project cards background.
- **Text**: 
  - `#131314` (`--text-dark`) — Primary text, paragraphs, and standard headings.
  - `rgba(19, 19, 20, 0.6)` (`--text-muted`) — Subtitles and secondary information.
- **Primary/Accent**: 
  - `#db2f27` (`--primary-red`, `$color_primary`) — Used for major standout headings, hero text, and primary animated background blob.
  - `#e7c700` (`--secondary-yellow`, `$color_secondary`) — Used for secondary animated background blob and highlights.
  - `#008cbc` (`--accent-cyan`, `$color_accent`) — Used for links and interactive elements.
- **Gradients & Shadows**: 
  - `0 10px 30px rgba(0,0,0,0.05)` — Subtle drop shadow used on project cards for depth against the off-white background.
  - `blur(80px)` — Backdrop filter and standard filter used on colored background blobs.


## Typography Context
- **Typographic Voice**: Bold and expressive headings paired with clean, highly readable body copy to maintain structural clarity while still being artistic.
- **Headings**: `rische` (or Playfair Display fallback) — Display serif.
  - Hero Title (`h1`): clamp(3rem, 8vw, 6rem) / weight 400 / line-height 1.1 / color `--primary-red`.
  - Section Titles (`h2`): clamp(2.5rem, 5vw, 4rem) / weight 400 / line-height 1.1 / color `--primary-red`.
- **Body**: `Geist` (or Inter fallback) — Clean sans-serif.
  - Paragraphs (`p`): 16px / weight 400 / line-height 1.6 / color `--text-dark`.
  - Subheaders (`h3`): 24px / weight 300 / line-height 1.6 / color `--primary-red`.
  - Tags/Meta (`Geist Mono`): 13.6px (0.85rem) / weight 500 / uppercase / letter-spacing 0.05em.

## Layout & Spatial Context
- **Layout Philosophy**: Airy and sparse. Content is allowed to breathe, giving the user focus on the large typographic elements and high-quality imagery or project showcases.
- **Container**: Max-width of 1200px, horizontally centered.
- **Spacing System**: Base unit of 8px. Common gaps are 48px (3rem). Section padding is 64px to 128px vertically.
- **Component Structures**:
  - **Hero**: Full viewport height. Features a massive slanted typography treatment. Background is minimal except for the magnetic, blurred color blobs.
  - **About/Content Sections**: Background off-white. Text columns are constrained to 60ch for optimal readability. 
  - **Work/Project Carousel**: Grid layout (`grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`) with 48px gap. Cards have pure white backgrounds with subtle shadows.
  - **CTA Sections**: Clean layouts with pill-shaped outline buttons.
- **Header/Navbar**: Sticky header with logo on left, navigation links on right. 
- **Footer**: Simple layout, social links, copyright.
- **Whole Website Padding**: Horizontal padding of 32px (2rem) on desktop, 16px (1rem) on mobile. Vertical section padding of 64px (4rem).
- **Element-Specific Padding**: Button padding is 16px 32px (1rem 2rem). Card padding is 32px (2rem). Tag padding is 4px 12px (0.25rem 0.75rem).

## Responsive Layout Strategy
- **Breakpoints**: 
  - `1024px` — Tablet landscape
  - `768px` — Tablet portrait
  - `480px` — Mobile
- **Mobile Behavior**: Fluid typography scales down h1/h2 via clamp(). Grids reflow from multiple columns to single column. 
- **Tablet Behavior**: Intermediate adaptations, mostly grid columns adjusting from 3 to 2.
- **Responsive Navigation**: Navbar links collapse into a hamburger menu opening a full-screen or drawer overlay.
- **Responsive Spacing**: Section padding reduces from 64px to 32px. Card gaps reduce from 48px to 24px.

## Animations, Interactions & Motion Context
- **Motion Philosophy**: Elastic and physics-based. It feels highly responsive to user input, avoiding stiff, linear transitions.
- **Micro-interactions**: Links and buttons use a 0.3s ease transition. Buttons change background to text color and text to background color, with slight letter-spacing expansion (0.05em).
- **Custom Cursor**: Custom cursor that scales up when hovering over clickable elements and reveals text like "View Project".
- **Element States**: 
  - Button Default: Transparent background, dark text/border. 
  - Button Hover: Dark background, light text, 0.05em letter spacing, 0.3s ease.
- **Interactive Background Animations**: Two major blurred blobs (Red and Yellow) that float and follow cursor movement loosely with spring physics.
- **Scroll Animations**: Smooth scroll using Lenis. Hero elements translate Y on scroll (parallax). Text enters via character-by-character reveal (staggered) on viewport enter.
- **Page Transitions**: Standard SPA-like transitions (likely Framer Motion route transitions) fading out current content and sliding in new content.
- **Libraries Detected**: Framer Motion, Lenis (for smooth scroll), potentially GSAP for timeline animations.
# High-Contrast Modern Portfolio Design System

## Vibe, Aesthetic & Brand Persona
- **Visual Context**: A modern, high-contrast, gallery-like portfolio. It uses bold typography, generous whitespace, and physics-based micro-interactions to create a premium, immersive experience. The brand persona is confident, creative, and highly polished, relying on large typography rather than complex graphics to make a statement.
- **Target Emotion**: Premium, authoritative, artistic, and highly engaging. Designed to evoke awe and a sense of refined craftsmanship. Target audience: high-end clients, design agencies, and creative peers.
- **Key UI Patterns**: Oversized typography with character-reveals on scroll, parallax hero elements, interactive magnetic blobs in the background, large project numbers, and smooth accordion FAQs.

## Colors & Theming Context
- **Color Philosophy**: A high-contrast dual-tone approach with off-white and near-black, punctuated by distinct primary and secondary accents that bring life to the layout via animated blobs.
- **Backgrounds**: 
  - `#f5f5f7` (`--bg-offwhite`, `$color_default_light`) — Main page background.
  - `#ffffff` (`--bg-pure`, `$color_default_dark`) — Project cards background.
- **Text**: 
  - `#131314` (`--text-dark`) — Primary text, paragraphs, and standard headings.
  - `rgba(19, 19, 20, 0.6)` (`--text-muted`) — Subtitles and secondary information.
- **Primary/Accent**: 
  - `#db2f27` (`--primary-red`, `$color_primary`) — Used for major standout headings, hero text, and primary animated background blob.
  - `#e7c700` (`--secondary-yellow`, `$color_secondary`) — Used for secondary animated background blob and highlights.
  - `#008cbc` (`--accent-cyan`, `$color_accent`) — Used for links and interactive elements.
- **Gradients & Shadows**: 
  - `0 10px 30px rgba(0,0,0,0.05)` — Subtle drop shadow used on project cards for depth against the off-white background.
  - `blur(80px)` — Backdrop filter and standard filter used on colored background blobs.


## Typography Context
- **Typographic Voice**: Bold and expressive headings paired with clean, highly readable body copy to maintain structural clarity while still being artistic.
- **Headings**: `rische` (or Playfair Display fallback) — Display serif.
  - Hero Title (`h1`): clamp(3rem, 8vw, 6rem) / weight 400 / line-height 1.1 / color `--primary-red`.
  - Section Titles (`h2`): clamp(2.5rem, 5vw, 4rem) / weight 400 / line-height 1.1 / color `--primary-red`.
- **Body**: `Geist` (or Inter fallback) — Clean sans-serif.
  - Paragraphs (`p`): 16px / weight 400 / line-height 1.6 / color `--text-dark`.
  - Subheaders (`h3`): 24px / weight 300 / line-height 1.6 / color `--primary-red`.
  - Tags/Meta (`Geist Mono`): 13.6px (0.85rem) / weight 500 / uppercase / letter-spacing 0.05em.

## Layout & Spatial Context
- **Layout Philosophy**: Airy and sparse. Content is allowed to breathe, giving the user focus on the large typographic elements and high-quality imagery or project showcases.
- **Container**: Max-width of 1200px, horizontally centered.
- **Spacing System**: Base unit of 8px. Common gaps are 48px (3rem). Section padding is 64px to 128px vertically.
- **Component Structures**:
  - **Hero**: Full viewport height. Features a massive slanted typography treatment. Background is minimal except for the magnetic, blurred color blobs.
  - **About/Content Sections**: Background off-white. Text columns are constrained to 60ch for optimal readability. 
  - **Work/Project Carousel**: Grid layout (`grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`) with 48px gap. Cards have pure white backgrounds with subtle shadows.
  - **CTA Sections**: Clean layouts with pill-shaped outline buttons.
- **Header/Navbar**: Sticky header with logo on left, navigation links on right. 
- **Footer**: Simple layout, social links, copyright.
- **Whole Website Padding**: Horizontal padding of 32px (2rem) on desktop, 16px (1rem) on mobile. Vertical section padding of 64px (4rem).
- **Element-Specific Padding**: Button padding is 16px 32px (1rem 2rem). Card padding is 32px (2rem). Tag padding is 4px 12px (0.25rem 0.75rem).

## Responsive Layout Strategy
- **Breakpoints**: 
  - `1024px` — Tablet landscape
  - `768px` — Tablet portrait
  - `480px` — Mobile
- **Mobile Behavior**: Fluid typography scales down h1/h2 via clamp(). Grids reflow from multiple columns to single column. 
- **Tablet Behavior**: Intermediate adaptations, mostly grid columns adjusting from 3 to 2.
- **Responsive Navigation**: Navbar links collapse into a hamburger menu opening a full-screen or drawer overlay.
- **Responsive Spacing**: Section padding reduces from 64px to 32px. Card gaps reduce from 48px to 24px.

## Animations, Interactions & Motion Context
- **Motion Philosophy**: Elastic and physics-based. It feels highly responsive to user input, avoiding stiff, linear transitions.
- **Micro-interactions**: Links and buttons use a 0.3s ease transition. Buttons change background to text color and text to background color, with slight letter-spacing expansion (0.05em).
- **Custom Cursor**: Custom cursor that scales up when hovering over clickable elements and reveals text like "View Project".
- **Element States**: 
  - Button Default: Transparent background, dark text/border. 
  - Button Hover: Dark background, light text, 0.05em letter spacing, 0.3s ease.
- **Interactive Background Animations**: Two major blurred blobs (Red and Yellow) that float and follow cursor movement loosely with spring physics.
- **Scroll Animations**: Smooth scroll using Lenis. Hero elements translate Y on scroll (parallax). Text enters via character-by-character reveal (staggered) on viewport enter.
- **Page Transitions**: Standard SPA-like transitions (likely Framer Motion route transitions) fading out current content and sliding in new content.
- **Libraries Detected**: Framer Motion, Lenis (for smooth scroll), potentially GSAP for timeline animations.
