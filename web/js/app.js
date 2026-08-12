/**
 * F-Droid Repository & App-Showcase - Application Logic
 * Automatically fetches and parses repo/index-v1.json
 * Seamless PDF Poster Rendering via PDF.js & Native Dynamic IFrame Height Scaling
 * Interactive Markdown Docs Viewer, Collapsible Changelog Accordions & Fullscreen Lightbox Carousel
 */

let currentDocType = 'changelog';
let currentDocLang = 'de';
let currentScreenshotIndex = 0;
let screenshotList = [];


const defaultAppMedia = [
    {
        file: '1.png',
        type: 'image',
        caption: 'Konfigurationsassistent',
        description: 'Geführter Assistentsprozess zur Einrichtung des Pflanzentopfs'
    },
    {
        file: '2.png',
        type: 'image',
        caption: 'Home-Übersicht',
        description: 'Zentrale Hauptansicht aller verbundenen Pflanzentöpfe'
    },
    {
        file: '3.png',
        type: 'image',
        caption: 'Sensorenansicht',
        description: 'Echtzeit-Messwerte & historische Diagramme der Sensoren'
    },
    {
        file: '4.mp4',
        type: 'video',
        caption: 'Live-Demonstration App-Konfiguration',
        description: 'Kurzes Video zur Vorführung des Einrichtungsprozesses in der App'
    }
];

let userMediaConfig = { app_media: defaultAppMedia };

async function loadUserMediaConfig() {
    try {
        const res = await fetch('./web/config/app-config/app-media.json');
        if (res.ok) {
            userMediaConfig = await res.json();
        }
    } catch (e) {
        console.log('Using default media mapping fallback:', e.message);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    initCopyButtons();
    initLightbox();
    initPermissionsToggle();
    initCommStructureToggle();
    initDocsModalEvents();
    initShareModal();
    initScrollSpy();
    await loadUserMediaConfig();
    fetchFDroidMetadata();
    renderPdfPoster();
    adjustPosterIframeHeight();

    // Re-render poster canvas and adjust height on window resize to ensure full crisp scaling
    window.addEventListener('resize', debounce(() => {
        renderPdfPoster();
        adjustPosterIframeHeight();
    }, 200));
});

// Dynamic ScrollSpy for Navbar Active Highlighting
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    if (!sections.length || !navLinks.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '-90px 0px -45% 0px',
        threshold: 0.05
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

// Dynamically scale poster iframe height so 1-page PDF fits 100% vertically without scrollbars
function adjustPosterIframeHeight() {
    const fallbackObj = document.getElementById('poster-object-fallback');
    if (!fallbackObj) return;
    const container = fallbackObj.parentElement;
    if (container && container.clientWidth) {
        const targetHeight = Math.round(container.clientWidth * 1.35);
        fallbackObj.style.height = targetHeight + 'px';
    }
}

// 1. Interactive Markdown Docs Modal (Dynamic Fetch first on HTTP/S, DOM Template fallback on file://)
function initDocsModalEvents() {
    const modal = document.getElementById('docs-modal');
    const closeBtn = document.getElementById('docs-modal-close');

    if (closeBtn && modal) {
        closeBtn.onclick = () => modal.classList.remove('active');
    }

    if (modal) {
        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        };
    }
}

async function openDocsModal(docType, lang) {
    if (docType) currentDocType = docType;
    if (lang) currentDocLang = lang;

    const modal = document.getElementById('docs-modal');
    const modalBody = document.getElementById('docs-modal-body');
    const modalTitle = document.getElementById('docs-modal-title');
    const langBtnDe = document.getElementById('lang-btn-de');
    const langBtnEn = document.getElementById('lang-btn-en');

    if (!modal || !modalBody) return;

    // Toggle active language button UI
    if (langBtnDe && langBtnEn) {
        if (currentDocLang === 'en') {
            langBtnDe.classList.remove('active');
            langBtnEn.classList.add('active');
        } else {
            langBtnDe.classList.add('active');
            langBtnEn.classList.remove('active');
        }
    }

    let filename = '';
    let title = '';
    let templateId = '';

    if (currentDocType === 'about') {
        filename = currentDocLang === 'en' ? './info/README_en.md' : './info/README.md';
        templateId = currentDocLang === 'en' ? 'doc-about-en' : 'doc-about-de';
        title = currentDocLang === 'en' ? 'About the Project' : 'Über das Projekt';
    } else if (currentDocType === 'changelog') {
        filename = currentDocLang === 'en' ? './info/CHANGELOG_en.md' : './info/CHANGELOG.md';
        templateId = currentDocLang === 'en' ? 'doc-changelog-en' : 'doc-changelog-de';
        title = currentDocLang === 'en' ? 'Changelog & Release Notes' : 'Änderungsprotokoll (Changelog)';
    } else if (currentDocType === 'readme') {
        filename = currentDocLang === 'en' ? './info/README_en.md' : './info/README.md';
        templateId = currentDocLang === 'en' ? 'doc-readme-en' : 'doc-readme-de';
        title = currentDocLang === 'en' ? 'App Manual & Documentation' : 'App-Handbuch & Dokumentation';
    } else if (currentDocType === 'licenses') {
        filename = currentDocLang === 'en' ? './info/THIRD_PARTY_NOTICES_en.md' : './info/THIRD_PARTY_NOTICES.md';
        templateId = currentDocLang === 'en' ? 'doc-licenses-en' : 'doc-licenses-de';
        title = currentDocLang === 'en' ? 'Third-Party Notices & Licenses' : 'Drittanbieter-Hinweise & Lizenzen';
    }

    if (modalTitle) {
        modalTitle.innerHTML = `<i class="fas fa-graduation-cap" style="color: var(--primary-color);"></i> ${title}`;
    }

    modal.classList.add('active');

    let markdownText = '';
    const isLocalFileProtocol = window.location.protocol === 'file:';

    // 1. Try Fetch first when hosted on HTTP/HTTPS for changelog/readme/licenses
    if (!isLocalFileProtocol && currentDocType !== 'about') {
        try {
            const response = await fetch(filename);
            if (response.ok) {
                markdownText = await response.text();
            }
        } catch (err) {
            console.warn('Live fetch failed, trying DOM template:', err);
        }
    }

    // 2. Fallback to DOM Template (Works 100% offline on file:// protocol without CORS errors!)
    if (!markdownText) {
        const templateEl = document.getElementById(templateId);
        if (templateEl) {
            markdownText = templateEl.textContent.trim();
        }
    }

    // Render HTML
    if (markdownText) {
        if (currentDocType === 'changelog') {
            modalBody.innerHTML = formatChangelogToAccordions(markdownText);
        } else if (typeof marked !== 'undefined') {
            modalBody.innerHTML = marked.parse(markdownText);
        } else {
            modalBody.innerHTML = `<pre style="white-space: pre-wrap;">${markdownText}</pre>`;
        }
    } else {
        modalBody.innerHTML = `<div style="padding: 20px; color: #EF4444; background: #FEE2E2; border-radius: 8px;"><i class="fas fa-exclamation-triangle"></i> Dokumentation konnte nicht geladen werden.</div>`;
    }
}

function formatChangelogToAccordions(markdownText) {
    if (typeof marked === 'undefined') return markdownText;

    // Split markdown by version headers (## [...)
    const versionBlocks = markdownText.split(/(?=\n##\s+\[)/g);
    let htmlResult = '';
    let renderedCount = 0;

    versionBlocks.forEach((block) => {
        const trimmed = block.trim();
        if (!trimmed) return;

        const headerMatch = trimmed.match(/^##\s+\[(.*?)\]\s*(?:-\s*(.*))?/m);
        if (headerMatch) {
            const version = headerMatch[1];
            const date = headerMatch[2] ? headerMatch[2].trim() : '';

            // Hide unreleased versions
            if (date.toLowerCase().includes('unreleased') || version.toLowerCase().includes('unreleased')) {
                return;
            }

            const contentMd = trimmed.replace(/^##\s+\[.*?\]\s*(?:-\s*.*)?\n?/, '');
            const parsedContent = marked.parse(contentMd);

            // First released version is open by default
            const isOpen = renderedCount === 0 ? 'open' : '';
            renderedCount++;

            htmlResult += `
                <details class="changelog-accordion" ${isOpen}>
                    <summary class="changelog-summary">
                        <div class="summary-left">
                            <span class="changelog-ver-tag">v${version}</span>
                            <span class="changelog-date">${date}</span>
                        </div>
                        <i class="fas fa-chevron-down accordion-arrow"></i>
                    </summary>
                    <div class="changelog-content">
                        ${parsedContent}
                    </div>
                </details>
            `;
        } else {
            // Main Title (# Changelog)
            htmlResult += marked.parse(trimmed);
        }
    });

    return htmlResult;
}

function switchDocsLanguage(lang) {
    if (lang !== currentDocLang) {
        openDocsModal(currentDocType, lang);
    }
}

// 2. Seamless Single-Page PDF Poster Rendering (Full Container Width & Height)
let cachedPdfPagePromise = null;
let isRenderingPdf = false;
let renderPdfPending = false;

async function getPdfPage() {
    if (!cachedPdfPagePromise) {
        try {
            const workerUrl = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            const blob = new Blob([`importScripts("${workerUrl}");`], { type: 'application/javascript' });
            pdfjsLib.GlobalWorkerOptions.workerSrc = URL.createObjectURL(blob);
        } catch (e) {
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        }
        cachedPdfPagePromise = pdfjsLib.getDocument('./web/pdf/poster/poster.pdf').promise.then(pdf => pdf.getPage(1));
    }
    return cachedPdfPagePromise;
}

async function renderPdfPoster() {
    const canvas = document.getElementById('poster-canvas');
    const fallbackObj = document.getElementById('poster-object-fallback');
    if (!canvas) return;

    const container = canvas.parentElement;
    if (container) container.style.backgroundColor = '#FFFFFF';
    canvas.style.backgroundColor = '#FFFFFF';

    if (typeof pdfjsLib === 'undefined') {
        canvas.style.display = 'none';
        if (fallbackObj) fallbackObj.style.display = 'block';
        return;
    }

    if (isRenderingPdf) {
        renderPdfPending = true;
        return;
    }
    isRenderingPdf = true;

    try {
        const page = await getPdfPage();

        const computedStyle = window.getComputedStyle(container);
        const paddingX = (parseFloat(computedStyle.paddingLeft) || 0) + (parseFloat(computedStyle.paddingRight) || 0);
        const targetWidth = Math.max((container.clientWidth || 1000) - paddingX, 300);

        const unscaledViewport = page.getViewport({ scale: 1.0 });
        const baseScale = targetWidth / unscaledViewport.width;
        // High-DPI supersampling (at least 2x quality factor) for razor-sharp vector text and graphics
        const dpr = window.devicePixelRatio || 1;
        const outputScale = Math.max(dpr, 2.0);

        // Bakes high-DPI scaling and native page rotation into viewport cleanly
        const viewport = page.getViewport({ scale: baseScale * outputScale, rotation: page.rotate || 0 });

        // Double-buffering: Render off-screen to avoid live-alignment and layout shifts
        const offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = Math.floor(viewport.width);
        offscreenCanvas.height = Math.floor(viewport.height);

        const offscreenCtx = offscreenCanvas.getContext('2d');
        offscreenCtx.fillStyle = '#FFFFFF';
        offscreenCtx.fillRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

        const renderContext = {
            canvasContext: offscreenCtx,
            viewport: viewport
        };

        // Asynchronous vector rendering happens completely off-screen
        await page.render(renderContext).promise;

        // Atomic swap to visible canvas once 100% complete
        canvas.width = offscreenCanvas.width;
        canvas.height = offscreenCanvas.height;
        canvas.style.width = Math.floor(viewport.width / outputScale) + "px";
        canvas.style.height = Math.floor(viewport.height / outputScale) + "px";

        const visibleCtx = canvas.getContext('2d');
        visibleCtx.drawImage(offscreenCanvas, 0, 0);

        canvas.style.display = 'block';
        canvas.style.opacity = '1';
        if (fallbackObj) fallbackObj.style.display = 'none';

        canvas.onclick = () => openPdfFullscreen();
    } catch (err) {
        console.warn('PDF.js rendering fallback triggered:', err);
        cachedPdfPagePromise = null;
        canvas.style.display = 'none';
        if (fallbackObj) fallbackObj.style.display = 'block';
    } finally {
        isRenderingPdf = false;
        if (renderPdfPending) {
            renderPdfPending = false;
            renderPdfPoster();
        }
    }
}

// 3. Fetch & Parse F-Droid Metadata
async function fetchFDroidMetadata() {
    let data = null;
    const isLocalFileProtocol = window.location.protocol === 'file:';

    // 1. Try Live Fetch on HTTP/S
    if (!isLocalFileProtocol) {
        try {
            const response = await fetch('./repo/index-v1.json');
            if (response.ok) {
                data = await response.json();
            }
        } catch (error) {
            console.warn('Could not load index-v1.json dynamically, trying DOM template:', error);
        }
    }

    // 2. Fallback to DOM JSON template (file:// or offline)
    if (!data) {
        const templateEl = document.getElementById('repo-index-json');
        if (templateEl) {
            try {
                data = JSON.parse(templateEl.textContent.trim());
            } catch (err) {
                console.warn('Could not parse repo-index-json template:', err);
            }
        }
    }

    if (data) {
        renderRepoAndApp(data);
    }
}

function renderRepoAndApp(data) {
    if (!data) return;

    // Render Repository metadata
    if (data.repo) {
        const repoNameEl = document.getElementById('repo-name-text');
        const repoDescEl = document.getElementById('repo-desc-text');
        if (repoNameEl && data.repo.name) repoNameEl.textContent = data.repo.name;
        if (repoDescEl && data.repo.description) repoDescEl.textContent = data.repo.description;
    }

    // Render App metadata (Targeting com.example.studienprojekt or first app)
    if (data.apps && data.apps.length > 0) {
        const app = data.apps.find(a => a.packageName === 'com.example.studienprojekt') || data.apps[0];
        const packages = data.packages && data.packages[app.packageName] ? data.packages[app.packageName] : [];
        const latestPkg = packages.length > 0 ? packages[0] : null;

        // App Header & Meta
        const nameEl = document.getElementById('dyn-app-name');
        const summaryEl = document.getElementById('dyn-app-summary');
        const pkgEl = document.getElementById('dyn-app-package');
        const descEl = document.getElementById('dyn-app-description');
        const iconEl = document.getElementById('dyn-app-icon');
        const navIconEl = document.getElementById('nav-app-icon');
        const faviconEl = document.querySelector("link[rel*='icon']");

        if (nameEl) nameEl.textContent = app.name || 'Smart Plant Pot';
        if (summaryEl) summaryEl.textContent = app.summary || '';
        if (pkgEl) pkgEl.textContent = app.packageName || '';
        if (descEl) descEl.textContent = app.description || app.summary || '';

        // Icon resolution for showcase, navbar header, and page favicon
        const iconSrc = `./repo/com.example.studienprojekt/en-US/icon.png`;
        if (iconEl) {
            iconEl.src = iconSrc;
            iconEl.onerror = () => { iconEl.src = `./web/images/app-images/repo_icon.png`; };
        }
        if (navIconEl) {
            navIconEl.src = iconSrc;
            navIconEl.onerror = () => { navIconEl.src = `./web/images/app-images/repo_icon.png`; };
        }
        if (faviconEl) {
            faviconEl.href = iconSrc;
        }

        // Action Buttons & Download
        if (latestPkg) {
            const downloadBtn = document.getElementById('dyn-download-btn');
            const sizeMB = (latestPkg.size / (1024 * 1024)).toFixed(1);
            if (downloadBtn) {
                downloadBtn.href = `./repo/${latestPkg.apkName}`;
                downloadBtn.innerHTML = `<i class="fas fa-download"></i> APK-Datei Direkt Herunterladen (v${latestPkg.versionName} • ${sizeMB} MB)`;
            }

            // Specs Grid
            const versionVal = document.getElementById('spec-version');
            const sizeVal = document.getElementById('spec-size');
            const addedVal = document.getElementById('spec-updated');
            const targetVal = document.getElementById('spec-target-sdk');

            if (versionVal) versionVal.textContent = `${latestPkg.versionName} (Build ${latestPkg.versionCode})`;
            if (sizeVal) sizeVal.textContent = `${sizeMB} MB`;

            const updateTimestamp = latestPkg.added || latestPkg.lastUpdated || app.lastUpdated || (data.repo ? data.repo.timestamp : null);
            if (addedVal && updateTimestamp) {
                const date = new Date(updateTimestamp);
                addedVal.textContent = date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
            }

            if (targetVal && latestPkg.targetSdkVersion) {
                targetVal.textContent = `Android ${getAndroidVersionName(latestPkg.targetSdkVersion)} (API ${latestPkg.targetSdkVersion})`;
            }

            // Permissions
            if (latestPkg['uses-permission']) {
                renderPermissions(latestPkg['uses-permission']);
            }
        }

        // Screenshots Gallery
        renderScreenshots(app);
    }
}

function renderScreenshots(app) {
    const galleryEl = document.getElementById('dyn-screenshots-gallery');
    if (!galleryEl) return;

    const mediaList = [];
    const pkgName = app ? app.packageName : 'com.example.studienprojekt';

    // 1. Gather Screenshots from F-Droid App metadata
    let screenshots = [];
    if (app && app.localized) {
        const loc = app.localized['de-DE'] || app.localized['en-US'] || Object.values(app.localized)[0];
        if (loc && loc.phoneScreenshots) {
            screenshots = loc.phoneScreenshots;
        }
    }
    if (screenshots.length === 0) {
        screenshots = ['1.png', '2.png', '3.png'];
    }

    if (userMediaConfig && Array.isArray(userMediaConfig.app_media) && userMediaConfig.app_media.length > 0) {
        userMediaConfig.app_media.forEach((item, idx) => {
            const isVid = item.type === 'video' || item.file.endsWith('.mp4');
            const src = isVid ? `./web/videos/app-videos/${item.file}` : `./repo/${pkgName}/en-US/phoneScreenshots/${item.file}`;
            const numMatch = item.file.match(/^(\d+)/);
            const num = numMatch ? parseInt(numMatch[1], 10) : (idx + 1);
            const caption = item.caption || `Medium ${num}`;
            mediaList.push({
                num: num,
                type: isVid ? 'video' : 'image',
                src: src,
                filename: item.file,
                caption: caption,
                description: item.description || ''
            });
        });
    } else {
        screenshots.forEach(scr => {
            const match = scr.match(/^(\d+)/);
            const num = match ? parseInt(match[1], 10) : 999;
            const caption = `Screenshot ${num}`;
            mediaList.push({
                num: num,
                type: 'image',
                src: `./repo/${pkgName}/en-US/phoneScreenshots/${scr}`,
                filename: scr,
                caption: caption
            });
        });

        const videoFiles = ['4.mp4'];
        videoFiles.forEach(vid => {
            const match = vid.match(/^(\d+)/);
            const num = match ? parseInt(match[1], 10) : 999;
            const caption = `Demo Video ${num}`;
            mediaList.push({
                num: num,
                type: 'video',
                src: `./web/videos/app-videos/${vid}`,
                filename: vid,
                caption: caption
            });
        });
    }

    // 3. Sort media items numerically by filename prefix (1.png, 2.png, 3.png, 4.mp4, ...)
    mediaList.sort((a, b) => a.num - b.num);

    // 4. Render Gallery HTML
    galleryEl.innerHTML = mediaList.map((item, index) => {
        const captionHtml = item.caption ? `<span class="media-caption">${item.caption}</span>` : '';
        const descriptionHtml = item.description ? `<span class="media-description">${item.description}</span>` : '';
        if (item.type === 'video') {
            return `
                <div class="media-item-box">
                    <div class="media-thumb-wrapper screenshot-thumb video-thumb" data-index="${index}" data-type="video" data-src="${item.src}" data-caption="${item.caption}" data-description="${item.description || ''}">
                        <video class="screenshot-thumb-video" src="${item.src}" muted playsinline controls controlsList="nodownload noplaybackrate noremoteplayback novolume" style="border: none; background: transparent; object-fit: contain;"></video>
                        <button class="video-expand-btn" title="In Vollbildansicht / Lightbox öffnen" aria-label="Vollbildansicht">
                            <i class="fas fa-expand"></i>
                        </button>
                    </div>
                    ${captionHtml}
                    ${descriptionHtml}
                </div>
            `;
        } else {
            return `
                <div class="media-item-box">
                    <div class="media-thumb-wrapper screenshot-thumb" data-index="${index}" data-type="image" data-src="${item.src}" data-caption="${item.caption}" data-description="${item.description || ''}" title="Bild in Vollbild anzeigen">
                        <img class="screenshot-thumb-img" src="${item.src}" alt="${item.caption}" onerror="this.parentElement.parentElement.style.display='none'">
                    </div>
                    ${captionHtml}
                    ${descriptionHtml}
                </div>
            `;
        }
    }).join('');

    // Attach ended listener to reset video to initial start frame after playback
    galleryEl.querySelectorAll('video').forEach(vid => {
        vid.addEventListener('ended', () => {
            vid.currentTime = 0;
            vid.pause();
        });
    });

    initLightbox(mediaList);
}

function renderPermissions(perms) {
    const container = document.getElementById('dyn-permissions-list');
    if (!container) return;

    const friendlyPerms = perms.map(p => {
        const permName = Array.isArray(p) ? p[0] : p;
        const shortName = permName.replace('android.permission.', '');
        return {
            raw: permName,
            name: formatPermissionName(shortName),
            icon: getPermissionIcon(shortName)
        };
    });

    container.innerHTML = friendlyPerms.map(p => `
        <div class="perm-item">
            <i class="${p.icon} perm-icon"></i>
            <span>${p.name}</span>
        </div>
    `).join('');
}

function formatPermissionName(name) {
    const map = {
        'INTERNET': 'Vollständiger Netzwerkzugriff (Internet)',
        'CAMERA': 'Kamerazugriff (Fotos & Scans)',
        'POST_NOTIFICATIONS': 'Benachrichtigungen senden',
        'BLUETOOTH': 'Bluetooth-Geräte verbinden & koppeln',
        'BLUETOOTH_ADMIN': 'Bluetooth-Einstellungen verwalten',
        'BLUETOOTH_SCAN': 'Bluetooth-Geräte in der Nähe suchen',
        'BLUETOOTH_CONNECT': 'Verbindung zu Bluetooth-Pflanzentopf herstellen',
        'ACCESS_FINE_LOCATION': 'Genauer Standort (für Bluetooth-Suche)',
        'ACCESS_COARSE_LOCATION': 'Ungefährer Standort',
        'ACCESS_NETWORK_STATE': 'Netzwerkstatus anzeigen',
        'WAKE_LOCK': 'Ruhezustand verhindern (Hintergrundmessungen)'
    };
    return map[name] || name;
}

function getPermissionIcon(name) {
    if (name.includes('BLUETOOTH')) return 'fab fa-bluetooth-b';
    if (name.includes('CAMERA')) return 'fas fa-camera';
    if (name.includes('LOCATION')) return 'fas fa-location-dot';
    if (name.includes('INTERNET') || name.includes('NETWORK')) return 'fas fa-wifi';
    if (name.includes('NOTIFICATION')) return 'fas fa-bell';
    return 'fas fa-shield-alt';
}

function getAndroidVersionName(api) {
    const versions = {
        28: '9.0 (Pie)',
        29: '10 (Q)',
        30: '11 (R)',
        31: '12 (S)',
        33: '13 (Tiramisu)',
        34: '14 (Upside Down Cake)',
        35: '15 (Vanilla Ice Cream)'
    };
    return versions[api] || `API ${api}`;
}

// Lightbox Carousel Handler (Supports Images & Videos)
function initLightbox(customMediaList) {
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const modalVideo = document.getElementById('lightbox-video');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    const counterEl = document.getElementById('lightbox-counter');
    const thumbWrappers = Array.from(document.querySelectorAll('.media-thumb-wrapper'));

    if (!modal) return;

    if (customMediaList && customMediaList.length > 0) {
        screenshotList = customMediaList;
    } else {
        screenshotList = thumbWrappers.map(w => {
            const isVid = w.classList.contains('video-thumb') || w.tagName.toLowerCase() === 'video' || (w.getAttribute('data-type') === 'video');
            const src = w.getAttribute('data-src') || w.src || w.querySelector('img, video')?.src;
            const caption = w.getAttribute('data-caption') || '';
            const description = w.getAttribute('data-description') || '';
            return {
                type: isVid ? 'video' : 'image',
                src: src,
                caption: caption,
                description: description
            };
        });
    }

    thumbWrappers.forEach((wrapper, idx) => {
        const itemIdx = wrapper.hasAttribute('data-index') ? parseInt(wrapper.getAttribute('data-index'), 10) : idx;
        const expandBtn = wrapper.querySelector('.video-expand-btn');
        if (expandBtn) {
            expandBtn.onclick = (e) => {
                e.stopPropagation();
                e.preventDefault();
                currentScreenshotIndex = itemIdx;
                updateLightboxMedia();
                modal.classList.add('active');
            };
        }

        if (!wrapper.classList.contains('video-thumb')) {
            wrapper.onclick = (e) => {
                e.stopPropagation();
                currentScreenshotIndex = itemIdx;
                updateLightboxMedia();
                modal.classList.add('active');
            };
        } else {
            wrapper.ondblclick = (e) => {
                e.stopPropagation();
                currentScreenshotIndex = itemIdx;
                updateLightboxMedia();
                modal.classList.add('active');
            };
        }
    });

    function updateLightboxMedia() {
        if (screenshotList.length === 0) return;
        const currentItem = screenshotList[currentScreenshotIndex];
        if (!currentItem) return;

        const mediaSrc = typeof currentItem === 'string' ? currentItem : currentItem.src;
        const mediaType = typeof currentItem === 'object' && currentItem.type ? currentItem.type : (mediaSrc && mediaSrc.endsWith('.mp4') ? 'video' : 'image');
        
        const filename = typeof currentItem === 'object' && currentItem.filename ? currentItem.filename : (mediaSrc ? mediaSrc.split('/').pop() : '');
        const configItem = (userMediaConfig && Array.isArray(userMediaConfig.app_media)) ? userMediaConfig.app_media.find(m => m.file === filename) : null;

        const captionText = (typeof currentItem === 'object' && currentItem.caption) ? currentItem.caption : (configItem && configItem.caption ? configItem.caption : '');
        const descriptionText = (typeof currentItem === 'object' && currentItem.description) ? currentItem.description : (configItem && configItem.description ? configItem.description : '');

        const captionEl = document.getElementById('lightbox-caption');
        if (captionEl) {
            captionEl.textContent = captionText;
            captionEl.style.display = captionText ? 'block' : 'none';
        }

        const descriptionEl = document.getElementById('lightbox-description');
        if (descriptionEl) {
            descriptionEl.textContent = descriptionText;
            descriptionEl.style.display = descriptionText ? 'block' : 'none';
        }

        if (mediaType === 'video') {
            if (modalImg) modalImg.style.display = 'none';
            if (modalVideo) {
                modalVideo.style.display = 'block';
                modalVideo.muted = true;
                modalVideo.src = mediaSrc;
                modalVideo.onended = () => {
                    modalVideo.currentTime = 0;
                    modalVideo.pause();
                };
                modalVideo.play().catch(e => console.log('Autoplay prevented:', e));
            }
        } else {
            if (modalVideo) {
                modalVideo.pause();
                modalVideo.style.display = 'none';
            }
            if (modalImg) {
                modalImg.style.display = 'block';
                modalImg.style.opacity = '0.5';
                setTimeout(() => {
                    modalImg.src = mediaSrc;
                    modalImg.style.opacity = '1';
                }, 80);
            }
        }

        if (counterEl) {
            counterEl.textContent = `${currentScreenshotIndex + 1} / ${screenshotList.length}`;
        }
    }

    function closeModal() {
        if (modalVideo) {
            modalVideo.pause();
        }
        modal.classList.remove('active');
    }

    function showNext() {
        if (screenshotList.length === 0) return;
        currentScreenshotIndex = (currentScreenshotIndex + 1) % screenshotList.length;
        updateLightboxMedia();
    }

    function showPrev() {
        if (screenshotList.length === 0) return;
        currentScreenshotIndex = (currentScreenshotIndex - 1 + screenshotList.length) % screenshotList.length;
        updateLightboxMedia();
    }

    if (prevBtn) prevBtn.onclick = (e) => { e.stopPropagation(); showPrev(); };
    if (nextBtn) nextBtn.onclick = (e) => { e.stopPropagation(); showNext(); };
    if (closeBtn) closeBtn.onclick = closeModal;

    modal.onclick = (e) => {
        if (e.target === modal || e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    };

    // Keyboard Arrow Keys Navigation
    document.onkeydown = (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'Escape') closeModal();
    };
}

// Copy to Clipboard
function initCopyButtons() {
    const copyBtns = document.querySelectorAll('.btn-copy');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-copy-target');
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                const text = targetEl.textContent.trim();
                navigator.clipboard.writeText(text).then(() => {
                    showToast('In Zwischenablage kopiert! 📋');
                }).catch(err => {
                    console.error('Kopieren fehlgeschlagen:', err);
                });
            }
        });
    });
}

function showToast(message) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Permissions Accordion Toggle
function initPermissionsToggle() {
    const header = document.getElementById('permissions-toggle-header');
    const list = document.getElementById('dyn-permissions-list');
    const icon = document.getElementById('permissions-toggle-icon');

    if (header && list) {
        header.addEventListener('click', () => {
            const isHidden = list.style.display === 'none';
            list.style.display = isHidden ? 'flex' : 'none';
            if (icon) {
                icon.className = isHidden ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
            }
        });
    }
}

// Kommunikationsstruktur Accordion Toggle
function initCommStructureToggle() {
    const header = document.getElementById('comm-structure-toggle-header');
    const body = document.getElementById('dyn-comm-structure-body');
    const icon = document.getElementById('comm-structure-toggle-icon');

    if (header && body) {
        header.addEventListener('click', () => {
            const isHidden = body.style.display === 'none';
            body.style.display = isHidden ? 'block' : 'none';
            if (icon) {
                icon.className = isHidden ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
            }
        });
    }
}

// Utility: Debounce function for smooth resize
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        setTimeout(later, wait);
    };
}

// Helper to open PDF in new tab
function openPdfFullscreen() {
    window.open('./web/pdf/poster/poster.pdf', '_blank');
}

// Helper to reset poster scale by reloading page
function fitPosterWidth() {
    window.location.reload();
}

// Share Modal Handlers
function initShareModal() {
    const shareModal = document.getElementById('share-modal');
    const closeBtn = document.getElementById('share-modal-close');

    if (closeBtn && shareModal) {
        closeBtn.onclick = closeShareModal;
    }

    if (shareModal) {
        shareModal.onclick = (e) => {
            if (e.target === shareModal) {
                closeShareModal();
            }
        };
    }
}

function openShareModal() {
    const shareModal = document.getElementById('share-modal');
    const urlInput = document.getElementById('share-url-input');
    if (!shareModal) return;

    if (urlInput) {
        urlInput.value = window.location.href.startsWith('file:') 
            ? 'https://fl0777.github.io/studienprojekt-fdroid/' 
            : window.location.href;
    }
    shareModal.classList.add('active');
}

function closeShareModal() {
    const shareModal = document.getElementById('share-modal');
    if (shareModal) {
        shareModal.classList.remove('active');
    }
}

function copyShareUrl() {
    const urlInput = document.getElementById('share-url-input');
    const copyBtn = document.getElementById('share-copy-btn');
    if (!urlInput) return;

    const urlToCopy = urlInput.value || window.location.href;

    navigator.clipboard.writeText(urlToCopy).then(() => {
        if (copyBtn) {
            const originalHtml = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> <span>Kopiert!</span>';
            copyBtn.style.background = '#2E7D32';
            setTimeout(() => {
                copyBtn.innerHTML = originalHtml;
                copyBtn.style.background = '';
            }, 2000);
        }
        showToast('Webseiten-URL in Zwischenablage kopiert! 📋');
    }).catch(err => {
        console.error('Kopieren fehlgeschlagen:', err);
    });
}

// ==========================================================================
// CAD 3D MODEL VIEWER CONTROLS
// ==========================================================================
let isCadExploded = false;

function toggleCadExplosion() {
    const viewer = document.querySelector('#cad-topf-viewer');
    const toggleBtn = document.querySelector('#btn-toggle-explosion');
    if (!viewer) return;

    isCadExploded = !isCadExploded;

    if (isCadExploded) {
        viewer.src = './web/models/cad/topf-explosion.glb';
        if (toggleBtn) {
            toggleBtn.innerHTML = '<i class="fas fa-cube"></i> Explosionsansicht Aus';
        }
        showToast('3D-Explosionsansicht geladen 💥');
    } else {
        viewer.src = './web/models/cad/topf-geschlossen.glb';
        if (toggleBtn) {
            toggleBtn.innerHTML = '<i class="fas fa-layer-group"></i> Explosionsansicht An';
        }
        showToast('Geschlossenes 3D-Topfmodell geladen 🪴');
    }
}

function resetCadCamera() {
    const viewer = document.querySelector('#cad-topf-viewer');
    if (!viewer) return;

    if (typeof viewer.resetTurntable === 'function') {
        viewer.resetTurntable();
    }
    viewer.cameraOrbit = 'auto auto auto';
    viewer.cameraTarget = 'auto auto auto';
    viewer.fieldOfView = 'auto';
    showToast('Kameraansicht zurückgesetzt 🔄');
}


