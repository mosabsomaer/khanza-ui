# Khazna UI - Product Requirements Document

**Project Name:** Khazna UI
**Created:** 2026-02-13
**Status:** Planning
**Owner:** Product Team

---

## 1. Executive Summary

Khazna UI is a static showcase website for the Libyan banking industry, providing centralized access to bank logos, payment method logos, and banking app UI screenshots. The platform serves designers who need brand assets and researchers studying Libyan fintech UI patterns.

**Target Users:**
- Designers working on Libyan fintech projects
- Developers building banking integrations
- UI/UX researchers studying regional banking patterns

**Key Value Proposition:**
- One-stop repository for all Libyan bank brand assets
- Multi-format downloads (SVG, PNG, WebP) with one click
- Framework-specific code export (React, Vue, Svelte, HTML)
- Free, fast, no registration required

---

## 2. Goals & Success Metrics

### Business Goals
- Become the go-to resource for Libyan banking design assets
- Support the growth of Libyan fintech ecosystem
- Establish design standards for the industry

### Success Metrics
- User can find and download any logo in under 30 seconds
- 90%+ of visits result in successful download/copy action
- Site loads in under 2 seconds on average connection
- Works flawlessly on mobile, tablet, desktop

---

## 3. Technical Architecture

### 3.1 Tech Stack
- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (Sheet, Card, Button, Tabs, Input, Badge)
- **Routing:** Hash-based client-side routing
- **Hosting:** Static hosting (GitHub Pages, Netlify, or Vercel)
- **State Management:** React Context or useState (lightweight, no Redux needed)

### 3.2 Architecture Principles
- **Static-first:** No backend, no database, no server costs
- **Component-based:** Modular React components for maintainability
- **AI-friendly:** Clear file structure, separated concerns for easy AI assistance
- **Performance:** Pre-generated assets, lazy loading, minimal JavaScript
- **Accessibility:** Semantic HTML, keyboard navigation, screen reader support

### 3.3 Data Storage
- **JSON files** for metadata (banks.json, payment-methods.json)
- **File system** for assets (logos in /public/logos, screenshots in /public/apps)
- **localStorage** for user preferences (format selection persists across sessions)

---

## 4. Information Architecture

### 4.1 Site Map

```
Home (Logos Page)
├── Bank Logos Section
└── Payment Method Logos Section

Apps Page
├── Bank App Cards (grid)
└── App Detail Page (per bank)
    └── Screenshot Gallery
```

### 4.2 Navigation Structure

**Primary Navigation (Navbar):**
- Left: Logo/Brand + Tab Links (Logos | Apps)
- Center: Search Bar (context-aware)
- Right: Reserved for future actions

**Right Sidebar:**
- Details panel for selected items
- Initially empty, populates on selection
- Persists across page navigation

**Footer:**
- Credits, links, version info

### 4.3 Routing

| Route | Page | Description |
|-------|------|-------------|
| `#/` or `#/logos` | Logos Page | Default landing - bank + payment logos |
| `#/apps` | Apps Page | Banks with UI screenshot previews |
| `#/apps/:bankId` | App Detail | Full screenshot gallery for one bank |

---

## 5. Data Model

### 5.1 Entities

#### Bank Entity
- Unique ID (slug format: `nuran-bank`)
- Display name (e.g., "Nuran Bank")
- Logo file reference (SVG with pre-generated PNG/WebP versions)
- Brand colors array (hex codes extracted from logo)
- Figma design file URL
- List of supported payment methods (IDs)
- Screenshot availability flag
- Metadata: date added, last updated, new/updated flags

#### Payment Method Entity
- Unique ID (slug format: `visa`)
- Display name (e.g., "Visa")
- Logo file reference (SVG with pre-generated PNG/WebP versions)
- Brand colors array
- Figma design file URL
- Metadata: date added, new/updated flags

#### Screenshot (File-based, not in JSON)
- Stored in `/public/apps/{bank-id}/{screenshot-name}.png`
- Label derived from filename (auto-generated)
- Discovered dynamically at build/runtime
- No manual JSON maintenance needed

### 5.2 Relationships
- **Bank → Payment Methods:** Many-to-many (one bank supports multiple payment methods)
- **Bank → Screenshots:** One-to-many (one bank has multiple screenshots)
- **Payment Method:** Standalone (no relationships needed for MVP)

---

## 6. Core Features

### 6.1 Logos Page (Primary Landing Page)

**Layout:**
- Two distinct sections vertically stacked:
  1. "Bank Logos" heading + grid of bank logo cards
  2. "Payment Method Logos" heading + grid of payment method logo cards
- Responsive grid (6 columns on xl screens, down to 2 on mobile)
- Cards use borders only (no background fills)

**Logo Card:**
- Square aspect ratio
- Logo centered and sized appropriately
- Logo name displayed below
- Optional badge in top-left corner ("New" or "Updated")
- Hover state: subtle border brightness increase
- Click action: Populate right sidebar with logo details

**Search Behavior:**
- Real-time filtering as user types
- Searches logo name only (no color/tag search in MVP)
- Filters both sections simultaneously
- Placeholder text: "Search logos..."

**User Flow:**
1. User lands on Logos page
2. Sees ~40 logos divided into two sections
3. Can scroll to browse or search by name
4. Clicks a logo to view details in sidebar
5. Selects format and downloads or copies code

### 6.2 Apps Page (Secondary Feature)

**Layout:**
- Grid of bank cards (only banks with `hasScreenshots: true`)
- Banks without screenshots are hidden from this page
- Same responsive grid system as Logos page

**App Card (Mobbin-inspired):**
- Bank logo displayed (small to medium size)
- Bank name below logo
- Optional "New" or "Updated" badge in top-left
- Border-only styling (consistent with design system)
- Click action: Navigate to App Detail page

**Search Behavior:**
- Filters by bank name only
- Placeholder: "Search apps..."

**User Flow:**
1. User clicks "Apps" in navbar
2. Sees grid of banks that have app screenshots
3. Clicks a bank card
4. Lands on App Detail page for that bank

### 6.3 App Detail Page

**Layout:**
- Bank name and logo displayed at top
- Grid of screenshot thumbnails below
- All screenshots same size (consistent aspect ratio)
- Label under each screenshot (derived from filename)

**Screenshot Discovery:**
- Automatically discovers all images in `/public/apps/{bank-id}/` folder
- Supports PNG, JPG, WebP formats
- Converts filename to label (e.g., `splash-screen.png` → "Splash Screen")
- No manual JSON updates needed when adding screenshots

**Search Behavior:**
- Filters screenshots by label
- Placeholder: "Search screenshots..."

**User Flow:**
1. User browses screenshot gallery
2. Can search for specific screens (e.g., "login")
3. Clicks screenshot to view full size (future: lightbox or modal)

### 6.4 Right Sidebar (Details Panel)

**Purpose:**
- Display detailed information about selected logo/bank
- Provide download and copy actions
- Persist across page navigation for seamless UX

**Empty State:**
- Shows when no item selected
- Displays centered message: "Select a logo to view details"
- Takes ~25-30% of screen width on desktop
- Collapses/hides on mobile (full-screen drawer)

**Populated State (when logo selected):**

**Content Sections:**
1. **Logo Preview Area**
   - Large logo display (4x size of grid card)
   - Grid lines background (subtle, like iconsax.io)
   - Logo centered on grid pattern

2. **Metadata Display**
   - Logo/Bank name (heading)
   - Brand color palette (chips/swatches)

3. **Format Selection**
   - Two sets of tabs:
     - Download Format: SVG | PNG | WebP
     - Code Format: SVG | React | Vue | HTML | Svelte
   - User's selection is "sticky" (persists via localStorage)
   - Applies to current and future selections

4. **Action Buttons**
   - **Copy Code:** Copies code in selected format to clipboard
   - **Download:** Downloads file in selected format
   - **Open in Figma:** Opens Figma link in new tab

**Behavior:**
- Sidebar remains open when user navigates to different pages
- Clicking another logo updates sidebar content (no close/reopen animation)
- User can manually close sidebar (X button in top-right)
- On mobile: Sidebar becomes bottom drawer (shadcn Sheet component)

**User Flow:**
1. User clicks a logo in grid
2. Sidebar animates in and populates with logo details
3. User selects preferred format (e.g., PNG)
4. User clicks "Download" → file downloads
5. User switches to "React" code format
6. User clicks "Copy Code" → code copied to clipboard
7. Toast notification confirms "Copied to clipboard"
8. User can click another logo → sidebar updates without closing

---

## 7. Design System Requirements

### 7.1 Visual Design Direction

**Design Philosophy:**
- **Dark mode only** (no light mode in MVP)
- **Border-first design** - Use strokes, borders, and lines instead of filled backgrounds
- **Minimalist & flat** - No shadows, gradients, or 3D effects
- **Professional & clean** - Banking industry demands trust and clarity
- **Grid aesthetic** - Subtle grid lines behind logo previews (iconsax.io inspiration)

**Color Strategy:**
- Background: Deep dark (near black)
- Surface elements: Slightly lighter dark
- Borders: Subtle white/grey with low opacity
- Text: High contrast white for headings, medium grey for body
- Accents: Consider subtle use of Libyan flag colors (red, black, green)

**Typography:**
- Modern sans-serif font family (Inter, Geist, Space Grotesk, SF Pro)
- Clear hierarchy with size and weight
- High readability with strong contrast

**Spacing:**
- Generous whitespace throughout
- Consistent spacing scale (Tailwind's default 4px scale)
- Breathing room between grid items

### 7.2 Component Design Guidelines

**Cards:**
- 1px border, no background fill (or very subtle dark fill)
- Adequate padding
- Hover state: Border brightens slightly
- No shadows

**Navbar:**
- No background, bottom border only
- Minimal height
- Simple text links, no heavy button styling
- Active tab: Subtle indicator (underline or text color)

**Sidebar:**
- Left border only
- Same background as main or very subtle variation
- No shadows or heavy separation

**Buttons:**
- Primary actions: Border with subtle fill on hover
- Secondary actions: Border only, no fill
- No heavy shadows
- Clean, modern appearance

**Tabs:**
- Horizontal layout
- Active tab: Border or background highlight (subtle)
- Inactive tabs: Muted text

**Search Bar:**
- Border with transparent or subtle fill
- Medium rounded corners
- Icon on left side
- Placeholder text

**Badges:**
- Small rounded pill shape
- "New": Green accent
- "Updated": Blue accent
- Positioned absolutely in top-left of card

**Grid Layout:**
- Consistent gap spacing
- Responsive columns:
  - Mobile: 2 columns
  - Tablet: 3-4 columns
  - Desktop: 5 columns
  - Large desktop: 6 columns

### 7.3 Design Inspirations
1. **iconsax.io** - Grid lines background, border-first design, sidebar approach
2. **heroicons.com** - Simple card interactions, copy functionality
3. **mobbin.com** - App card layout, badge system, clean navigation

### 7.4 Design Deliverables Needed from Gemini
- Complete color palette (background, surface, borders, text, accents)
- Typography scale (font family, sizes, weights, line heights)
- Spacing system
- Component specifications (padding, borders, hover states, transitions)
- Responsive breakpoints
- Tailwind configuration recommendations
- Interaction patterns (hover effects, transitions, animations)

---

## 8. User Flows & Scenarios

### 8.1 Primary User Story: Download Logo
**As a** designer working on a banking app
**I want to** quickly find and download a bank logo
**So that** I can use it in my design mockups

**Steps:**
1. User lands on Logos page (default)
2. User searches for bank name (e.g., "Nuran")
3. User clicks on matching logo card
4. Sidebar opens with logo details
5. User sees default format is SVG, changes to PNG
6. User clicks "Download" button
7. PNG file downloads to device
8. Success!

**Alternate Flow:** User clicks "Copy Code" instead, selects "React", copies JSX to clipboard

### 8.2 Secondary User Story: Browse App UI
**As a** UX researcher
**I want to** see screenshots of Libyan banking apps
**So that** I can study common UI patterns

**Steps:**
1. User clicks "Apps" in navbar
2. User sees grid of banks with screenshots
3. User clicks on "Nuran Bank" card
4. User lands on App Detail page
5. User browses screenshot gallery
6. User searches for "login" to find login screens
7. Results filter to show only login-related screenshots
8. Success!

### 8.3 Tertiary User Story: Copy Code for Multiple Logos
**As a** developer building a payment integration page
**I want to** copy React code for multiple payment method logos
**So that** I can quickly add them to my component

**Steps:**
1. User lands on Logos page
2. User scrolls to "Payment Method Logos" section
3. User clicks "Visa" logo
4. Sidebar opens, user selects "React" code format
5. User clicks "Copy Code" → React JSX copied
6. User clicks "Mastercard" logo (sidebar updates instantly)
7. Format preference is still "React" (sticky preference)
8. User clicks "Copy Code" → Mastercard React JSX copied
9. Repeat for additional logos
10. Success!

---

## 9. Technical Requirements

### 9.1 Performance Requirements
- Initial page load: < 2 seconds on average 4G connection
- Logo grid render: < 500ms
- Search filtering: Real-time (< 100ms response)
- Format switching: Instant (no network calls)
- Asset sizes: SVGs optimized, PNGs/WebPs compressed

### 9.2 Responsive Design Requirements
- **Mobile (< 640px):** 2-column grid, bottom drawer for sidebar
- **Tablet (640-1024px):** 3-4 column grid, right sidebar persists
- **Desktop (> 1024px):** 5-6 column grid, right sidebar ~25-30% width
- Touch-friendly targets (min 44x44px)
- Readable text at all sizes

### 9.3 Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Last 2 versions
- No IE11 support needed

### 9.4 Accessibility Requirements
- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support (tab, enter, escape)
- Focus indicators visible
- Screen reader friendly
- Color contrast ratios meet WCAG AA standards

### 9.5 Data Management
- Logos stored in `/public/logos/{id}.{svg|png|webp}` format
- Screenshots stored in `/public/apps/{bank-id}/{screenshot-name}.png`
- Metadata in JSON files (`banks.json`, `payment-methods.json`)
- User preferences in localStorage (format selection)
- No user accounts or backend database needed

---

## 10. File Organization Strategy

### 10.1 Why Component-Based Structure
- **AI-friendly:** Each component in separate file for easy modification
- **Maintainable:** Clear separation of concerns
- **Scalable:** Easy to add new components or pages
- **Reusable:** Components can be imported across pages

### 10.2 Key Directories
- **/components:** Reusable UI components + shadcn components
- **/pages:** Top-level page components (Logos, Apps, AppDetail)
- **/types:** TypeScript interfaces and types
- **/data:** JSON files with logo/bank metadata
- **/utils:** Helper functions (download, copy, format conversion)
- **/public:** Static assets (logos, screenshots)

### 10.3 Naming Conventions
- Components: PascalCase (e.g., `LogoCard.tsx`)
- Utilities: camelCase (e.g., `formatCode.ts`)
- Files: kebab-case for assets (e.g., `nuran-bank.svg`)
- IDs: kebab-case in JSON (e.g., `"id": "nuran-bank"`)

---

## 11. Development Phases

### Phase 1: Foundation (Week 1)
- Initialize Vite + React + TypeScript project
- Configure Tailwind CSS
- Install and configure shadcn/ui components
- Set up hash-based routing
- Create file structure
- Set up sample JSON data (5-10 logos)
- Add sample SVG/PNG/WebP logos to /public

### Phase 2: Logos Page (Week 2)
- Build LogoGrid and LogoCard components using shadcn Card
- Implement two-section layout (Banks + Payment Methods)
- Add SearchBar component using shadcn Input
- Build Navbar with tab navigation
- Implement search filtering logic
- Add responsive grid styling

### Phase 3: Sidebar (Week 3)
- Build Sidebar component using shadcn Sheet
- Implement empty state
- Implement populated state with logo preview
- Add grid lines background effect
- Add format selection using shadcn Tabs
- Implement Download function
- Implement Copy to Clipboard function
- Add Figma link button
- Add localStorage persistence for format preferences
- Add toast notifications for user feedback

### Phase 4: Apps Pages (Week 4)
- Build AppsPage with AppGrid and AppCard
- Implement filtering (only show banks with screenshots)
- Build AppDetailPage with screenshot grid
- Implement automatic screenshot discovery from file system
- Add filename-to-label conversion logic
- Test with real screenshot data

### Phase 5: Polish & Deploy (Week 5)
- Responsive design testing on all devices
- Accessibility audit and fixes
- Performance optimization (lazy loading, image optimization)
- Add loading states and error handling
- Cross-browser testing
- Deploy to static hosting (Vercel/Netlify)
- Set up custom domain if needed

---

## 12. Future Enhancements (Post-MVP)

**Not in Scope for V1, Consider for Future:**
- Download analytics (track popular logos)
- User accounts and favorites system
- Community contributions (submit new logos)
- Dark/light mode toggle
- Advanced filters (by color, by payment method support)
- Public API for programmatic access
- Logo comparison view (side-by-side)
- Bulk download (zip multiple logos)
- Version history for logos (track updates over time)
- Figma plugin integration

---

## 13. Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Poor performance with 40+ logos | High | Implement lazy loading, optimize images |
| Manual JSON updates error-prone | Medium | Create contribution guide, validation scripts |
| Screenshot discovery breaks on deployment | High | Test import.meta.glob in production build early |
| Mobile sidebar UX unclear | Medium | Use shadcn Sheet with proper mobile drawer behavior |
| Logo quality inconsistent | Medium | Establish logo submission guidelines, review process |

---

## 14. Design System Prompt for Gemini

**Context:**
You are creating a design system for "Khazna UI", a showcase website for Libyan banking logos and app UI screenshots. The audience is designers and developers in the Libyan fintech space who need quick access to brand assets.

**Brand Direction:**
Professional, minimal, dark mode, border-first aesthetic. Think modern fintech meets Libyan banking industry - trustworthy, clean, fast.

**Design Principles:**
1. **Clarity over decoration** - Remove anything that doesn't serve the user
2. **Borders define structure** - No heavy backgrounds or shadows
3. **Breathing room** - Generous whitespace between elements
4. **Grid aesthetic** - Subtle grid lines for technical, precise feel
5. **Fast interactions** - Smooth but quick transitions (150-200ms)

**Inspirations:**
- **iconsax.io** → Grid background, sidebar approach, dark mode
- **heroicons.com** → Simplicity, copy interactions
- **mobbin.com** → Card layout, badges, clean navigation

**Components to Spec:**
1. Navbar (borderless with bottom stroke)
2. Logo Card (bordered, square, hover effect)
3. App Card (with badge support)
4. Right Sidebar/Sheet (details panel)
5. Search Input (minimal, with icon)
6. Buttons (primary, secondary, icon-only)
7. Tabs (horizontal format selector)
8. Badges (New/Updated pills)
9. Grid layouts (responsive breakpoints)

**Color Palette Needs:**
- Background colors (deep dark)
- Surface colors (slightly lighter)
- Border colors (subtle opacity)
- Text colors (high contrast headings, muted body)
- Accent colors (consider Libyan flag: red, black, green used sparingly)

**Typography Needs:**
- Font family recommendation
- Size scale (headings, body, small)
- Weight scale (headings, regular, bold)
- Line heights

**Spacing Needs:**
- Base unit (recommend 4px or 8px)
- Component padding standards
- Grid gap sizes
- Section spacing

**Deliverables:**
- Complete color palette with hex codes
- Typography specification
- Component visual specifications
- Responsive grid breakpoints
- Tailwind config recommendations
- Interaction/animation guidelines

---

**End of PRD**
