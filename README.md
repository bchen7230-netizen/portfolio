# Brandon Chen — Portfolio

A fast, static portfolio site. No build step, no framework, no `npm install`.
Everything you see is generated from one data file.

## Run it locally

The site uses JavaScript modules, so it has to be **served**, not opened as a
file (double-clicking `index.html` will show a blank page).

- **Windows:** double-click `tools/preview.bat`
- **Mac:** double-click `tools/preview.command` (first time: right-click > Open)
- **Anything with Python:** run `python -m http.server 8080` in this folder,
  then open http://localhost:8080

## Edit your content

Open **`content/portfolio.js`** in any text editor. That single file holds your
name, bio, projects, experience, skills and links. Comments at the top explain
every field. Save, refresh the browser, done.

- **Photos** go in `assets/images/`. Keep them reasonably sized (a phone photo
  is fine). Reference them by their `stem` in the data file.
- **Resume** is `assets/docs/brandon-chen-resume.pdf`. Replace that file to update it.
- **CAD models** go in `assets/cad/`. See `CAD-EXPORT.md` for how to export from
  SolidWorks or Fusion. STEP or STL both work; native `.SLDPRT` does not.

## Add a project

In `content/portfolio.js`, copy an existing block inside `projects: [ ... ]`,
change the fields, and drop your images in `assets/images/`. The block types you
can use (headings, paragraphs, bullet columns, code, tables, galleries, the 3D
viewer) are listed in the comment at the top of that file.

## Publish it (no command line needed)

**Recommended — Netlify Drop:**
1. Go to https://app.netlify.com/drop
2. Drag this whole folder onto the page.
3. You get a live URL in about 30 seconds. To update, drag the folder again.

**GitHub Pages:**
1. Create a repository, upload every file in this folder (drag them into the
   GitHub web uploader).
2. Settings > Pages > Deploy from branch > `main` / root.
3. Your site is at `https://<username>.github.io/<repo>/`.

Either way, upload the **contents** of this folder (so `index.html` is at the
top level of what you publish).

## What is where

```
index.html              the page
content/portfolio.js    >>> YOUR CONTENT — edit this <<<
content/starter.portfolio.js   blank version to start a fresh site from
css/                    styles (main.css, self-hosted fonts)
js/                     app.js (renders the page), viewer.js (3D)
assets/                 images, cad, video, docs, fonts
vendor/                 three.js + the STEP importer (do not edit)
tools/                  local preview launchers
CAD-EXPORT.md           how to export CAD for the viewer
```

## Notes

- Works offline once loaded; no third-party requests (fonts are self-hosted).
- Light and dark themes; the toggle is top-right. Your choice is remembered.
- Press Ctrl+P (Cmd+P) to print or save the whole portfolio as a clean PDF.
- Designed mobile-first; check it on your phone before a career fair.
