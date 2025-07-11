import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  useEffect(() => {
    console.log("✅ HomePage mounted successfully");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Only Vibes
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The ultimate AI prompting competition platform. Test your skills,
            climb the leaderboard, and master the art of AI communication.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/challenges">Start Competing</Link>
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🎯 Precision Prompting
              </CardTitle>
              <CardDescription>
                Craft the perfect prompts to get exactly what you want from AI
                models.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Learn the art and science of prompt engineering through hands-on
                challenges designed by experts.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🏆 Competitive Spirit
              </CardTitle>
              <CardDescription>
                Compete with prompt engineers from around the world.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Real-time leaderboards, skill-based matching, and recognition
                for the most innovative solutions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🚀 Skill Building
              </CardTitle>
              <CardDescription>
                Progressive challenges that adapt to your skill level.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                From beginner-friendly tasks to expert-level challenges that
                push the boundaries of what's possible.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
