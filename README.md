# Manohar & Co - Technical Documentation

## Project Overview

Static website for Manohar & Co (Nagaraja Electrical Stores), an electrical and plumbing supplies retailer established in 1980, based in Kolar, Karnataka.

**Version:** 1.0.0  
**Last Updated:** December 2025

---

## Recent UI Updates (Dec 2025)

- About section timeline cards are now wider for improved readability on all devices.
- Leadership section founder image border is now ultra-thin for a more elegant look.
- Hyperspeed animated background was removed from the About section for performance and clarity.

---

## Technology Stack

### Core
- HTML5
- CSS3
- JavaScript (ES6+)

### Dependencies

| Library | Version | Source |
|---------|---------|--------|
| GSAP | 3.12.2 | CDN (cdnjs) |
| ScrollTrigger Plugin | 3.12.2 | CDN (cdnjs) |
| Three.js | 0.160.0 | CDN (cdnjs) |

### Typography

| Font | Type | Provider |
|------|------|----------|
| Playfair Display | Display | Google Fonts |
| Inter | Sans-serif | Google Fonts |

---

## Architecture

```
manohar-co/
├── index.html              # Entry point
├── README.md               # Documentation
├── css/
│   └── styles.css          # Stylesheet (~3800 lines)
├── js/
│   └── main.js             # Application logic (~1370 lines)
└── images/
    ├── logo.png            # Brand logo
    └── Rtn.Ashwin.png      # Leadership image
```

---

## Component Structure

### Navigation
- Fixed positioning with scroll-aware background opacity
- Mobile-responsive hamburger menu
- Smooth scroll navigation to anchor points

### Hero Section
- Three.js WebGL canvas for particle animation
- Responsive typography scaling
- Call-to-action buttons

### About Section
- Heritage timeline with milestone markers (1980–2024)
- GSAP scroll-triggered reveal animations
- CSS Grid layout
- **Cards are now wider for better readability**

### Statistics Section
- Intersection Observer-based counter animation
- Metrics displayed: Years of Trust, Customers, Products, Staff

### Products Section
- Tab-based category navigation
- Seven categories: Wires, Lights, Switches, Fans, Plumbing, Conduit, Pumps
- Dynamic panel switching

### Leadership Section
- Founder profile display
- Responsive card layout
- **Founder image border is now ultra-thin and elegant**

### Contact Section
- Form with client-side validation
- Business contact information

### Footer
- Multi-column navigation
- Copyright information

---

## CSS Architecture

### Design Tokens

```css
--color-primary: #E8A838
--color-secondary: #1a1a1a
--color-text: #ffffff
--color-text-gray: #888888
--font-display: 'Playfair Display', serif
--font-body: 'Inter', sans-serif
```

### Breakpoints

| Width | Target |
|-------|--------|
| 1200px+ | Large desktop |
| 1024px | Desktop |
| 768px | Tablet |
| 480px | Mobile |

---

## JavaScript Functions

| Function | Description |
|----------|-------------|
| `initNavigation()` | Mobile menu and scroll behavior |
| `initHeroCanvas()` | Three.js particle system |
| `initProductTabs()` | Product category switching |
| `initScrollAnimations()` | GSAP ScrollTrigger configuration |
| `initContactForm()` | Form validation |
| `initStatsCounter()` | Animated number counters |

---

## Deployment

### Local Development

```bash
# Python
python -m http.server 8000

# Node.js
npx http-server -p 8000

# PHP
php -S localhost:8000
```

### Production Requirements
- Static file hosting
- HTTPS configuration
- GZIP compression enabled
- Cache headers configured

---

## Browser Support

| Browser | Minimum Version |
|---------|-----------------|
| Chrome | 90 |
| Firefox | 88 |
| Safari | 14 |
| Edge | 90 |
| Internet Explorer | Not Supported |

---

## Performance Targets

| Metric | Target Score |
|--------|--------------|
| Performance | 85+ |
| Accessibility | 90+ |
| Best Practices | 90+ |
| SEO | 90+ |

---

## Asset Specifications

| Asset | Recommended Dimensions |
|-------|----------------------|
| logo.png | 200 × 60 px |
| Rtn.Ashwin.png | 400 × 500 px |

---

## Limitations

1. Contact form requires backend integration for submission processing
2. Three.js rendering may affect performance on low-specification devices
3. Client-side JavaScript dependency for interactive features

---

## License

Proprietary. All rights reserved.  
© 2024 Manohar & Co (Nagaraja Electrical Stores)

---

##Contact

**Manohar & Co (Nagaraja Electrical Stores)**  
Near Clock Tower, M.G. Road  
Kolar - 563101, Karnataka

Phone: +91 9876543210  
Email: manoharelectricals@gmail.com
