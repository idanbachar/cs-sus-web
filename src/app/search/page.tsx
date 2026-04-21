import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SearchBar } from "@/components/search/SearchBar";
import { SearchResults } from "@/components/search/SearchResults";

interface SearchPageProps {
  searchParams: Promise<{
    steamUrl?: string;
    invalid?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const steamUrl = params.steamUrl ?? "";

  return (
    <div className="app-shell">
      <Header />

      <main className="results-wrap">
        <section className="hero-panel" style={{ marginTop: "1.2rem", maxWidth: "760px" }}>
          <SearchBar initialValue={steamUrl} />
          <SearchResults steamUrl={steamUrl} invalid={params.invalid === "1"} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
