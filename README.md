# Pavan Kalaganda — Portfolio Website

A modern, responsive, and accessible personal portfolio website built for GitHub Pages deployment. Designed to showcase skills, projects, education, and achievements with a polished professional aesthetic.

## Features

- **Modern Design**: Clean, professional aesthetic with elegant typography and spacing
- **Dark/Light Mode**: Toggle between themes with preference persistence
- **Fully Responsive**: Mobile-first design that works on all devices
- **Smooth Animations**: Scroll-triggered animations, typing effect, and canvas particle network
- **Accessibility**: ARIA labels, keyboard navigation, skip links, focus indicators, reduced motion support
- **SEO Optimized**: Meta tags, Open Graph, semantic HTML structure
- **GitHub Integration**: Live repository fetching and contribution graph
- **Performance**: Lazy loading, optimized assets, minimal dependencies

## Tech Stack

- **HTML5** — Semantic, accessible markup
- **CSS3** — Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript** — No frameworks required, minimal overhead
- **GitHub Pages** — Static hosting with custom domain support

## Project Structure

```
portfolio/
├── index.html          # Main HTML file (single-page application)
├── css/
│   └── styles.css      # Complete stylesheet with theming
├── js/
│   └── main.js         # All interactive functionality
├── assets/
│   └── resume.pdf      # Your CV/Resume PDF (add your file here)
├── README.md           # This file
└── package.json        # Optional: development dependencies
```

## Quick Start

### Option 1: Direct GitHub Pages (Recommended)

1. **Create a new repository** on GitHub named `portfolio` (or `username.github.io` for user site)
2. **Upload all files** from this folder to the repository
3. **Add your resume PDF** to `assets/resume.pdf`
4. **Enable GitHub Pages** in repository settings:
   - Go to **Settings → Pages**
   - Source: **Deploy from a branch**
   - Branch: **main** / **master**
   - Folder: **/(root)**
5. **Your site is live** at `https://username.github.io/portfolio/`

### Option 2: Local Development

No build step required! Simply open `index.html` in your browser:

```bash
# Using Python's built-in server (for proper module loading)
python -m http.server 8000

# Or using Node.js live-server
npm install
npm run dev
```

Then open `http://localhost:8000` or `http://localhost:3000`.

### Option 3: With Build Tools

If you want to add a build pipeline later:

```bash
# Install dependencies
npm install

# Start development server with live reload
npm run dev

# Build for production (copies files to dist/)
npm run build
```

## Customization Guide

### 1. Personal Information

Edit `index.html` to update:
- Name, title, and bio in the Hero section
- Contact details (email, phone, location)
- Social links (GitHub, LinkedIn, etc.)
- Project descriptions and metrics

### 2. Resume PDF

Replace `assets/resume.pdf` with your actual CV. The download buttons throughout the site link to this file.

### 3. GitHub Username

Update the GitHub username in `js/main.js`:

```javascript
const CONFIG = {
    githubUsername: 'your-username',
    // ...
};
```

### 4. Contact Form

The contact form uses Formspree by default. To activate:

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and get your endpoint URL
3. Replace `YOUR_FORM_ID` in the form action:

```html
<form action="https://formspree.io/f/YOUR_ACTUAL_FORM_ID" method="POST">
```

Alternatively, replace the form action with:
- Netlify Forms (`action="/success" netlify`)
- Google Forms embedded iframe
- Custom backend endpoint

### 5. Colors & Theme

Edit CSS custom properties in `css/styles.css`:

```css
:root {
  --color-primary: #4f46e5;    /* Change accent color */
  --color-secondary: #0d9488;  /* Change secondary accent */
}
```

### 6. Content Sections

All sections are clearly commented in `index.html`. You can:
- **Add work experience**: Duplicate timeline items in the Experience section
- **Add projects**: Duplicate project cards in the Projects section
- **Add certifications**: Add a new section following the existing pattern
- **Add publications**: Create a new section after Education

## Deployment

### GitHub Pages (Automatic)

With the included GitHub Actions workflow (`.github/workflows/deploy.yml`), your site will automatically deploy on every push to the main branch.

### Manual Deployment

```bash
# Clone your repository
git clone https://github.com/username/portfolio.git
cd portfolio

# Copy these files into the repository
cp -r /path/to/portfolio/* .

# Commit and push
git add .
git commit -m "Initial portfolio deployment"
git push origin main
```

### Custom Domain

1. Add a `CNAME` file to the repository root:
   ```
   www.yourdomain.com
   ```
2. Configure DNS records with your domain provider
3. Enable HTTPS in GitHub Pages settings

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Android)

## Accessibility Features

- Semantic HTML5 elements (`<nav>`, `<main>`, `<section>`, `<article>`)
- ARIA labels and roles throughout
- Keyboard-navigable interface
- Skip-to-content link
- Focus-visible indicators
- `prefers-reduced-motion` media query support
- Color contrast ratios meeting WCAG 2.1 AA standards
- Screen reader friendly structure

## Performance

- No external JavaScript frameworks (zero KB framework overhead)
- CSS custom properties for efficient theming
- Intersection Observer for lazy animations
- Lazy loading for images
- Preconnect hints for external resources
- Optimized font loading with `display=swap`

## License

This portfolio template is open source. Feel free to use, modify, and distribute.

## Contact

**Pavan Kalaganda**
- Email: 142301014@smail.iitpkd.ac.in
- GitHub: [@pavan-kalaganda](https://github.com/pavan-kalaganda)
- Phone: +91 96764 73214

---

Built with care at IIT Palakkad.
