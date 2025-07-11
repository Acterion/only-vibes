import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="font-bold text-xl">
              Only Vibes
            </Link>
            <div className="flex items-center gap-6">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/") ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                Home
              </Link>
              <Link
                to="/challenges"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/challenges")
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                Challenges
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button size="sm">Sign Up</Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
