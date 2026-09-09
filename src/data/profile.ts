/* Language-neutral profile data. Translated copy lives in src/i18n/dictionary.ts. */

export const contactInfo = {
  email: "gabrielsimonbr@gmail.com",
  linkedin: "https://www.linkedin.com/in/gab-simon/",
  github: "https://github.com/gab-simon",
};

/* Shown on the ticket — the label is the same in both languages. */
export const contactLinks = [
  { id: "email", label: "EMAIL", value: "gabrielsimonbr@gmail.com", href: `mailto:${contactInfo.email}`, external: false },
  { id: "github", label: "GITHUB", value: "github.com/gab-simon", href: contactInfo.github, external: true },
  { id: "linkedin", label: "LINKEDIN", value: "linkedin.com/in/gab-simon", href: contactInfo.linkedin, external: true },
];

export type JobId = "nestle" | "smart" | "klupp";

export const jobs: { id: JobId; company: string; code: string; tech: string[] }[] = [
  { id: "nestle", company: "NESTLÉ", code: "CH.03", tech: ["React", "Next.js", "Node", "TypeScript", "Wake Commerce", "Docker", "Azure DevOps"] },
  { id: "smart", company: "SMART INNOVATION", code: "CH.02", tech: ["React Native", "Redux", "Firebase", "Fastlane", "Python", "Django"] },
  { id: "klupp", company: "KLUPP", code: "CH.01", tech: ["React Native", "TypeScript", "Node", "SQLite", "Redux", "Ionic"] },
];

export const mainStack = ["TypeScript", "React", "Next.js", "Node", "React Native", "Wake Commerce"];

export type StackGroupId = "front" | "back" | "mobile" | "platform";

export const stackGroups: { id: StackGroupId; items: string[] }[] = [
  { id: "front", items: ["React", "Next.js", "TypeScript", "Vite", "Tailwind CSS"] },
  { id: "back", items: ["Node.js", "Python", "Django", "REST APIs"] },
  { id: "mobile", items: ["React Native", "Redux", "Fastlane", "Ionic"] },
  { id: "platform", items: ["Wake Commerce", "Firebase", "Docker", "Azure DevOps"] },
];
