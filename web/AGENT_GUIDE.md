# Repository Architecture & AI Agent Guide

This document defines the token-efficient specification for adding, modifying, and maintaining section modules and assets in this repository.

---

## 🏗️ Architecture Overview

The web showcase uses a modular section architecture. Configs, templates, and assets are strictly partitioned by section domain:

```
web/
├── config/
│   ├── sections.json         # Master section registry (defines sections, icons & files)
│   └── app-config/           # Section-specific configs
│       └── app-media.json    # App media captions & display order
├── css/                      # Global styling & design tokens
├── js/                       # Application logic & dynamic section loaders
├── pdf/
│   └── poster/               # Section-specific PDF assets (e.g. poster.pdf)
├── images/
│   └── app-images/           # Section-specific image assets (e.g. repo_icon.png, github_icon.png)
├── videos/
│   └── app-videos/           # Section-specific video assets (e.g. 4.mp4)
└── sections/
    ├── poster.html           # Section 1: Project Poster & Documentation
    ├── app-showcase.html     # Section 2: App-Showcase
    └── app-installation.html # Section 3: App Installation & F-Droid Repo
```

---

## 🚀 How to Add a New Section (4 Simple Steps)

Follow these exact steps to add a new section seamlessly without reading or modifying unrelated code:

### Step 1: Create the HTML Module in `web/sections/`
Create a new HTML file (e.g. `web/sections/hardware-showcase.html`) using the standardized card layout:

```html
<!-- SECTION: HARDWARE SHOWCASE -->
<section id="hardware-showcase" class="content-section">
    <article class="app-card">
        <div class="section-header-bar">
            <h2 class="section-header-title">
                <i class="fas fa-microchip" style="color: var(--primary-color);"></i>
                <span>Hardware &amp; Sensoren</span>
            </h2>
            <span class="section-header-subtitle">Schaltpläne &amp; Sensoraufbau des Smart Plant Pot</span>
        </div>
        <div style="padding: 30px;">
            <!-- Section Content Here -->
        </div>
    </article>
</section>
```

### Step 2: Register in `web/config/sections.json`
Add your new section to the master registry `web/config/sections.json`:

```json
{
  "id": "hardware-showcase",
  "title": "Hardware",
  "subtitle": "Schaltpläne & Sensoraufbau",
  "icon": "fa-microchip",
  "file": "web/sections/hardware-showcase.html"
}
```

### Step 3: Add Navigation Link in `index.html` (Optional)
Add the link to the navbar in `index.html`:

```html
<li><a href="#hardware-showcase" class="nav-link">Hardware</a></li>
```

### Step 4: Asset & Media Subfolders (Optional)
If your new section uses images, videos, or PDFs, place them in domain-matched subfolders:
- **Images:** `web/images/<section-id>-images/`
- **Videos:** `web/videos/<section-id>-videos/`
- **PDFs:** `web/pdf/<section-id>/`
- **Media Config:** `web/config/<section-id>-config/<section-id>-media.json`

---

## 🎨 Design Rules & Best Practices

1. **Header Consistency:** Always use `.section-header-bar`, `.section-header-title`, and `.section-header-subtitle`.
2. **Smooth Scrolling & ScrollSpy:** Ensure `<section id="...">` matches the navbar link `href="#..."`. `initScrollSpy()` highlights active navbar links automatically.
3. **Card Container:** Wrap section bodies inside `<article class="app-card">` or `<article class="repo-card">` for consistent padding, rounded corners, and subtle shadows.

---

## 🖼️ Media Captions & Gallery Configuration

> [!IMPORTANT]
> **Modular Rule:** `web/config/app-config/app-media.json` applies **specifically to the App-Showcase section** (`app-showcase`).
> Additional sections requiring media galleries must create their own dedicated config folder and file under `web/config/<section-id>-config/<section-id>-media.json`.

### Method 1: Section Config (`web/config/<section-id>-config/<section-id>-media.json`) [Recommended]
For section media galleries, define entries in `web/config/<section-id>-config/<section-id>-media.json`:

```json
{
  "hardware_media": [
    {
      "file": "circuit.png",
      "type": "image",
      "caption": "ESP32 Schaltplan",
      "description": "Anschlussdiagramm der Bodenfeuchte- und Temperatursensoren"
    }
  ]
}
```

### Method 2: Direct HTML `data-caption` & `data-description` Attributes
Set the `data-caption="..."` and `data-description="..."` attributes directly on `.media-thumb-wrapper` inside the section's HTML file:

```html
<div class="media-thumb-wrapper" data-caption="Titel" data-description="Ausführliche Beschreibung">
    <img src="..." alt="...">
</div>
```

---

## 🛑 Testing Policy for AI Agents

> [!CAUTION]
> **No Automated Browser Live Testing:** AI agents must **NEVER** execute `browser_subagent` or perform automated browser UI testing.
> The user always performs all visual, responsive, and functional UI testing manually. Agents should complete code modifications cleanly and present the summary directly to the user.
