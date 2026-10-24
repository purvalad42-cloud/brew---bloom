# Brew & Bloom Café

A responsive, four-page café website created for a Web Technology HTML5/CSS/JavaScript assignment.

## Pages

- `index.html` — Home page with hero, features and call-to-action
- `menu.html` — Menu table with table head/body, 8 menu items, category rows using `colspan`, and print styles
- `gallery.html` — Six-image gallery, video with controls and JavaScript lightbox
- `booking.html` — Reservation form with native validation, live custom messages and a Google Maps iframe

## Features

- Shared external stylesheet: `style.css`
- Shared JavaScript: `script.js`
- Semantic HTML5 elements: header, nav, main, section, article and footer
- Responsive layout using CSS Grid, Flexbox and media queries
- Dark/light mode persisted with `localStorage`
- Mobile hamburger navigation
- Click-to-enlarge gallery lightbox
- Booking form validation and inline error messages
- Print-friendly menu page

## Run locally

1. Download or clone the repository.
2. Open the project folder in VS Code.
3. Open `index.html` in a browser, or use the VS Code Live Server extension.

No build tools or packages are required.

## Publish

### GitHub

Create a repository, then run these commands in the project folder (replace the URL with your repository URL):

```bash
git init
git add .
git commit -m "Create Brew & Bloom café website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```
