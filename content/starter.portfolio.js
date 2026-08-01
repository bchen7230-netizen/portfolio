/* ============================================================================
   starter.portfolio.js — a blank starting point.
   To use: fill this in, then rename it to portfolio.js (back up the old one).
   Every field with "TODO" needs your input. Delete sections you do not want.
   ========================================================================== */
window.PORTFOLIO = {
  meta: {
    name: "TODO Your Name", firstName: "TODO", lastName: "NAME",
    tagline: "TODO one line that sounds like you.",
    role: "Mechanical Engineering", subtitle: "Project Portfolio",
    location: "TODO City, State",
    email: "TODO@example.com", phone: "", showPhone: false,
    resume: "assets/docs/resume.pdf",
    portrait: { stem: "portrait", widths: [700, 1100], alt: "TODO Your Name" },
    bleed:    { stem: "bleed", widths: [1200, 1900], alt: "TODO background photo" },
    social: "assets/images/social-card.jpg",
    links: [
      { label: "LinkedIn", url: "" },
      { label: "GitHub",   url: "" },
      { label: "Email",    url: "mailto:TODO@example.com" }
    ],
    seo: { title: "TODO Name — Mechanical Engineering Portfolio",
           description: "TODO one sentence for search engines and link previews." }
  },
  theme: { accent: "blueprint", mode: "light" },
  facts: [
    { k: "Institution", v: "TODO School" },
    { k: "Degree",      v: "TODO B.S. ..." },
    { k: "Graduating",  v: "TODO Month Year", mono: true },
    { k: "GPA",         v: "TODO / 4.00", mono: true },
    { k: "Based",       v: "TODO City" }
  ],
  about: {
    heading: "About",
    pitch: "TODO one strong sentence about who you are.",
    body: ["TODO a paragraph.", "TODO another paragraph."],
    highlights: [
      { v: "TODO", k: "TODO an achievement" },
      { v: "TODO", k: "TODO another" }
    ]
  },
  projects: [
    {
      id: "project-one",
      title: "TODO Project Title",
      subtitle: "TODO one-line description",
      categories: ["TODO Category"],
      year: "TODO",
      role: "TODO your role",
      setting: "TODO course or company",
      status: "TODO complete / in progress",
      summary: "TODO two sentences on what it is and why it matters.",
      metrics: [
        { v: "TODO", k: "TODO label", note: "TODO detail" }
      ],
      tools: ["TODO Tool", "TODO Tool"],
      hot: 1,
      blocks: [
        { t: "p", text: "TODO describe the problem and what you did." },
        // Add an image gallery:
        // { t: "gallery", media: [
        //   { type: "image", stem: "myphoto", widths: [640,1000,1600], span: 8, alt: "TODO", caption: "Fig. 1" }
        // ]},
        // Add a 3D model (export STEP or STL — see CAD-EXPORT.md):
        // { t: "cad", label: "TODO part", file: "assets/cad/part.step", units: "mm", note: "TODO" }
      ]
    }
  ],
  experience: [
    { org: "TODO Company", title: "TODO Title", period: "TODO dates", location: "TODO",
      bullets: ["TODO accomplishment with a number in it."] }
  ],
  education: [
    { school: "TODO School", degree: "TODO Degree", detail: "GPA TODO",
      period: "Expected TODO", location: "TODO" }
  ],
  certifications: [
    // { name: "TODO", issuer: "TODO", year: "TODO" }
  ],
  coursework: ["TODO Course", "TODO Course"],
  skills: [
    { group: "TODO Group", items: [
      { name: "TODO Skill", note: "TODO evidence — where you used it" }
    ]}
  ],
  hobbies: {
    heading: "Away from the bench",
    items: [
      { title: "TODO Hobby", text: "TODO a couple of sentences." }
    ]
  },
  contact: {
    heading: "Get in touch",
    text: "TODO what you are looking for.",
    cta: "Email me"
  }
};
