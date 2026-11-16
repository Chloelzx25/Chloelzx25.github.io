# Chloe Lim · Portfolio

Personal portfolio site. Plain HTML, CSS and JavaScript: no build step, no installs.

## Files

| File | What it is |
|---|---|
| `content.js` | **All the text on the site.** This is the only file you normally edit. |
| `index.html` | Page structure |
| `styles.css` | Colours, fonts and layout (change `--accent` at the top to restyle) |
| `main.js` | Turns `content.js` into the page |
| `assets/photo.jpg` | Your photo, shown only on the printable resume page (`resume/resume.html`) |
| `assets/og-preview.png` | The 1200×630 preview image shown when the link is shared |
| `assets/fonts/` | The two fonts, stored locally so the page loads faster |
| `404.html` | Page shown for a broken link |
| `assets/projects/` | Project screenshots |
| `assets/Chloe-Lim-Resume.pdf` | The resume the "Download resume" button gives out |
| `resume/resume.html` | Source of the resume PDF |

## Updating the site

1. Open `content.js` in VS Code. Every section has a comment explaining its fields.
2. **Add a project:** copy one `{ ... },` block in `projects`, change the text, and give it a new `id`. Put it where you want it in the list.
3. **Add a screenshot:** save an 800×500 PNG/JPG in `assets/projects/`, then set `img: "assets/projects/your-file.png"`. If `img` is left as `""`, a placeholder tile is shown.
4. **Link a skill to a project:** add the project's `id` to that skill's `proof` list.
6. **Project depth:** each project can have `decision` (one key decision and why), `checked` (how you tested it) and `next` (what you'd improve). Empty ones are hidden.
7. **Add certifications:** fill in the `certifications` list at the bottom; the section appears by itself.

Preview it locally before publishing:

```bash
python -m http.server 8000
```

Then open http://localhost:8000. Check it on a phone width too (in Chrome: F12, then the phone icon).

## Updating the resume

1. Edit `resume/resume.html`.
2. Put your photo at `assets/photo.jpg` (passport-style, plain background); it fills the box at the top right.
3. Open `resume/resume.html` in Chrome, press Ctrl+P, choose **Save as PDF**, paper **A4**, margins **None**, tick **Background graphics**, untick **Headers and footers**.
4. Save over `assets/Chloe-Lim-Resume.pdf`. Make sure it is still one page.

The resume has no phone number because the PDF is public on the site. Add one to a separate copy when you send applications directly.

## Publishing on GitHub Pages

1. Create a new public repository on GitHub named `Chloelzx25.github.io`.
2. Upload all the files in this folder (or push them with Git).
3. In the repository, go to **Settings → Pages**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`.
4. After a minute the site is live at https://chloelzx25.github.io/

After that, every change you push to `main` goes live by itself.

Once it's live, open `index.html` and change the two `assets/og-preview.png` links in the `<head>` to the full address (`https://chloelzx25.github.io/assets/og-preview.png`) so link previews work on WhatsApp and LinkedIn. The 404 page assumes the site is at the root of `chloelzx25.github.io`.
