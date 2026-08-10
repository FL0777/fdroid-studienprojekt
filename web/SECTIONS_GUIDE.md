# Section Modularization Guide for AI Agents & Developers

This document defines the token-efficient specification for adding, modifying, and maintaining section modules in this repository.

---

## 🏗️ Architecture Overview

The web showcase uses a modular section architecture located in the `web/sections/` directory:

```
web/
├── css/                  # Styling & themes
├── js/                   # Application logic & loaders
├── pdf/                  # PDF documents (e.g. poster.pdf)
├── images/               # Web image assets (e.g. repo_icon.png, github_icon.png)
├── videos/               # Video demonstration assets
└── sections/
    ├── sections.json     # Master section registry
    ├── poster.html       # Section 1: Project Poster & Documentation
    ├── showcase.html     # Section 2: App Showcase
    └── installation.html # Section 3: App Installation & F-Droid Repo
```

---

## 🚀 How to Add a New Section (3 Simple Steps)

Follow these exact steps to add a new section without reading or modifying unrelated code:

### Step 1: Create the HTML Module in `web/sections/`
Create a new HTML file (e.g. `web/sections/demo.html`) using the standardized card layout:

```html
<!-- SECTION: LIVE DEMO -->
<section id="demo" class="content-section">
    <article class="app-card">
        <div class="section-header-bar">
            <h2 class="section-header-title">
                <i class="fas fa-play-circle" style="color: var(--primary-color);"></i>
                <span>Live Demo</span>
            </h2>
            <span class="section-header-subtitle">Interaktive Hardware &amp; App Vorführung</span>
        </div>
        <div style="padding: 30px;">
            <!-- Section Content Here -->
        </div>
    </article>
</section>
```

### Step 2: Register in `web/sections/sections.json`
Add your new section to the master registry:

```json
{
  "id": "demo",
  "title": "Live Demo",
  "icon": "fa-play-circle",
  "file": "web/sections/demo.html"
}
```

### Step 3: Add Top Navigation Link in `index.html` (Optional)
Add the link to the navbar in `index.html`:

```html
<li><a href="#demo" class="nav-link">Live Demo</a></li>
```

---

## 🎨 Design Rules & Best Practices

1. **Header Consistency:** Always use `.section-header-bar`, `.section-header-title`, and `.section-header-subtitle`.
2. **Smooth Scrolling & ScrollSpy:** Ensure the `<section id="...">` matches the navbar link `href="#..."`. The automatic `initScrollSpy()` function will highlight active links automatically.
3. **Card Container:** Wrap section bodies inside `<article class="app-card">` or `<article class="repo-card">` for consistent padding and shadow borders.

---

## 🖼️ Media Captions Configuration

Captions for images (`1.png`, `2.png`, `3.png`) and videos (`4.mp4`) can be configured in `web/config/media.json`:

### Method 1: Config File (`web/config/media.json`) [Recommended]
Add or edit media entries in `web/config/media.json`:

```json
{
  "app_media": [
    {
      "file": "1.png",
      "type": "image",
      "caption": "Dashboard & Sensorübersicht"
    },
    {
      "file": "4.mp4",
      "type": "video",
      "caption": "Live-Demonstration Bewässerungsvorgang"
    }
  ]
}
```

### Method 2: HTML `data-caption` Attribute
Set the `data-caption="..."` attribute directly on `.media-thumb-wrapper`:

```html
<div class="media-thumb-wrapper" data-caption="Meine individuelle Unterschrift">
    <img src="..." alt="...">
</div>
```
