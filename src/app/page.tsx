import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SearchBar } from "@/components/search/SearchBar";

export default function Home() {
  return (
    <div className="app-shell">
      <Header />

      <main className="page-wrap">
        <section className="hero-panel">
          <SearchBar />
          <div className="hero-card">
            <h1>Welcome to CS-SUS 2.0</h1>
            <p>
              Track suspicious Steam profiles, inspect CS2 stats, and estimate
              cheating risk with a clearer and faster experience.
            </p>
            <div className="hero-pills">
              <span>Steam URL Analysis</span>
              <span>VAC + Game Ban Signals</span>
              <span>Tracking List</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
