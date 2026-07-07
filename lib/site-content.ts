export const learningUrl = "https://learn.msworx.co/";

export const navItems = [
  ["Learners", "/#learners"],
  ["Courses", "/courses#catalog"],
  ["Organizations", "/organizations"],
  ["Instructors", "/instructors"],
  ["Contact", "/#contact"],
];

export const audiences = [
  {
    id: "learners",
    title: "For Learners",
    text: "Courses for case managers, shelter staff, volunteers, and program coordinators building skill in the field.",
    href: "#courses",
    cta: "Browse courses",
  },
  {
    id: "organizations",
    title: "For Organizations",
    text: "Training portals for nonprofit and human services teams that need consistent onboarding and completion records.",
    href: "/organizations",
    cta: "Explore portals",
  },
  {
    id: "instructors",
    title: "For Instructors",
    text: "A path for field practitioners to turn expertise into structured learning without managing platform infrastructure.",
    href: "/instructors",
    cta: "Teach with MSWorx",
  },
];

export const featuredCourses = [
  {
    code: "CORE-101",
    title: "Crisis Recognition",
    track: "Crisis Intervention and Safety",
    meta: "Scheduled course",
    href: "/courses#catalog",
  },
  {
    code: "FOS-101",
    title: "Front Office Support in Human Services",
    track: "Front Office and Operational Foundations",
    meta: "Catalog preview",
    href: "/courses#catalog",
  },
  {
    code: "OP-101",
    title: "Developing SOPs",
    track: "Leadership and Organizational Practice",
    meta: "Catalog preview",
    href: "/courses#catalog",
  },
];

export const shiftSeries = {
  skyprepCourseId: "NTS-101",
  title: "Navigating the Shift",
  subtitle: "Equipping frontline staff for the 2026 HUD NOFO",
  description:
    "A four-module training series from MSWorx Learning that helps case managers and frontline teams bridge compliance and compassion as the 2026 HUD NOFO landscape changes.",
  href: "https://shift.msworx.co/",
  modules: [
    "Understand the 2026 landscape and what is changing for frontline practice.",
    "Redefine case management expectations through a compliance-aware lens.",
    "Translate new requirements into practical documentation and service decisions.",
    "Support teams with shared language, applied examples, and implementation next steps.",
  ],
};

export const shiftPaymentTiers = [
  {
    label: "1-9 seats",
    price: "$397 per seat",
    note: "After payment, the buyer completes an Airtable form with learner names and emails.",
    href: "https://buy.stripe.com/fZufZa3p5cxQ3e49JX1VK00",
  },
  {
    label: "10-24 seats",
    price: "$357 per seat",
    note: "After payment, the buyer downloads a spreadsheet template for learner details.",
    href: "https://buy.stripe.com/aFa9AMbVBeFYcOE6xL1VK01",
  },
  {
    label: "25-49 seats",
    price: "$317 per seat",
    note: "Best for mid-sized teams preparing multiple staff groups at once.",
    href: "https://buy.stripe.com/14A00c6Bh69s9Cs3lz1VK02",
  },
  {
    label: "50-99 seats",
    price: "$277 per seat",
    note: "Larger purchases may need enrollment coordination after the template is completed.",
    href: "https://buy.stripe.com/9B6cMYf7N7dw3e4aO11VK03",
  },
];

export const proofPoints = [
  {
    title: "Twenty years on the frontline.",
    text: "Continuum of Care operations. Direct service. Technical assistance the Department of Housing and Urban Development recognized. She did the work before she taught it.",
  },
  {
    title: "Built for the people doing the work.",
    text: "Frontline workers get handed impossible jobs and thin training. When the training is weak, the person in front of them pays for it. This platform is built so that stops.",
  },
  {
    title: "Training that sounds like the work.",
    text: "No abstraction. No filler. Plain language, earned from experience, aimed at the moment a worker is actually in.",
  },
];

export const instructors = ["Frontline practitioners", "Nonprofit leaders", "Training specialists"];

export const footerLinks = [
  ["Courses", "/courses"],
  ["Organizations", "/organizations"],
  ["Instructors", "/instructors"],
  ["Learning Login", learningUrl],
  ["Contact", "/#contact"],
];
