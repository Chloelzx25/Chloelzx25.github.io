# Chloe Lim | Portfolio

My personal portfolio website: **https://chloelzx25.github.io/**

I'm a Year 2 Information Technology student at Singapore Polytechnic, specialising in AI & Analytics. The site shows my projects in data analysis, back-end development, databases and secure coding, along with my skills, experience and resume.

## What's on the site

- **Projects** with a short summary, what I did, a key decision, and links to the code
- **Charts** from my two data analysis projects, which open larger when clicked
- **A demo video** of a UiPath automation workflow
- **A slideshow** from my secure coding presentation on stored XSS and SQL injection
- **Skills, experience and education**
- **A downloadable one-page resume**

## My projects

| Project | Code |
|---|---|
| Wellness Impact: gamified wellness app (Express, MySQL, JWT) | [wellness-impact](https://github.com/Chloelzx25/wellness-impact) |
| Restaurant Ordering System (PostgreSQL, Prisma, Node.js) | [restaurant-ordering-system](https://github.com/Chloelzx25/restaurant-ordering-system) |
| Does a Degree Pay? Graduate vs national workforce (Python, UiPath) | [graduate-employment-analysis](https://github.com/Chloelzx25/graduate-employment-analysis) |
| Job Posting Salary Analysis (Python, pandas) | [job-salary-analysis](https://github.com/Chloelzx25/job-salary-analysis) |

## How it's built

A plain static site with no build step and no frameworks, hosted free on GitHub Pages.

- **HTML, CSS and JavaScript** only
- All the text lives in one file, `content.js`, and `main.js` turns it into the page
- Responsive layout that works on phones, tablets and laptops
- Keyboard-friendly controls, text alternatives for images, and a colour scheme with good contrast

## Project structure

```
├── index.html        page structure
├── styles.css        design
├── main.js           builds the page from content.js
├── content.js        all the text, projects and links
├── 404.html          page for broken links
├── resume/
│   └── resume.html   source of the resume PDF
└── assets/
    ├── Chloe-Lim-Resume.pdf
    ├── charts/       chart images
    ├── slides/       secure coding slides
    ├── media/        demo video
    ├── projects/     project screenshots
    └── fonts/
```

## Run it on your computer

1. Download or clone this repo.
2. Open the folder in VS Code and start the **Live Server** extension, or run `python -m http.server` in the folder.
3. Open the address it shows, for example `http://localhost:8000`.

Opening `index.html` by double-clicking may work, but a local server is more reliable.

## Update the site

- **Text, projects and links:** edit `content.js`.
- **Resume:** edit `resume/resume.html`, print it to PDF from Chrome (A4, no margins, background graphics on), and save it over `assets/Chloe-Lim-Resume.pdf`.
- **Publish:** commit the changes to the `main` branch. GitHub Pages updates in about a minute.

## Credits

- Fonts: [Schibsted Grotesk](https://fonts.google.com/specimen/Schibsted+Grotesk) and [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono), both under the SIL Open Font License.
- Charts, slides and screenshots are from my own coursework. Some projects were done in groups, as noted on each project card.
