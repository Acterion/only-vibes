import type { Challenge } from "@/types";

export const mockChallenges: Challenge[] = [
  {
    id: "1",
    title: "Text Summarization Challenge",
    description:
      "Create a prompt that asks an AI to summarize a given text in exactly 3 sentences while preserving the main points.",
    difficulty: "easy",
    category: "Summarization",
    expectedOutput:
      "A concise 3-sentence summary that captures the essential information from the original text.",
    createdAt: Date.now() - 86400000, // 1 day ago
    updatedAt: Date.now() - 86400000,
  },
  {
    id: "2",
    title: "Creative Writing Prompt",
    description:
      "Craft a prompt that generates a short story that includes a time traveler, a mysterious object, and an unexpected plot twist.",
    difficulty: "medium",
    category: "Creative Writing",
    expectedOutput:
      "An engaging short story with all three required elements woven together coherently.",
    createdAt: Date.now() - 172800000, // 2 days ago
    updatedAt: Date.now() - 172800000,
  },
  {
    id: "3",
    title: "Code Explanation Challenge",
    description:
      "Design a prompt that asks AI to explain complex algorithms in simple terms that a beginner programmer could understand.",
    difficulty: "hard",
    category: "Technical",
    expectedOutput:
      "Clear, beginner-friendly explanations with examples and analogies where appropriate.",
    createdAt: Date.now() - 259200000, // 3 days ago
    updatedAt: Date.now() - 259200000,
  },
];
