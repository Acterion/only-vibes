export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  expectedOutput: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: number;
  isAdmin: boolean;
}

export interface Submission {
  id: string;
  challengeId: string;
  userId: string;
  prompt: string;
  aiResponse: string;
  score: number;
  createdAt: number;
}
