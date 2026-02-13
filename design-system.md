Khazna UI: Design System Specification

Design Philosophy: "The Grid is the Structure."
We are removing solid containers in favor of dividers. Content floats within a visible technical grid. The aesthetic is "Dark Mode Architectural."
1. Color Palette (Dark Fintech)

We will use a Zinc-based monochrome scale for the UI to ensure the colorful banking logos pop. The accents are derived from the Libyan flag but modernized (neon/pastel) for dark mode visibility.
Base Colors (The Environment)

    Void (Background): #050505 (Almost pitch black, better contrast for lines)

    Surface (Panels): #0A0A0A (Subtle separation)

    Line/Border Dim: #27272A (Default borders - Zinc 800)

    Line/Border Lit: #3F3F46 (Hover state borders - Zinc 700)

Typography Colors

    Text Primary: #FFFFFF (Headings)

    Text Secondary: #A1A1AA (Body/Descriptions - Zinc 400)

    Text Tertiary: #52525B (Placeholders/Meta - Zinc 600)

Accents (Libyan Flag - Modernized)

    Khazna Green (Primary/Success): #00DC82 (Vibrant Emerald - Use for "Download" or "New")

    Signal Red (Destructive/Error): #FF4545 (Use for "Close" or "Delete")

    Digital Black: #000000 (Used for badges on white text)

2. Typography & Iconography

Font Family: Inter or Geist Sans.
Why? Both are variable fonts that look exceptional in "Technical" interfaces. They have tall x-heights which make small text inside grids legible.

Scale:

    H1 (Logo/Hero): 24px (Bold, Tracking -0.02em)

    H2 (Section): 18px (Medium)

    Body: 14px (Regular)

    Micro/Badge: 12px (Medium, Tracking 0.05em, Uppercase)

Icon Set: Iconsax (Linear style) or Phosphor Icons (Regular).
Rule: Icons should always be 20px or 24px.
3. The "Lines" Layout Concept (UI Visualization)

Instead of a white card with a shadow, we use the Border Box.
The Global Grid

The background of the entire website should have a subtle SVG grid pattern drawn in #27272A opacity 20%. This reinforces the "Architectural" feel.
1. Navigation (Sidebar)

Inspired by Iconsax, we ditch the top navbar for a Left Sidebar.

    Structure: Fixed width (240px). Border-Right solid 1px (#27272A).

    Content:

        Top: Khazna UI Logo (Text only, bold).

        Middle: Navigation Links (Logos, UI Screens, Guidelines).

        Bottom: "Submit Asset" button.

    Active State: No background fill. Instead, a vertical bar on the left (2px wide, Green) and the text turns White.

2. The Logo Grid (Main Content)

    Container: A masonry or strict CSS Grid.

    The Card (The Core Element):

        Fill: Transparent (See the background through it).

        Border: 1px Solid #27272A.

        Padding: 32px (Generous whitespace).

        Interaction:

            Hover: Border color changes to #52525B (Lighter gray). A generic "Copy" or "Download" icon appears in the top right corner.

            Click: Opens the Details Sheet.

        Content: The Banking Logo is perfectly centered.

3. The Details Sheet (Right Sidebar)

When a user clicks a logo, a drawer slides in from the right.

    Style: Glassmorphism (Blur 10px) background #050505 at 90% opacity.

    Border: Border-Left 1px #27272A.

    Separators: Use horizontal lines (<hr class="border-zinc-800">) to separate "Color Codes", "Download Formats", and "History".

4. Component Specifications
Search Input (Minimal)

    Look: No background box. Just a bottom border.

    Style: 100% width. Icon on left.

    Border: Bottom 1px #27272A.

    Focus: Bottom border turns #FFFFFF (White).

Badges (Pills)

Used for tags like "Updated", "Vector", "PNG".

    Background: Transparent.

    Border: 1px Solid (Current Color).

    Text: 12px.

    Example: A "New" badge would have a Green border and Green text.

Buttons

    Primary:

        Background: #00DC82 (Green).

        Text: Black (High contrast).

        Shape: 4px rounded (Slightly sharp).

    Secondary (The "Lines" Button):

        Background: Transparent.

        Border: 1px Solid #3F3F46.

        Hover: Border White.

5. Tailwind Config Recommendation

Here is the configuration to achieve this specific look.
JavaScript

// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: '#0A0A0A',
        border: {
          DEFAULT: '#27272A', // Zinc 800
          hover: '#3F3F46',   // Zinc 700
        },
        primary: {
          DEFAULT: '#00DC82', // Khazna Green
          foreground: '#000000',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // or 'Geist Sans'
      },
      borderRadius: {
        // We want a slightly technical, boxy feel. Not fully rounded.
        lg: '8px',
        md: '6px',
        sm: '4px',
      },
      backgroundImage: {
        // The technical grid background
        'grid-pattern': "linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)",
      },
      backgroundSize: {
        'grid-pattern': '40px 40px',
      }
    },
  },
}

6. How to code the "Grid Background"

To get that cool Iconsax/Linear tech vibe, apply this CSS to your main wrapper:
CSS

.bg-tech-grid {
  background-color: #050505;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px; /* Adjust for density */
}

7. Interaction Guidelines

    Hover: Everything should happen in 150ms ease-out.

    Feedback: When a user copies a hex code, the border of the color swatch should flash Green #00DC82 for 300ms, then fade back.

    Scroll: Hide the scrollbar but keep functionality (scrollbar-width: none). Keep the UI looking like a native app.