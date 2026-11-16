/*
  ============================================================
  EVERYTHING ON THE SITE COMES FROM THIS FILE.
  Edit the text below, save, and refresh the page.
  You should never need to touch index.html or main.js.

  Rules of thumb:
  - Text goes inside "quotes". Keep the commas at the end of lines.
  - To hide something, leave it as "" (empty quotes).
  - The order of the projects list is the order on the page.
  ============================================================
*/

window.SITE = {

  /* ---------- About you ---------- */
  name: "Chloe Lim",
  fullName: "Chloe Lim Zhi Xin",
  role: "IT student · AI & Analytics",
  // One or two sentences, shown at the top of the page.
  intro:
    "Year 2 Information Technology student at Singapore Polytechnic, specialising in AI & Analytics. " +
    "I clean and analyse messy datasets, design the databases behind apps, and build the back ends that serve them.",
  status: "Looking for an AI & analytics internship",
  // TODO: add your internship period once SP confirms it, e.g. "Available Mar 2027 – Jan 2028"
  availability: "",
  location: "Singapore",



  // Paragraphs for the About section. Add or remove lines as you like.
  about: [
    "I'm in Year 2 of the Diploma in Information Technology at Singapore Polytechnic, and I chose the AI & Analytics specialisation because the part of projects I enjoy most is working out what the data actually says.",
    "My coursework has covered both sides of that: analysing real datasets in Python, and building the systems that store and serve data, from a gamified Express and MySQL app to a PostgreSQL ordering system with stored procedures and indexing.",
    "Before poly I worked as a barista at KOI Thé, where peak-hour rushes taught me to stay calm, communicate clearly and work as part of a team. I'm now looking for an internship where I can apply data and backend skills to real problems.",
  ],

  // Small facts shown beside the About text.
  facts: [
    ["cGPA", "3.49 (Year 2, Sem 1)"],
    ["Diploma", "Information Technology, Singapore Polytechnic"],
    ["Specialisation", "AI & Analytics"],
    ["Languages", "English, Chinese (native) · Korean (elementary)"],
  ],

  /* ---------- Links ---------- */
  email: "chloelzx2008@gmail.com",
  github: "https://github.com/Chloelzx25",
  linkedin: "https://www.linkedin.com/in/chloe-lim-zx",
  resume: "assets/Chloe-Lim-Resume.pdf",

  /* ---------- Projects ----------
     Fields:
       id        short name with no spaces (used for links from Skills)
       short     short name used on the Skills chips
       title     project name
       featured  true = big card at the top
       area      one of: "Data & AI", "Backend", "Databases", "Security"
       module    the module / context it was made for
       date      when you finished it, e.g. "August 2026" (shown as "Completed August 2026")
       team      "Solo" or who you worked with
       summary   one or two sentences: what it is
       did       bullet points: what YOU did (keep each one short)
       numbers   up to three [value, label] pairs (only for featured)
       decision  one key decision or problem you solved, and why (shown as "Key decision")
       checked   how you tested it (shown as "How I checked it"); "" hides it
       next      what you'd improve next (shown as "What I'd do next"); "" hides it
       stack     tools and languages used
       img       screenshot path, e.g. "assets/projects/wellness.webp" (800x500; .webp, .png or .jpg).
       alt       one sentence describing the screenshot, for screen readers
                 Leave "" to show the placeholder tile.
       repo      link to the GitHub repo (leave "" if it's private)
       live      link to a live demo (leave "" if none)
       media     optional extras shown under the card: a list of blocks, each one of
                 { type: "video", label, src, poster, caption }
                 { type: "gallery", label, items: [{ src, alt, title, note }] }   (click a chart to enlarge)
                 { type: "slides", label, interval, items: [{ src, alt, title }] } (changes by itself every few seconds; Pause button + scrolling off-screen stop it)
  */
  projects: [
    {
      id: "wellness",
      short: "Wellness Impact",
      title: "Wellness Impact",
      featured: true,
      area: "Backend",
      module: "Back-End Development (CA2)",
      date: "February 2026",
      team: "Solo",
      summary:
        "A full-stack wellness challenge tracker turned into an RPG: users complete real-life wellness challenges, play element-based minigames, and earn points to spend on characters and gear.",
      did: [
        "Built a REST API in Express with 32 routes across users, challenges, characters, shop, inventory and minigames",
        "Designed a 10-table MySQL schema and wrote the scripts that create and seed it",
        "Secured accounts with bcrypt password hashing and JWT-protected routes, plus an admin-only middleware",
        "Kept the rules on the server: per-challenge 30-minute cooldowns (HTTP 429), HP limits and purchase checks",
        "Wrote the front end in plain HTML, CSS and JavaScript, including 7 different minigames",
      ],
      numbers: [["32", "API routes"], ["10", "MySQL tables"], ["7", "minigames"]],
      decision:
        "The game rules live on the server, not in the browser. The API checks Mora before every purchase, refuses a challenge while it's on cooldown (HTTP 429) and blocks characters at 0 HP, so editing the page can't skip a cooldown or buy items for free.",
      checked: "",
      next: "",
      stack: ["Node.js", "Express", "MySQL", "JWT", "bcrypt", "JavaScript", "HTML/CSS"],
      img: "assets/projects/wellness.webp",
      alt: "The Wellness Impact dashboard showing five adventurer cards with HP and XP bars, plus a list of recent challenge completions",
      repo: "https://github.com/Chloelzx25/wellness-impact",
      live: "",
    },
    {
      id: "restaurant",
      short: "Restaurant DB",
      title: "Restaurant Ordering System",
      featured: true,
      area: "Databases",
      module: "Database Management Systems (CA2)",
      date: "August 2026",
      team: "Solo",
      summary:
        "Cart, checkout and order placement for a restaurant ordering system, built on PostgreSQL with Prisma ORM, with stackable discounts and tiered delivery fees.",
      did: [
        "Modelled cart, cart item, discount and delivery-tier tables in Prisma, with unique and cascade rules",
        "Built cart and checkout APIs where every total is computed server-side and ownership is checked",
        "Made discounts data-driven: a new rule is one INSERT, with no code or schema change",
        "Wrote a place_orders stored procedure that checks cart ownership, orders each available item and skips unavailable ones without undoing the rest",
        "Tested B-tree indexes with EXPLAIN ANALYZE on ~818k rows, cutting one query from 468 ms to 216 ms",
      ],
      numbers: [["2.2×", "faster query after indexing"], ["818k", "rows benchmarked"], ["5", "cart API endpoints"]],
      decision:
        "Each cart item stores the price at the time it was added, so a member's total doesn't jump if the menu price changes later. Indexing taught me selectivity: an index on a column where 20% of rows matched barely helped (381 → 380 ms), while a more selective column ran 2.2× faster.",
      checked:
        "Tried deleting another member's cart item (rejected), ran checkout with no discount, one discount and both stacked across all three delivery tiers, and placed an order with one unavailable item to confirm it stayed in the cart.",
      next: "",
      stack: ["PostgreSQL", "Prisma", "Node.js", "Express", "SQL", "Bootstrap"],
      img: "assets/projects/restaurant.webp",
      alt: "The restaurant checkout page listing two items, a 10% quantity discount, a 5% spend discount and free delivery, for a total of $100.64",
      repo: "https://github.com/Chloelzx25/restaurant-ordering-system",
      live: "",
    },
    {
      id: "graduates",
      short: "Graduate study",
      title: "Does a Degree Pay? Graduate vs National Workforce",
      featured: true,
      area: "Data & AI",
      module: "Programming for Data Analysis (CA2)",
      date: "July 2026",
      team: "Group of 4, with Ying En, Mehreen and Rishika",
      summary:
        "How a university degree affected salary and job stability in Singapore from 2013 to 2020, compared against the national workforce using data.gov.sg datasets and a UiPath automation workflow.",
      did: [
        "Finalised the research question and chose the national datasets to compare against",
        "Built the boxplot analysis and uploaded the datasets for the team to use",
        "Put together the slide deck presenting the findings",
        "Finding: graduate employment stayed above 90%, about 10 points above the national rate, even in 2020",
      ],
      numbers: [["5", "datasets combined"], ["8", "years analysed"], ["~10 pts", "graduate employment gap"]],
      decision:
        "Graduate salaries rising could just mean the whole job market moved. So I added Singapore's national median income and employment rate as a baseline, letting us compare graduates against everyone else rather than against themselves.",
      checked: "",
      next: "",
      stack: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "UiPath"],
      img: "",
      repo: "https://github.com/Chloelzx25/graduate-employment-analysis",
      live: "",
      media: [
        {
          "type": "video",
          "label": "Demo video · UiPath workflow",
          "src": "assets/media/uipath-graduates.mp4",
          "poster": "assets/media/uipath-graduates-poster.webp",
          "caption": "Screen recording of the UiPath workflow running in debug mode: it opens data.gov.sg in Chrome and downloads the datasets used in the analysis."
        },
        {
          "type": "gallery",
          "label": "Charts from the analysis",
          "items": [
            {
              "src": "assets/charts/grad-median-income.webp",
              "alt": "Line chart of national median income rising from about 3,250 dollars in 2013 to 4,000 dollars in 2019 and 2020",
              "title": "Median income, 2013–2020",
              "note": "National median income (excluding employer CPF) rose from about $3,250 to $4,000, then held steady in 2020."
            },
            {
              "src": "assets/charts/grad-degree-vs-non.webp",
              "alt": "Density curves of monthly income for degree and non-degree holders in 2013 and 2020",
              "title": "Degree vs non-degree income",
              "note": "In both 2013 and 2020 the degree holders' income curve sits further right, meaning higher incomes."
            },
            {
              "src": "assets/charts/grad-employment-rate.webp",
              "alt": "Bar chart of the employment rate for each year from 2013 to 2020, all close to 80 percent",
              "title": "Employment rate, 2013–2020",
              "note": "The national employment rate stayed at roughly 80% in every year."
            },
            {
              "src": "assets/charts/grad-pairplot.webp",
              "alt": "Pairplot of employment rate and salary measures, coloured by 2013–2016 and 2017–2020",
              "title": "Salary and employment relationships",
              "note": "Gross and basic monthly median salary move almost in a straight line, and salaries in 2017–2020 sit higher than in 2013–2016."
            }
          ]
        }
      ],
    },
    {
      id: "mylearning",
      short: "MyLearningAI",
      title: "MyLearningAI: AI-Assisted Learning App",
      featured: false,
      area: "Design & UX",
      module: "Design for User Interaction (CA1–CA3)",
      date: "February 2026",
      team: "Group of 4, with Ethan, Ying En and Brian",
      summary:
        "A mobile learning app that adapts practice to each student, taken from user research to a sitemap, wireframes and a clickable Figma prototype, then tested with real students. Ethan later built our design into the working web app linked below.",
      did: [
        "Created the student persona from our user interviews",
        "Designed 21 wireframe screens in Figma: login and sign-up, home, and the AI Lesson Companion",
        "Started the clickable prototype and researched our usability test plan",
        "Ran and analysed one of our four usability tests (100% task completion), then designed new tablet features",
      ],
      decision:
        "We tested with real students instead of judging the design ourselves. My participant finished every task unaided, but asked for a clearer 'Start New Test' button on the home page and clearer guidance on which files can be uploaded as notes.",
      checked: "",
      next: "",
      stack: ["Figma", "Wireframing", "Prototyping", "Usability testing", "UX research"],
      img: "assets/projects/mylearningai.webp",
      alt: "Three phone screens: the home menu, a performance dashboard and a concept link map",
      repo: "https://github.com/EthanYap123/student-study-planner",
      live: "https://ethanyap123.github.io/student-study-planner/",
    },
    {
      id: "jobs",
      short: "Job salaries",
      title: "Job Posting Salary Analysis",
      featured: false,
      area: "Data & AI",
      module: "Programming for Data Analysis (CA1)",
      date: "May 2026",
      team: "Solo",
      summary:
        "How salary varies by experience level, work type and location across 123,849 job postings, merged from five messy source files.",
      did: [
        "Merged 5 CSV and Excel files on job_id with left joins and dropped junk columns",
        "Normalised hourly, weekly and monthly pay to annual figures and removed outliers",
        "Grouped and aggregated with Pandas and drew 5 different chart types in Matplotlib",
      ],
      decision:
        "Salaries came hourly, weekly, biweekly and monthly, so they couldn't be compared directly. I converted all of them to annual pay (hourly × 2,080 hours) and kept only $15k–$500k to drop clearly wrong entries.",
      checked: "",
      next: "",
      stack: ["Python", "Pandas", "Matplotlib", "Jupyter"],
      img: "",
      repo: "https://github.com/Chloelzx25/job-salary-analysis",
      live: "",
      media: [
        {
          "type": "gallery",
          "label": "Charts from the analysis",
          "items": [
            {
              "src": "assets/charts/jobs-salary-distribution.webp",
              "alt": "Histogram of annual salaries with the mean at 88,411 dollars and the median at 80,000 dollars",
              "title": "Distribution of annual salary",
              "note": "The mean ($88,411) is above the median ($80,000), so a few very high salaries pull the average up."
            },
            {
              "src": "assets/charts/jobs-work-type.webp",
              "alt": "Box plot of annual salary for full-time, contract, part-time and internship roles",
              "title": "Salary by work type",
              "note": "Contract roles have the highest median and internships the lowest. Full-time has many high outliers."
            },
            {
              "src": "assets/charts/jobs-experience-worktype.webp",
              "alt": "Line chart of average salary by experience level for full-time, contract and part-time work",
              "title": "Salary by experience and work type",
              "note": "Pay rises with seniority, except part-time, which drops at Executive level while full-time keeps rising."
            },
            {
              "src": "assets/charts/jobs-top-locations.webp",
              "alt": "Bar chart of the ten locations with the highest average annual salary",
              "title": "Top 10 locations by average salary",
              "note": "Averages for places with few postings can be very high, so treat these with care."
            },
            {
              "src": "assets/charts/jobs-salary-share.webp",
              "alt": "Pie chart of average salary share by experience level",
              "title": "Salary share by experience level",
              "note": "Executive (29.0%) and Director (24.3%) have the largest slices, and Internship (7.9%) the smallest."
            }
          ]
        }
      ],
    },
    {
      id: "secure",
      short: "Secure coding",
      title: "Finding and Fixing XSS and SQL Injection",
      featured: false,
      area: "Security",
      module: "Secure Coding (CA2)",
      date: "August 2026",
      team: "Pair, with Ying En",
      summary:
        "Exploited two high-risk flaws in a listings web app live, then fixed them: stored XSS (CWE-79) and SQL injection (CWE-89).",
      did: [
        "Demonstrated a UNION-based SQL injection that read table and column names from information_schema",
        "Replaced string-built SQL with parameterised queries so input is always treated as data",
        "Stopped stored XSS with sanitize-html middleware that cleans input before it is saved",
      ],
      decision:
        "We fixed both flaws at the boundary: sanitising runs as middleware before the route handler, so it applies however the request is sent, and every query uses ? placeholders.",
      checked:
        "Re-ran both attacks after each fix: the XSS payload was saved as harmless text with no alert, and the injection payload no longer returned other tables' data.",
      next: "",
      stack: ["Node.js", "Express", "SQL", "sanitize-html", "OWASP"],
      img: "",
      repo: "",
      live: "",
      media: [
        {
          "type": "slides",
          "label": "From the presentation",
          "interval": 5000,
          "items": [
            {
              "src": "assets/slides/secure-1.webp",
              "alt": "Slide: what stored XSS is, in four steps from the attacker's input to the script running for every viewer",
              "title": "Stored XSS: what it is"
            },
            {
              "src": "assets/slides/secure-2.webp",
              "alt": "Slide: live demo entering a script tag as a listing title on the Sell page",
              "title": "Stored XSS: live demo"
            },
            {
              "src": "assets/slides/secure-3.webp",
              "alt": "Slide: the fix, sanitising input with sanitize-html middleware before it is stored",
              "title": "Stored XSS: the fix"
            },
            {
              "src": "assets/slides/secure-4.webp",
              "alt": "Slide: what SQL injection is, in four steps from crafted input to an altered query",
              "title": "SQL injection: what it is"
            },
            {
              "src": "assets/slides/secure-5.webp",
              "alt": "Slide: live demo using a UNION SELECT payload in the search bar to read table and column names",
              "title": "SQL injection: live demo"
            },
            {
              "src": "assets/slides/secure-6.webp",
              "alt": "Slide: the fix, using parameterised queries so the same payload no longer works",
              "title": "SQL injection: the fix"
            }
          ]
        }
      ],
    },
  ],

  /* ---------- Skills ----------
     Each group has a list of skills. "proof" lists project ids (from above)
     where you used that skill, so visitors can click through to evidence.
  */
  skills: [
    {
      group: "Data & analytics",
      items: [
        { name: "Python", proof: ["jobs", "graduates"] },
        { name: "Pandas & NumPy", proof: ["jobs", "graduates"] },
        { name: "Matplotlib & Seaborn", proof: ["jobs", "graduates"] },
        { name: "Data cleaning & merging", proof: ["jobs", "graduates"] },
        { name: "Jupyter Notebook", proof: ["jobs", "graduates"] },
        { name: "UiPath (RPA)", proof: ["graduates"] },
      ],
    },
    {
      group: "Back end",
      items: [
        { name: "JavaScript", proof: ["wellness", "restaurant"] },
        { name: "Node.js & Express", proof: ["wellness", "restaurant", "secure"] },
        { name: "REST API design", proof: ["wellness", "restaurant"] },
        { name: "JWT & bcrypt auth", proof: ["wellness"] },
        { name: "HTML, CSS & Bootstrap", proof: ["wellness", "restaurant"] },
      ],
    },
    {
      group: "Databases",
      items: [
        { name: "SQL", proof: ["wellness", "restaurant", "secure"] },
        { name: "MySQL", proof: ["wellness"] },
        { name: "PostgreSQL", proof: ["restaurant"] },
        { name: "Prisma ORM", proof: ["restaurant"] },
        { name: "Stored procedures & transactions", proof: ["restaurant"] },
        { name: "Indexing & query tuning", proof: ["restaurant"] },
      ],
    },
    {
      group: "Security & tools",
      items: [
        { name: "OWASP: XSS & SQL injection", proof: ["secure"] },
        { name: "Parameterised queries", proof: ["secure", "restaurant"] },
        { name: "Input sanitisation", proof: ["secure"] },
        { name: "Git & GitHub", proof: ["wellness", "restaurant"] },
      ],
    },
    {
      group: "Design & UX",
      items: [
        { name: "Figma wireframes & prototypes", proof: ["mylearning"] },
        { name: "Usability testing", proof: ["mylearning"] },
        { name: "Personas & user research", proof: ["mylearning"] },
      ],
    },
  ],

  // Soft skills: [skill, where it comes from]
  softSkills: [
    ["Teamwork", "Three group projects (pairs and teams of 4), and peak-hour shifts at KOI Thé"],
    ["Communication", "Presented findings and live security demos, interviewed usability-test participants, and handled complex customer orders"],
    ["Working under pressure", "Busy café rushes while keeping hygiene and order accuracy high"],
    ["Attention to detail", "Data cleaning, server-side validation and accurate POS cashiering"],
  ],

  /* ---------- Experience ---------- */
  experience: [
    {
      title: "Barista",
      org: "KOI Thé Singapore",
      dates: "Nov 2024 – Apr 2025",
      points: [
        "Worked high-volume shifts in a small team and helped hit daily sales targets",
        "Handled POS cashiering accurately and kept the manager updated on outlet needs",
        "Managed complex drink customisations during peak hours while keeping service friendly",
      ],
    },
  ],

  /* ---------- Education ---------- */
  education: [
    {
      school: "Singapore Polytechnic",
      award: "Diploma in Information Technology (AI & Analytics specialisation)",
      dates: "2025 – 2028 (expected)",
      note: "cGPA 3.49 as of Year 2, Semester 1",
    },
    {
      school: "Yishun Secondary School",
      award: "GCE O-Level",
      dates: "2021 – 2024",
      note: "",
    },
  ],

  // Optional: certifications or awards. Example:
  // ["Google Data Analytics Certificate", "Coursera", "2026"],
  certifications: [],
};
