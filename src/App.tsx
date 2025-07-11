import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { DevTools } from "@/components/DevTools";
import HomePage from "@/pages/HomePage";
import ChallengesPage from "@/pages/ChallengesPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/challenges" element={<ChallengesPage />} />
          </Routes>
        </main>
        <DevTools />
      </div>
    </Router>
  );
}

export default App;
