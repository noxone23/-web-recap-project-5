import { Routes, Route } from "react-router";
import Navigation from "./components/Navigation/Navigation";
import useSWR from "swr";
import type { ArtPiece } from "./types";
import "./styles.css";
import ArtPieceList from "./ArtPieceList";
import { Routes, Route } from "react-router";

const url = "https://example-apis.vercel.app/api/art";
async function fetcher(apiUrl: string): Promise<ArtPiece[]> {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch art pieces");
  }
  const data: ArtPiece[] = await response.json();
  return data;
}

function SpotlightPage() {
  return (
    <div>
    <h2>Spotlight View</h2>
    <p>Random Artwork</p>
    </div>
  );
}

function GalleryPage() {
  return (
    <div>
    <h2>Gallery View</h2>
    <p>List of all Artworks</p>
    </div>
  );
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
  return (
    <>
    <main>
      <h1>Art Gallery</h1>

      <Routes>
        <Route path="/" element={<SpotlightPage />} />
        <Route path="/art-pieces" element={<GalleryPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      <Route
        path="/"
        element={
            {isLoading && <p>Loading art pieces...</p>}
            {error && <p>Failed to load art pieces.</p>}
            {data && <ArtPieceList artPieces={data} />}   
        }
      />
    </Routes> 
    </main>
    <Navigation />
    </>
  );
}