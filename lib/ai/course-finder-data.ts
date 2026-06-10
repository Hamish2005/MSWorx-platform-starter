export const courseFinderQuestions = [
  {
    id: "role",
    prompt: "What best describes you?",
    options: ["Case manager", "Shelter staff", "Volunteer", "Supervisor", "Training leader"],
  },
  {
    id: "goal",
    prompt: "What do you need help with first?",
    options: [
      "Use AI at work",
      "Improve documentation",
      "Strengthen compliance",
      "Build leadership skills",
      "Prepare new staff",
    ],
  },
  {
    id: "pace",
    prompt: "How much time can you give this week?",
    options: ["Under 1 hour", "1 to 3 hours", "Half day", "Team rollout"],
  },
];

export const mockCourseCatalog = [
  {
    code: "TWL-102",
    title: "Using AI to Strengthen Frontline Work",
    track: "AI Track",
    level: "Starter",
    length: "75 minutes",
    reason:
      "A practical first step for frontline staff who want to use AI without losing judgment, context, or care.",
    tags: [
      "Use AI at work",
      "Case manager",
      "Shelter staff",
      "Volunteer",
      "Under 1 hour",
      "1 to 3 hours",
    ],
  },
  {
    code: "TWL-103",
    title: "Prompting for Human Services Practice",
    track: "AI Track",
    level: "Skill builder",
    length: "90 minutes",
    reason:
      "Best for learners ready to turn real field scenarios into better prompts, drafts, checklists, and planning support.",
    tags: ["Use AI at work", "Improve documentation", "Case manager", "Supervisor", "1 to 3 hours"],
  },
  {
    code: "DOC-201",
    title: "Documentation That Protects You and the People You Serve",
    track: "Documentation",
    level: "Core practice",
    length: "2 hours",
    reason:
      "A strong fit when documentation quality, supervision, risk, and service continuity matter most.",
    tags: [
      "Improve documentation",
      "Case manager",
      "Shelter staff",
      "Supervisor",
      "1 to 3 hours",
      "Half day",
    ],
  },
  {
    code: "CMP-101",
    title: "Compliance Foundations for Human Services Teams",
    track: "Compliance Track",
    level: "Foundation",
    length: "Half day",
    reason:
      "Designed for teams that need shared expectations, cleaner records, and a baseline for policy-aligned practice.",
    tags: ["Strengthen compliance", "Training leader", "Supervisor", "Team rollout", "Half day"],
  },
  {
    code: "SUP-110",
    title: "Leading New Staff Through the First 30 Days",
    track: "Role-Based Paths",
    level: "Supervisor",
    length: "2.5 hours",
    reason:
      "Recommended for supervisors and training leaders building a repeatable onboarding path for frontline workers.",
    tags: ["Prepare new staff", "Build leadership skills", "Supervisor", "Training leader", "Team rollout"],
  },
];
