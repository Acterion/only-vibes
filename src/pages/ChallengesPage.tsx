import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api";
import { Challenge } from "../../types";

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("✅ ChallengesPage mounted successfully");
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiClient.getChallenges();
      setChallenges(data);
      console.log("✅ Challenges fetched from API:", data.length);
    } catch (err) {
      console.error("❌ Failed to fetch challenges:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch challenges");
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-600 bg-green-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "hard":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Challenges</h1>
          <p className="text-muted-foreground text-lg">
            Test your prompt engineering skills with these carefully crafted
            challenges.
          </p>
        </div>

        {loading && (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium mb-2">Loading challenges...</h3>
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium mb-2 text-red-600">Error</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={fetchChallenges}>Try Again</Button>
          </div>
        )}

        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <Card
                key={challenge.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(
                        challenge.difficulty
                      )}`}
                    >
                      {challenge.difficulty.toUpperCase()}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {challenge.category}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{challenge.title}</CardTitle>
                  <CardDescription>{challenge.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium mb-1">
                        Expected Output:
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {challenge.expectedOutput}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Created:{" "}
                        {new Date(challenge.createdAt).toLocaleDateString()}
                      </span>
                      <Button size="sm">Try Challenge</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && !error && challenges.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium mb-2">
              No challenges available
            </h3>
            <p className="text-muted-foreground">
              Check back later for new challenges!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
