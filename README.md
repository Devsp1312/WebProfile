# Dev Patel's Portfolio

A minimal, Apple-clean portfolio website featuring a single-page design with smooth scrolling, responsive navigation, and subtle animations.

## Features

- **Single-page design** with smooth scrolling navigation
- **Apple-inspired minimal aesthetic** with lots of whitespace
- **Fully responsive** - mobile-first design with hamburger menu
- **Smooth animations** - fade-in effects on scroll
- **Active navigation highlighting** - tracks scroll position
- **Contact form** with client-side validation
- **Project showcase** with tech tags and links
- **Work experience** timeline

## Technologies Used

- HTML5
- CSS3 (vanilla, no frameworks)
- JavaScript (ES6+, no libraries)
- Modern system font stack for optimal performance

## Quick Start

### Option 1: Open Directly in Browser

1. Navigate to the project folder
2. Double-click `index.html` to open in your default browser

### Option 2: Using Live Server (Recommended)

If you have the Live Server extension in VS Code:

1. Right-click on `index.html`
2. Select "Open with Live Server"
3. Your browser will open automatically at `http://localhost:5500`

### Option 3: Using Python HTTP Server

```bash
# For Python 3
python3 -m http.server 8000

# Then open your browser to:
# http://localhost:8000
```

### Option 4: Using Node.js HTTP Server

```bash
# Install http-server globally (one time)
npm install -g http-server

# Run the server
http-server -p 8000

# Then open your browser to:
# http://localhost:8000
```

## File Structure

```
WebProfile/
├── index.html          # Main single-page portfolio
├── css/
│   └── styles.css      # All styling with CSS variables
├── js/
│   └── script.js       # Interactive features & animations
├── images/             # (Add your images here)
├── about.html          # (Legacy - not used in single-page version)
├── contact.html        # (Legacy - not used in single-page version)
├── projects.html       # (Legacy - not used in single-page version)
└── README.md           # This file
```

## Customization Guide

### Update Personal Information

**In `index.html`:**

1. **Hero Section** (Lines 28-37):
   - Replace "Dev Patel" with your name
   - Update the subtitle with your role and focus areas

2. **About Section** (Lines 42-62):
   - Update the about text paragraph
   - Modify the three highlight items with your skills/interests

3. **Projects Section** (Lines 67-190):
   - Edit project titles, descriptions, and tech tags
   - Update GitHub and Live Demo links
   - Add or remove project cards as needed

4. **Work Experience** (Lines 195-256):
   - Update job titles, companies, dates
   - Modify the bullet points for each role
   - Add or remove work items

5. **Contact Section** (Lines 261-320):
   - Update email address
   - Update LinkedIn and GitHub URLs

### Customize Colors & Styling

**In `css/styles.css`:**

Edit the CSS variables at the top (Lines 8-30):

```css
:root {
  --color-bg: #fafafa;           /* Background color */
  --color-text: #1d1d1f;          /* Main text color */
  --color-accent: #0071e3;        /* Accent color for links */
  --spacing-md: 24px;             /* Adjust spacing scale */
  --max-width: 1100px;            /* Max content width */
}
```

### Dark Mode (Optional)

To switch to a dark theme, update these variables:

```css
:root {
  --color-bg: #1c1c1e;
  --color-surface: #2c2c2e;
  --color-text: #f5f5f7;
  --color-text-secondary: #98989d;
  --color-border: #38383a;
}
```

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- No external dependencies or frameworks
- Minimal JavaScript (~200 lines)
- Optimized CSS with efficient selectors
- Uses system fonts for instant loading
- Smooth 60fps animations

## License

MIT License - feel free to use this template for your own portfolio!

## Credits

Created by Dev Patel - 2026
