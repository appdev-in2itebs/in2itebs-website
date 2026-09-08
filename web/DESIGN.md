---
name: In2IT EBS Website
description: Historical design reference. Current implementation is defined in ../DESIGN.md and app/globals.css.
colors:
  canvas: "#F7F9FC"
  surface: "#FCFDFE"
  surface-subtle: "#EEF2F7"
  brand: "#15213D"
  foreground: "#15213D"
  foreground-muted: "#4D5B73"
  on-brand: "#F8FAFD"
  action: "#2F6694"
  action-hover: "#255276"
  on-action: "#F8FAFD"
  border-subtle: "#CED7E3"
  error: "#9B2C3B"
  success: "#236543"
typography:
  display:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(2.75rem, 5vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(2rem, 3vw, 3rem)"
    fontWeight: 650
    lineHeight: 1.08
  body:
    fontFamily: "IBM Plex Sans, Calibri, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "IBM Plex Sans, Calibri, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.1em"
rounded:
  control: "0.75rem"
  surface: "1.25rem"
  feature: "1.75rem"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  section: "clamp(4.5rem, 8vw, 7.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.on-action}"
    rounded: "{rounded.control}"
    padding: "0.875rem 1.25rem"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.control}"
    padding: "0.875rem 1.25rem"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.surface}"
    padding: "1.5rem"
---

# Design System: In2IT EBS Website

**Historical specification:** current implementation details are in [the root DESIGN.md](../DESIGN.md), updated 7 September 2026. Newsreader, colour ratios and larger radii below belong to the earlier design and must not override the current IBM Plex Sans and semantic-token system. Retained for design-decision history.

## 1. Overview

**Creative North Star: "The Transformation Control Room"**

The interface should feel like a calm, well-run transformation programme: clear priorities, visible evidence, and no hidden complexity. Brand navy provides authority, while restrained blue action color identifies what can be done next. Layouts use strong editorial hierarchy without becoming an editorial-magazine pastiche.

The system rejects generic consulting templates built from repeated card grids, dense procurement catalogues, abstract AI decoration that competes with evidence, auto-moving proof, hidden controls, and editorial styling used as decoration rather than hierarchy.

**Key Characteristics:**

- Evidence-led, calm, and precise.
- One primary action per decision point.
- Progressive disclosure for deep service content.
- Comfortable reading measures and varied section rhythm.
- Light and dark themes use identical semantic roles.

## 2. Colors

The palette is restrained and role-driven. Theme files may change values, but component code always consumes semantic names.

### Primary

- **Control-room navy** (`brand`): persistent brand fields, hero surfaces, and the footer.
- **Action blue** (`action`): links, primary controls, selected states, and focus indicators.

### Neutral

- **Cool canvas** (`canvas`): page background.
- **Raised paper** (`surface`): navigation, cards, and form fields.
- **Quiet blue-grey** (`surface-subtle`): section alternation and subdued controls.
- **Primary ink** (`foreground`): headings and body copy.
- **Secondary ink** (`foreground-muted`): supporting copy only.
- **Brand white** (`on-brand`): text and icons on brand fields.
- **Structural line** (`border-subtle`): dividers and boundaries.

**The Semantic Pairing Rule.** Components must use foreground and background roles as documented pairs. Raw palette values are forbidden inside components.

**The AA Floor Rule.** Normal text never ships below 4.5:1. Large text and non-text controls never ship below 3:1. The core documented pairings range from 5.77:1 to 16.96:1.

## 3. Typography

**Display Font:** Newsreader (with Georgia fallback)
**Body Font:** IBM Plex Sans (with Calibri and system-ui fallback)

**Character:** The serif carries authority in short statements. The sans carries detail, controls, and evidence with high legibility.

### Hierarchy

- **Display** (700, fluid display scale, 1.0): one decisive page statement.
- **Headline** (650, fluid headline scale, 1.08): section framing and outcome statements.
- **Title** (600, 1.25rem to 1.5rem, 1.25): service and evidence labels.
- **Body** (400, 1rem, 1.65): supporting copy capped at 70 characters.
- **Label** (600, 0.75rem, 0.1em): short navigational or evidentiary labels only.

**The One Accent Rule.** Italic emphasis may appear once in a major heading. Repeating accent words across every section is prohibited.

## 4. Elevation

The system is flat by default. Tonal separation and borders establish structure. Soft navy-tinted elevation appears only on floating navigation, menus, and interactive surfaces responding to hover.

### Shadow Vocabulary

- **Ambient navigation** (`0 14px 40px rgb(21 33 61 / 0.12)`): menus and the solid floating header.
- **Interactive lift** (`0 18px 48px rgb(21 33 61 / 0.14)`): hover response on a primary feature only.

**The Earned Elevation Rule.** Static content does not receive a shadow merely to resemble a card.

## 5. Components

### Buttons

- **Shape:** gently squared controls (`control` radius), never default pills.
- **Primary:** action background with on-action text and a 44px minimum height.
- **Hover / Focus:** darker action tone on light theme, lighter action tone on dark theme, visible two-pixel focus ring, and subtle one-pixel movement.
- **Secondary / Ghost:** structural border or text-only treatment. They never compete with the primary action.

### Chips

- **Style:** used only for compact metadata. Chips are not a substitute for navigation.
- **State:** selected states use action color plus explicit text, not color alone.

### Cards / Containers

- **Corner Style:** controlled curvature (`surface` radius).
- **Background:** semantic surface colors.
- **Shadow Strategy:** flat at rest; lift only when the full surface is interactive.
- **Border:** one-pixel structural border where boundaries are required.
- **Internal Padding:** 1.25rem to 2rem according to information density.

### Inputs / Fields

- **Style:** surface background, strong foreground, visible label, and structural border.
- **Focus:** action-colored border and focus ring.
- **Error / Disabled:** explicit text feedback plus semantic state color. Color alone is forbidden.

### Navigation

Top-level navigation exposes no more than six choices. Current location is persistent, menus open through both pointer and keyboard, and mobile groups are collapsed until requested. Every menu control has a 44px target and immediate expanded-state feedback.

### Evidence module

Outcome, client, and delivery context appear together. Decorative metrics without a source or business meaning are prohibited.

## 6. Do's and Don'ts

### Do:

- **Do** use semantic role tokens for every foreground, background, border, and focus color.
- **Do** place measurable proof beside the claim it supports.
- **Do** render factual values in the initial HTML.
- **Do** make interactive regions obvious through labels, cursor, focus, and state changes.
- **Do** keep normal text contrast at or above 4.5:1 in every theme.

### Don't:

- **Don't** create generic consulting templates built from repeated card grids.
- **Don't** expose dense procurement catalogues or the full taxonomy at once.
- **Don't** use abstract AI decoration that competes with business evidence.
- **Don't** use auto-moving proof, hidden controls, or interactions that depend on discovery.
- **Don't** use editorial styling as decoration rather than hierarchy.
- **Don't** use side-stripe borders, gradient text, or decorative glassmorphism.
