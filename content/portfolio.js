/* ============================================================================
   portfolio.js  —  THE ONLY FILE YOU NEED TO EDIT
   ----------------------------------------------------------------------------
   Everything on the site is generated from this object. Add a project by
   copying an existing block in `projects` and changing the fields.

   Block types available inside a project's `blocks` array:
     {t:"h",     text, n}                     section heading (n = "01.1" etc)
     {t:"p",     text}                        paragraph (allows <b> <i> <a>)
     {t:"cols",  groups:[[ "item", ... ]]}    multi-column bullet lists
     {t:"units", items:[{label,title,text}]}  labelled boxes side by side
     {t:"code",  lang, code, caption, kw}     code figure
     {t:"table", head:[], rows:[[]], note}    data table
     {t:"svg",   src, caption, scale}         inlined diagram
     {t:"gallery", media:[...]}               image / video grid
     {t:"cad",   label, file, units, note}    interactive 3D viewer
   ========================================================================== */

window.PORTFOLIO = {

  /* -- identity ------------------------------------------------------------ */
  meta: {
    name: "Brandon Chen",
    firstName: "Brandon",
    lastName: "Chen",
    tagline: "I build the machine, and the thing that watches the machine.",
    role: "Mechanical Engineering",
    subtitle: "Project Portfolio",
    credential: "Amazon RME 2026",
    heroAward: {
      text: "Top People's Choice Award, Amazon Global AI Solutions Expo 2026",
      sub: "One of four RME intern projects recognised out of 200+ submissions across the company."
    },
    location: "Woodside, New York",
    email: "bchen7230@gmail.com",
    phone: "(646) 410-5180",
    showPhone: true,
    resume: "assets/docs/brandon-chen-resume.pdf",
    portrait: { stem: "portrait", widths: [700, 1100], alt: "Brandon Chen" },
    bleed:    { stem: "aurora-bleed", widths: [1200, 1900], alt: "Aurora over a harbour at night" },
    social: "assets/images/social-card.jpg",
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/brandonchen211/" },
      { label: "GitHub",   url: "https://github.com/bchen7230-netizen/portfolio" },
      { label: "Email",    url: "mailto:bchen7230@gmail.com" }
    ],
    seo: {
      title: "Brandon Chen — Mechanical Engineering Portfolio | Amazon RME 2026",
      description: "Mechanical engineering student at New York City College of Technology. Industrial controls, PLC and SCADA integration, CAD/CAM, embedded robotics. People's Choice Award, Amazon Global AI Solutions Expo 2026."
    }
  },

  theme: { accent: "blueprint", mode: "light" },

  facts: [
    { k: "Recent", v: "Amazon RME Intern, 2026" },
    { k: "Institution", v: "NYC College of Technology" },
    { k: "Degree",      v: "B.S. Mechanical Eng." },
    { k: "Graduating",  v: "May 2027", mono: true },
    { k: "GPA",         v: "3.60 / 4.00", mono: true },
    { k: "Based",       v: "Woodside, NY" }
  ],

  about: {
    heading: "About",
    pitch: "Mechanical engineering student who works where the hardware and the data have to agree with each other.",
    body: [
      "I am a mechanical engineering student at New York City College of Technology, graduating in 2027. The part of engineering I keep coming back to is the seam between the physical and the digital: a controller that says a conveyor is running, a database that says it jammed, and a technician who needs to know which one to believe.",
      "Most recently that meant a summer inside Amazon's Reliability and Maintenance Engineering organisation, where I built two production dashboards that read equipment state directly off the plant floor's PLCs and put five separate systems onto one page. It won the Top People's Choice Award at Amazon's Global AI Solutions Expo 2026, recognised out of more than 200 submissions across the company.",
      "Before that I was diagnosing electromechanical faults on hospital imaging and monitoring equipment, which is where I learned that most of what gets called broken is really nobody having looked at it in the right order.",
      "I am comfortable with a micrometer, a torque wrench, a ladder diagram and a SQL query. I think that combination is the point, not a coincidence."
    ],
    highlights: [
      { v: "Top",  k: "People's Choice Award, Amazon Global AI Solutions Expo 2026" },
      { v: "2",    k: "Amazon fulfillment centres running the dashboards I built" },
      { v: "200+", k: "Submissions worldwide; four RME projects recognised" }
    ]
  },

  projects: [

    /* ===================== 01 — MANE + AMM (star) ===================== */
    {
      id: "mane-amm",
      title: "MANE + AMM Shift Dashboards",
      subtitle: "Real-time OT/IT convergence for a fulfillment centre",
      categories: ["Controls", "Software", "Reliability"],
      year: "2026",
      role: "Sole designer, developer and deployer",
      setting: "Amazon RME internship — LAS7, North Las Vegas",
      status: "In production at LAS7, re-validated at SNV1",
      featured: true,
      summary: "Two connected dashboards, deployed at Amazon's LAS7 fulfillment centre, that read live PLC and SCADA equipment status off the plant floor and collapse five separate systems into one page a maintenance manager can run a shift from.",
      award: {
        title: "Top People's Choice Award — Amazon Global AI Solutions Expo 2026",
        text: "One of four Reliability &amp; Maintenance Engineering intern projects recognised out of more than 200 submissions globally, voted by peers across the company. Submitted as &ldquo;MANE + AMM Shift Dashboards&rdquo;.",
        link: "https://www.linkedin.com/feed/update/urn:li:activity:7488992215336132608/",
        linkLabel: "Announcement"
      },
      metrics: [
        { v: "Top",  k: "People's Choice Award",      note: "Amazon Global AI Solutions Expo, 2026" },
        { v: "200+", k: "Submissions worldwide",     note: "four RME projects recognised" },
        { v: "30→5", k: "Minutes of shift prep",     note: "estimated, per manager per handover" },
        { v: "2",    k: "Sites validated",           note: "LAS7 deployed, SNV1 re-validated" },
        { v: "4",    k: "Production tables queried", note: "sorter, induction, merge, downtime" },
        { v: "~10k", k: "Lines of Python",           note: "two dashboards, poller, tests, deploy" }
      ],
      tools: ["Ladder logic", "EtherNet/IP CIP · pycomm3", "SQL Server · pyodbc", "Rockwell ControlLogix",
              "Logix5000 / L5K", "SCADA", "Python 3.13", "Flask + Jinja", "Vanilla JS",
              "pytest + Hypothesis", "PyInstaller", "AWS EC2", "nginx + TLS", "Kiro"],
      hot: 3,
      blocks: [
        { t: "h", text: "The problem I inherited" },
        { t: "p", text: "Every area maintenance manager starts a shift the same way. Eight browser tabs across four separate systems, a walk of the floor to find out what is actually running, and a verbal handover to whoever comes next. Call it fifteen to thirty minutes per person per shift change, and in practice the handover often does not happen at all, because nobody has half an hour to give it." },
        { t: "p", text: "The failure modes stack up from there. A jam is discovered by radio call or a Slack message, five minutes after it happened. Downed equipment gets found on the next walk instead of the moment it stops. Operations raise maintenance tickets for equipment they do not have the vocabulary to describe, so the same jam arrives three times, miscoded, with no equipment identifier, and RME spends the first ten minutes of every ticket working out what actually broke." },
        { t: "p", text: "None of that is a people problem. It is a visibility problem, and visibility problems are solvable." },
        { t: "units", items: [
          { label: "Dashboard A", title: "MANE", text: "Live equipment status wall, fed by direct PLC and SCADA reads. What is running, what has stopped and what is jammed, in seconds rather than on the next floor walk." },
          { label: "Dashboard B", title: "AMM",  text: "The manager's command page. Downed equipment, work orders, PM compliance, condition-monitoring sensors, booked labour, open tickets and end-of-shift turnover in one view." }
        ]},
        { t: "svg", src: "assets/diagrams/mane-amm-architecture.svg", caption: "Field layer to access layer", scale: "N.T.S." },

        { t: "h", n: "01.1", text: "Reading the machine: PLC and SCADA integration" },
        { t: "cols", groups: [
          [ "<b>Learned ladder logic</b> to understand how the controllers actually execute, so I could find the rungs that set fault and status bits and know which tags were worth trusting.",
            "<b>Direct EtherNet/IP CIP reads</b> against Rockwell ControlLogix controllers using pycomm3, a pure-Python client, rather than going through an intermediary.",
            "Built a <b>per-controller tag map</b> linking each aisle's PLC to its logical equipment identity. One site-config file drives both dashboards, which is what makes the framework portable to another building." ],
          [ "Learned the operational constraints the hard way: <b>connection-slot limits</b> on 1756-EN2T communication cards, session lifetime, and why you hold one long-lived session instead of reconnecting per read.",
            "<b>Rate-limited reads to 1–5 seconds</b> so polling never competes with the controller's scan cycle. A dashboard is not worth slowing down production equipment.",
            "Read <b>Logix5000 L5K exports</b> to map tag structures and understand the underlying data model before writing a line of client code." ],
          [ "Learned the read-strategy hierarchy — <b>historian, OPC UA, direct CIP, Modbus</b> — and which is appropriate for a given site rather than defaulting to whatever is easiest.",
            "Learned that a stale \"active jam\" row in a database is <b>not the same thing</b> as a live jam on the controller. The two disagree constantly, and knowing which to believe is the actual engineering." ]
        ]},

        { t: "h", n: "01.2", text: "SQL against a live material-handling database" },
        { t: "cols", groups: [
          [ "Queried <b>four production tables</b> — unit-sorter statistics, induction-lane statistics, merge-lane statistics and the downtime-event log — the site's record of everything that ran, stopped or errored.",
            "Implemented the <b>greatest-n-per-group</b> pattern three times over, once per statistics table, to get the latest row per sorter, lane and merge.",
            "<b>Parameterised every query</b> with placeholders. Shift windows are computed in Python and passed as parameters, so there is no string interpolation and no injection surface." ],
          [ "Centralised the <b>event-classification WHERE clauses</b> as named constants for jam, e-stop and fault, so the definition of \"what counts as an active jam\" lives in one editable place instead of scattered across queries.",
            "<b>Aggregation for top-jams reporting:</b> grouped by device, area and description with a count and a descending sort, to surface the highest-repeat offenders for the shift." ],
          [ "<b>Handled real data-quality problems.</b> The source system sometimes never closes an event, leaving phantom rows open forever. I combined a NULL-aware \"still active\" filter with per-category stale cutoffs, 60 minutes for jams and 12 hours for faults and e-stops, tuned after watching the failure mode in production.",
            "Wrote a <b>popcorn-jam coalescing layer</b>: one ongoing jam can fire dozens of two-second events, so events on the same device within a 60-second gap merge into a single incident before they ever reach the dashboard." ]
        ]},
        { t: "code", lang: "SQL", caption: "Latest reading per sorter — greatest-n-per-group, run once per statistics table",
          kw: ["SELECT","FROM","INNER JOIN","MAX","AS","GROUP BY","ON"],
          code: "SELECT ss.*\nFROM   SorterStatistics ss\nINNER JOIN (\n    SELECT sorterID, MAX(id) AS max_id\n    FROM   SorterStatistics\n    GROUP BY sorterID\n) latest ON ss.id = latest.max_id" },

        { t: "h", n: "01.3", text: "Full stack, built to degrade instead of break" },
        { t: "cols", groups: [
          [ "<b>Flask, Jinja and vanilla JavaScript.</b> No frontend framework, because the whole thing has to ship as a single executable a manager can double-click.",
            "<b>A read-through staleness guard</b> is the architectural core: if one upstream system is unreachable, only that card degrades and says so. The page never returns a 500 because a third-party system is down." ],
          [ "<b>End-of-shift turnover became a single shareable URL</b> instead of a verbal handover or a Slack thread that scrolls away. The artifact is deterministic and it exists whether or not anyone had time to talk.",
            "<b>One-click ticket creation</b> pre-filled with the equipment identifier, area and live fault reason, and it shows an existing open ticket before you can raise a second one for the same jam." ],
          [ "Built a <b>browser-session bridge</b> so a report locked behind an interactive single-sign-on session could reach the dashboard without any credentials ever being stored server-side.",
            "Learned cross-origin request rules, hash-marker signalling between the two halves, and how to define a safe JSON contract across an origin boundary." ]
        ]},

        { t: "h", n: "01.4", text: "Property-based testing, packaging and deployment" },
        { t: "cols", groups: [
          [ "<b>pytest with Hypothesis.</b> Instead of testing example cases, I wrote invariants that must hold for any valid input: no duplicate ticket survives a merge, the gap set always equals the down set minus the ticketed set, an on-hold work order never appears in due-today.",
            "The mindset shift matters more than the tool. <b>Describe the property, let the generator hunt for the counterexample.</b>" ],
          [ "<b>PyInstaller single-file windowless executables</b>, 17 MB and 24 MB, with explicit hidden-import declarations and rotating log files so a failure on someone else's machine is still diagnosable.",
            "Learned that <b>a frozen build has no interpreter</b>: dev mode can spawn poller subprocesses, but the packaged build has to run them as in-process daemon threads. That bug only appeared on a colleague's clean machine." ],
          [ "The always-on host sits <b>behind nginx with TLS and token-authenticated writes</b>, so the board is reachable from a phone in the building without leaving an unauthenticated write endpoint open.",
            "Built with <b>Kiro</b>, spec-driven AI pair-programming: specification, then design, then tasks, then implementation, with correctness properties written before the code. The judgement call I kept having to make was when to challenge generated code on industrial edge cases it had no context for." ]
        ]},

        { t: "h", n: "01.5", text: "Working with the people who use it" },
        { t: "cols", groups: [
          [ "<b>Interviewed area maintenance managers and Operations shift leads</b> before building, so the tool solved the pain points they actually named rather than the ones I imagined from the outside." ],
          [ "The <b>one-click ticket pre-fill came from watching</b> an Operations comms lead mis-code a ticket in real time. That is the whole feature: it exists because I saw the failure happen, not because it was on a spec." ],
          [ "Re-validated at <b>SNV1</b>, a second fulfillment centre with a different equipment layout, which is what proved the per-site config approach ports instead of being hard-wired to one building." ]
        ]},

        { t: "h", n: "01.6", text: "Impact" },
        { t: "table",
          head: ["Measure", "Before", "After", "Change"],
          rows: [
            ["Shift-handover prep, per manager", "~30 min, and often skipped entirely", "~5 min from a generated turnover page", "est. −80%"],
            ["Jam awareness", "Radio call or Slack, ~5 min later", "PLC state, within seconds", "near-instant"],
            ["Downed-equipment check", "Floor walk, 5–10 min", "Live status wall", "near-instant"],
            ["Ticket quality", "Operations-worded, frequently miscoded", "Pre-filled equipment ID, area and live fault", "fewer round-trips"],
            ["Duplicate tickets per jam", "Common across Ops and RME", "Existing ticket shown before a second is raised", "largely removed"],
            ["Turnover artifact", "Verbal, or a Slack thread", "One shareable URL", "deterministic"],
            ["Systems a manager opens", "Four, plus a floor walk", "One page", "−3 systems"]
          ],
          note: "Time figures are estimates from interviews with the area maintenance managers who use the boards, not instrumented measurements. Stated as estimates on purpose."
        },
        { t: "p", text: "The second-order effects are the ones that matter to the site. Faster jam clearance means fewer caught packages and fewer redrives. Most severity events start as a downed conveyor nobody noticed or a ticket lost at shift change, and both of those are exactly what the two boards close. And when every ticket arrives tagged with the right equipment and the live fault, the back-and-forth between Operations and maintenance simply stops happening." }
      ]
    },

    /* ===================== 02 — Rover ===================== */
    {
      id: "rover",
      title: "Line-Following Rover with Obstacle Avoidance",
      subtitle: "Infrared line tracking and ultrasonic obstacle sensing on an Arduino UNO R4",
      categories: ["Robotics", "Embedded"],
      year: "2026",
      role: "Chassis, wiring and firmware",
      setting: "Embedded Systems & Robotics coursework",
      status: "Built and demonstrated",
      summary: "An Arduino rover that holds a painted line at speed and still gets out of its own way: infrared reflectance sensing keeps it centred on the track, ultrasonic ranging handles anything that blocks it, and a WiFi link carries telemetry off the vehicle.",
      metrics: [
        { v: "IR",    k: "Line tracking",     note: "reflectance sensing, dark line on light floor" },
        { v: "2",     k: "Sensing systems",   note: "line array + ultrasonic ranging" },
        { v: "4",     k: "Driven wheels",      note: "dual H-bridge, closed-loop PWM" },
        { v: "C/C++", k: "Firmware",           note: "Arduino UNO R4 Minima" }
      ],
      tools: ["C / C++", "Arduino UNO R4 Minima", "IR reflectance line sensing", "HC-SR04 ultrasonic",
              "H-bridge drivers", "PWM control", "ESP8266 WiFi", "Serial protocols", "Breadboard prototyping"],
      hot: 2,
      blocks: [
        { t: "p", text: "The primary job is path following. Infrared reflectance sensors read the contrast between the dark line and the lighter floor, and the control loop converts that reading into a continuous steering correction, so the rover tracks the line rather than hunting side to side across it. Getting that behaviour smooth is the whole problem: correct too weakly and it drifts off the line on a curve, too strongly and it oscillates down the straight." },
        { t: "p", text: "On top of that sits obstacle avoidance. An ultrasonic module watches forward range and infrared sensors catch what the ultrasonic cone misses, so the rover can break off the line, clear an obstruction and resume tracking. Decisions are made from the trend across cycles, not from a single sample, which is what stops one bad reading throwing the vehicle off course." },
        { t: "p", text: "Drive is a dual H-bridge with PWM speed control, so the rover can slow into a correction rather than pivoting at full torque. An ESP8266 module carries state off the vehicle for live telemetry and remote commands." },
        { t: "p", text: "Most of the real engineering time went into the boundary between hardware and software: separating logic and motor supply so brownouts stopped resetting the microcontroller mid-decision, and characterising sensor behaviour on the bench before trusting it in code." },
        { t: "gallery", media: [
          { type: "video", src: "assets/video/rover-demo.mp4", poster: "assets/video/rover-demo-poster.jpg",
            portrait: true, span: 4, caption: "Fig. 3 — Line-following run" },
          { type: "image", stem: "rover-01", widths: [640,1000,1600], span: 8, ratio: "4/3",
            alt: "Assembled rover with Arduino UNO R4, ultrasonic sensor and driver board",
            caption: "Fig. 4 — Assembled rover, sensor mast forward" },
          { type: "image", stem: "rover-02", widths: [640,1000,1600], span: 6, ratio: "4/3",
            alt: "Close view of the breadboard wiring and status LEDs",
            caption: "Fig. 5 — Signal breadboard and status LEDs" },
          { type: "image", stem: "rover-03", widths: [640,1000,1600], span: 6, ratio: "4/3",
            alt: "Overhead view of the rover chassis and harness routing",
            caption: "Fig. 6 — Harness routing, overhead" }
        ]}
      ]
    },

    /* ===================== 03 — CAD / CAM ===================== */
    {
      id: "cad-cnc",
      title: "Parametric Design to CNC Machined Part",
      subtitle: "Design intent, toolpath strategy, and a part measured back to the drawing",
      categories: ["CAD/CAM", "Manufacturing"],
      year: "2025",
      role: "Modelling, CAM programming, machining",
      setting: "Advanced Solids Modeling / Manufacturing Processes",
      status: "Part cut and inspected",
      summary: "Fully constrained parametric models driven by design intent, translated into toolpaths, post-processed to G-code and cut on a vertical mill, then measured back against the drawing.",
      metrics: [
        { v: "4",      k: "Toolpath strategies",    note: "contour, pocket, drill, face" },
        { v: "G-code", k: "Post-processed and cut", note: "CNC vertical mill" },
        { v: "Y14.5",  k: "GD&T applied",           note: "tolerance-driven dimensioning" }
      ],
      tools: ["SolidWorks", "AutoCAD", "Autodesk Inventor", "Mastercam", "GD&T (ASME Y14.5)",
              "CNC vertical mill", "Micrometers", "3D printing"],
      hot: 1,
      blocks: [
        { t: "p", text: "A parametric model is only worth building if the parameters mean something. I built fully constrained models using feature-based modelling and design-intent principles, so changing one driving dimension updates the part the way a designer would expect rather than breaking the sketch." },
        { t: "p", text: "From there the work is manufacturing strategy: translating 3D geometry into 2D contour, pocketing, drilling and facing toolpaths in Mastercam, selecting tooling and balancing material removal rate against surface finish and tool wear, then post-processing to G-code and cutting the part on a CNC vertical mill." },
        { t: "p", text: "The part is not finished when the spindle stops. Dimensions came back off the machine and got checked against the tolerance-driven drawing, because a part that cannot be inspected has not really been made." },
        { t: "cad", label: "Demo bracket", file: "assets/cad/demo-bracket.step", units: "mm",
          note: "Placeholder geometry generated for the viewer. Export a STEP or STL from SolidWorks, drop it in assets/cad/, and change the file name in content/portfolio.js." }
      ]
    },

    /* ===================== 04 — Walkway beam ===================== */
    {
      id: "walkway-beam",
      title: "Structural Design of a Pedestrian Walkway Beam System",
      subtitle: "Worst-case load determination and a material trade study",
      categories: ["Structural", "Analysis"],
      year: "2024",
      role: "Analysis and material selection",
      setting: "Mechanical Engineering Design Project",
      status: "Complete",
      summary: "Modelled multi-load scenarios to find the governing case, located the internal maxima, checked deflection against serviceability limits, and chose a material on evidence rather than habit.",
      metrics: [
        { v: "2",   k: "Load cases combined",  note: "pedestrian and wind loading" },
        { v: "V/M", k: "Diagrams constructed", note: "shear force and bending moment" },
        { v: "2",   k: "Materials traded",     note: "structural steel vs reinforced concrete" }
      ],
      tools: ["Elastic beam theory", "Shear & bending moment diagrams", "Deflection analysis",
              "Serviceability limits", "Material trade study", "Strength of Materials"],
      hot: 0,
      blocks: [
        { t: "p", text: "The first job was working out which loading actually governs. I modelled pedestrian and wind loading in combination to determine worst-case structural demand instead of designing to a single assumed case." },
        { t: "p", text: "With the governing case established, shear force and bending moment diagrams locate the maximum internal stresses and the points where the section is most likely to fail. Stress and deflection then get checked using elastic beam theory against serviceability limits, because a beam that is strong enough but bounces underfoot has still failed its users." },
        { t: "p", text: "The last part was a material trade study comparing structural steel against reinforced concrete on stiffness and durability, which is the kind of decision that is easy to make on instinct and much better made on numbers." }
      ]
    },

    /* ===================== 05 — Aerospace fabrication ===================== */
    {
      id: "aero-fab",
      title: "Aircraft Structural Fabrication & Engine Maintenance",
      subtitle: "Composite structures, precision joining and teardown inspection",
      categories: ["Fabrication", "Aerospace"],
      year: "2019",
      role: "Fabrication and inspection",
      setting: "Aerospace manufacturing and maintenance training",
      status: "Complete",
      summary: "Built composite aileron structures to aerospace tolerance using precision riveting, epoxy bonding, welding and controlled heat treatment, then tore down and inspected reciprocating engines for wear.",
      metrics: [
        { v: "Y14.5", k: "Geometric tolerance held",     note: "aerospace manufacturing standards" },
        { v: "100%",  k: "Fluid lines pressure-tested",  note: "fabricated and verified to safety standards" }
      ],
      tools: ["Precision riveting", "Epoxy bonding", "Welding", "Heat treatment",
              "Micrometers", "Torque wrenches", "Teardown inspection", "Pressure testing"],
      hot: 0,
      blocks: [
        { t: "p", text: "Fabricated composite aileron structures using precision riveting, epoxy bonding, welding and controlled heat treatment, holding tight geometric tolerances in accordance with aerospace manufacturing standards. On a control surface the tolerance is not paperwork, it is the difference between a part that flies and a part that does not." },
        { t: "p", text: "On the maintenance side I disassembled and inspected reciprocating aircraft engines for wear and dimensional compliance using micrometers and torque wrenches, and fabricated and pressure-tested aircraft fluid lines to safety standards. This is where I learned to trust measurement over appearance." }
      ]
    }
  ],

  experience: [
    {
      org: "Amazon — Reliability & Maintenance Engineering",
      title: "Area Maintenance Manager Intern",
      period: "Summer 2026",
      location: "LAS7 — North Las Vegas, NV",
      bullets: [
        "Built and deployed two production dashboards (MANE and AMM) reading live equipment state from Rockwell ControlLogix PLCs over EtherNet/IP, plus a material-handling SQL Server, the site CMMS and the maintenance ticket queue.",
        "Cut estimated shift-handover preparation from roughly 30 minutes to 5 by generating the turnover artifact automatically instead of relying on a verbal handoff.",
        "Reduced duplicate and miscoded maintenance tickets by pre-filling equipment identifier, area and live fault reason, and surfacing an existing open ticket before a second could be raised.",
        "Won the Top People's Choice Award at Amazon's Global AI Solutions Expo 2026, one of four RME intern projects recognised from more than 200 global submissions.",
        "Re-validated the framework at a second fulfillment centre with a different equipment layout, proving the per-site configuration approach ports."
      ]
    },
    {
      org: "NYC Health + Hospitals / Woodhull",
      title: "Engineering Intern",
      period: "Jul 2023 — Aug 2023",
      location: "Brooklyn, NY",
      bullets: [
        "Performed preventative maintenance and corrective repairs on electromechanical medical systems including EKG, ultrasound and radiology equipment.",
        "Diagnosed electrical and mechanical faults using multimeters, circuit analysis and structured troubleshooting methods.",
        "Assisted in precision disassembly, alignment verification and reassembly while ensuring functional integrity and compliance.",
        "Documented root-cause findings and corrective actions in technical service reports to support equipment reliability.",
        "Evaluated equipment condition and prioritised servicing based on operational risk and performance impact."
      ]
    }
  ],

  education: [
    {
      school: "New York City College of Technology",
      degree: "B.S. Mechanical Engineering",
      detail: "GPA 3.60 / 4.00",
      period: "Expected May 2027",
      location: "Brooklyn, NY"
    }
  ],

  certifications: [
    { name: "Basic CNC Programming and CAM Fundamentals", issuer: "SolidProfessor / Mastercam Training", year: "2025" }
  ],

  coursework: [
    "Materials Science", "Strength of Materials", "Engineering Graphics", "Manufacturing Processes",
    "Thermodynamics", "Kinematics & Dynamics of Machines", "Materials Testing Lab",
    "Embedded Systems & Robotics", "Advanced Solids Modeling", "Quality Control"
  ],

  /* Skills are grouped and evidenced on purpose. No percentage bars:
     a self-assigned "SolidWorks 85%" tells a reader nothing and costs credibility. */
  skills: [
    { group: "Mechanical & Design", items: [
      { name: "GD&T", note: "ASME Y14.5, applied on machined and aerospace parts" },
      { name: "Tolerance stack-up analysis" },
      { name: "Stress & strain analysis" },
      { name: "Shear & bending moment diagrams" },
      { name: "Beam deflection calculations" }
    ]},
    { group: "CAD & CAM", items: [
      { name: "SolidWorks", note: "parametric assemblies, design intent, drawings" },
      { name: "AutoCAD" },
      { name: "Autodesk Inventor" },
      { name: "Mastercam", note: "2D contour, pocketing, drilling, facing" },
      { name: "CNC fundamentals", note: "post-processing to G-code, vertical mill" },
      { name: "3D printing" }
    ]},
    { group: "Controls & Automation", items: [
      { name: "Ladder logic", note: "read and traced fault/status rungs to pick trustworthy tags" },
      { name: "Rockwell ControlLogix" },
      { name: "EtherNet/IP CIP", note: "pycomm3 tag reads against production PLCs" },
      { name: "SCADA integration" },
      { name: "Logix5000 / L5K exports", note: "tag structure mapping" }
    ]},
    { group: "Embedded & Robotics", items: [
      { name: "Arduino UNO R4 Minima" },
      { name: "Raspberry Pi" },
      { name: "ESP8266 WiFi" },
      { name: "Ultrasonic & IR sensing" },
      { name: "PWM motor control & H-bridge drivers" },
      { name: "Serial communication" }
    ]},
    { group: "Software & Data", items: [
      { name: "Python", note: "production dashboards, pollers, test suites" },
      { name: "C / C++", note: "Arduino firmware" },
      { name: "MATLAB" },
      { name: "SQL Server", note: "greatest-n-per-group, parameterised queries, aggregation" },
      { name: "Flask + Jinja" },
      { name: "pytest + Hypothesis", note: "property-based invariants" },
      { name: "PyInstaller" },
      { name: "AWS EC2 + nginx" }
    ]},
    { group: "Fabrication & Metrology", items: [
      { name: "Precision riveting & epoxy bonding" },
      { name: "Welding" },
      { name: "Heat treatment" },
      { name: "Micrometers & torque wrenches" },
      { name: "Electrical troubleshooting" },
      { name: "Pressure testing" }
    ]}
  ],

  /* EDIT ME — placeholder copy until you write your own. */
  hobbies: {
    heading: "Away from the bench",
    items: [
      { title: "Designing and building tools",
        text: "Most of what I can actually do started as something I wanted to exist. The dashboards in this portfolio began that way, and so have a number of smaller utilities that never left my laptop. The interesting part is always the point where a rough idea meets a real constraint." },
      { title: "The gym",
        text: "A standing appointment, and the one place where progress is unambiguous \u2014 the weight either moved or it did not. Useful counterweight to work where the feedback loop runs in weeks." },
      { title: "Basketball",
        text: "Pickup games whenever I can find a court. I enjoy staying active, and it is the closest thing I have found to practice for thinking under pressure." },
      { title: "Snowboarding",
        text: "Winters go to the mountain. Picking up something physical from zero is a good reminder of how much of any skill is just repetition and a tolerance for falling." }
    ]
  },

  contact: {
    heading: "Get in touch",
    text: "Looking for mechanical engineering internships and co-ops, especially anything touching controls, automation or manufacturing.",
    cta: "Email me"
  }
};
