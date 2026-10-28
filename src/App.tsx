import { Routes, Route } from "react-router";
import Navigation from "./components/Navigation/Navigation";
import useSWR from "swr";
import type { ArtPiece } from "./types";
import "./styles.css";
import ArtPieceList from "./ArtPieceList";
import { Spotlight } from "./components/Spotlight/Spotlight";
import ArtPieceDetails from "./components/ArtPieceDetails/ArtPieceDetails";
const url = "https://example-apis.vercel.app/api/art";




async function fetcher(apiUrl: string): Promise<ArtPiece[]> {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch art pieces");
  }
  const data: ArtPiece[] = await response.json();
  return data;
}

function FavoritesPage() {
  return (
    <div>
      <h2>Favorites View</h2>
      <p>Favorite Artworks</p>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div>
      <h2>Page not found</h2>
      <p>The page does not existing</p>
    </div>
  );
}

export default function App() {
  const { data, error, isLoading } = useSWR<ArtPiece[]>(url, fetcher);

  if (isLoading) return <p>Loading art pieces...</p>;
  if (error) return <p>Failed to load art pieces.</p>;
  if (!data) return null;

  return (
    <>
      <main> 
        <h1>Art Gallery</h1>

        <Routes>
          <Route path="/" element={<Spotlight pieces={data} />} />
          <Route path="/art-pieces" element={<ArtPieceList artPieces={data} />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/art-pieces/:slug" element={<ArtPieceDetails artPieces={data} />} />
          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </main>
      <Navigation />
    </>
  );
}