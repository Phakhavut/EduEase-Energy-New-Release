# Implementation Plan: Quick Wins Quality & Performance Enhancements

Implement immediate, high-impact Quick Wins identified in the website audit, aligned with user preferences for branding, SEO, performance optimization, and trust building.

---

## 1. User Review & Confirmed Decisions

*   **Primary Title & Branding Tone**: `EduEase Energy OS - ระบบจัดการพลังงานและคำนวณค่าไฟอัจฉริยะ`
*   **Search & Social Snippet Description**: `แพลตฟอร์มบริหารจัดการพลังงานอัจฉริยะ คำนวณค่าไฟ MEA/PEA ระบบ TOU และวิเคราะห์แนวทางประหยัดพลังงานระดับบุคคล พร้อมระบบ Daily Energy Digest`
*   **Support & Trust Channels**: Compact Floating Quick Support widget featuring:
    1.  Interactive FAQ modal addressing common energy tariff, TOU, and meter calculation questions
    2.  Direct support email link (`23phakhavut43@gmail.com`)
    3.  PDPA Privacy Notice & Data Transparency summary modal explaining how energy data and email notifications are handled
    4.  Quick link to in-app User Manual

---

## 2. Proposed Changes

### A. Technical SEO & Social Share Preview Optimization (`index.html`)

*   **Metadata & OpenGraph Tags**:
    *   Update `<title>` and `<meta name="description">` to the selected Thai-focused branded title.
    *   Add comprehensive OpenGraph tags: `og:title`, `og:description`, `og:type="website"`, `og:site_name`, `og:locale="th_TH"`, and `og:image`.
    *   Add Twitter Card tags: `twitter:card="summary_large_image"`, `twitter:title`, `twitter:description`, and `twitter:image`.
    *   Add canonical URL dynamic tag and favicon / theme-color declarations.
*   **Structured Data (JSON-LD Schema)**:
    *   Embed Schema.org `WebApplication` detailing name, applicationCategory (`EnergyManagementApplication`, `UtilitiesApplication`), operatingSystem, offers, and featureList.
    *   Embed `FAQPage` Schema.org microdata for high search engine visibility and rich snippet eligibility on energy tariff questions.

### B. Performance Optimization & CDN Cleanup (`index.html`)

*   **Remove Redundant Render-Blocking CDN**:
    *   Remove unused `bootstrap.min.css` from `index.html` (the app is built completely on modern Tailwind CSS and Lucide icons; Bootstrap CSS adds unnecessary render-blocking delay and stylesheet conflicts).
    *   Preload key web fonts (`Prompt`, `Inter`, `JetBrains Mono`) with `rel="preload"` or `preconnect`.

### C. Trust & Support: Floating Quick Support Widget & PDPA Modal (`src/components/trust/QuickSupportWidget.tsx`)

*   **Floating Action Button**:
    *   Position a sleek, unobtrusive floating button at the bottom-right of the dashboard (`HelpCircle` / `ShieldCheck` icon) styled with Electric Blue / Emerald accents.
*   **Multi-Tab Support Modal**:
    *   **Tab 1: คำถามที่พบบ่อย (Concise FAQ)**: TOU On-Peak/Off-Peak calculations, Ft charges, smart meter telemetry sync, and appliance wattage tips.
    *   **Tab 2: ติดต่อฝ่ายสนับสนุน (Support & Feedback)**: Direct mailto link to `23phakhavut43@gmail.com`, copyable email badge, and quick issue submission form.
    *   **Tab 3: นโยบายความเป็นส่วนตัว (PDPA Summary)**: Clear, transparent summary of data retention, email consent, and zero third-party commercial selling of user telemetry.
*   **Integration**:
    *   Mount the widget into `Dashboard.tsx` so users have instant access across all views without cluttering existing Bento Cards.

---

## 3. Verification Plan

### Automated Verification
*   Execute `lint_applet` (`npm run lint` / `tsc --noEmit`) to verify zero TypeScript compilation issues.
*   Execute `compile_applet` (`npm run build`) to ensure Vite bundle passes with optimized assets.

### Manual & Functional Verification
1.  **SEO & Schema Validation**:
    *   Verify `<head>` tags in `index.html` contain valid OpenGraph, Twitter, and Schema.org JSON-LD scripts.
    *   Validate JSON-LD syntax using standard schema structure.
2.  **Performance Check**:
    *   Confirm removal of `bootstrap.min.css` does not break any existing card or grid layouts.
3.  **Support Widget Interactive Test**:
    *   Click floating support button at bottom-right to open modal.
    *   Test switching between FAQ, Contact Email, and PDPA tabs.
    *   Verify dark/light theme compatibility and responsive layout on mobile screen widths (< 400px).
