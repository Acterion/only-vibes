export const seedChallenges = [
  {
    id: "018efab4-7c8e-7000-8000-000000000001", // Static UUID v7 format
    title: "Creative Writing Assistant",
    description: "Create a prompt that helps generate engaging short stories with vivid characters and compelling plots.",
    difficulty: "easy" as const,
    category: "Creative Writing",
    expectedOutput: "A well-structured short story with clear character development and narrative arc",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "018efab4-7c8e-7000-8000-000000000002", // Static UUID v7 format 
    title: "Code Documentation Generator",
    description: "Design a prompt that can analyze code and generate comprehensive, clear documentation.",
    difficulty: "medium" as const,
    category: "Technical Writing",
    expectedOutput: "Professional documentation with proper formatting, examples, and clear explanations",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "018efab4-7c8e-7000-8000-000000000003", // Static UUID v7 format
    title: "Complex Problem Solver",
    description: "Craft a prompt that breaks down complex multi-step problems into manageable solutions.",
    difficulty: "hard" as const,
    category: "Problem Solving",
    expectedOutput: "Step-by-step solution with clear reasoning and multiple approaches considered",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
