import { Routes, Route, Link } from "react-router";
import useSWR from "swr";
import { useState, useEffect } from "react";
import type { ArtPiece } from "./types";
import "./styles.css";
import Navigation from "./components/Navigation/Navigation";
import ArtPieceList from "./ArtPieceList";
import { Spotlight } from "./components/Spotlight/Spotlight";
import { ArtPiecesInfo } from "./components/FavoriteButton/ArtPiecesInfo";
import FavoritesPage from "./components/Favorites/FavoritesPage";
import ArtPieceDetails from "./components/ArtPieceDetails/ArtPieceDetails";
import { loadArtPieceInfo, savedArtPieceInfo } from "./utils/localStorage";

const url = "https://example-apis.vercel.app/api/art";

async function fetcher(apiUrl: string): Promise<ArtPiece[]> {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch art pieces");
  }
  const data: ArtPiece[] = await response.json();
  return data;
}

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="art-piece">
      <h2>Page not found</h2>
      <img src="/not-found.png"
      alt="Page not found illustration"/>
      <p className="not-found-text"><strong>Artist:</strong> ChatDalí</p>
      <Link to="/art-pieces" className="back-link">
          Back to Gallery
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  const { data, error, isLoading } = useSWR<ArtPiece[]>(url, fetcher);
  const [artPiecesInfo, setArtPiecesInfo] = useState<ArtPiecesInfo[]>(loadArtPieceInfo);

  useEffect(() => {
    savedArtPieceInfo(artPiecesInfo);
  }, [artPiecesInfo]);

  function handleToggleFavorite(slug: string) {
    setArtPiecesInfo((currentInfo) => {
      const currentPiece = currentInfo.find((piece) => piece.slug === slug);
      if (currentPiece) {
        return currentInfo.map((piece) =>
          piece.slug === slug
            ? { ...piece, isFavorite: !piece.isFavorite }
            : piece
        );
      }

      return [...currentInfo, { slug, isFavorite: true }];
    });
  }

  if (isLoading) return <p>Loading art pieces...</p>;
  if (error) return <p>Failed to load art pieces.</p>;
  if (!data) return null;

  const favoritePieces = data.filter((artPiece) => artPiecesInfo.some((info) => info.slug === artPiece.slug && info.isFavorite));

  return (
    <>
      <main>
        <h1>Art Gallery</h1>
        <Routes>
          <Route
            path="/"
            element={
              <Spotlight
                pieces={data}
                artPiecesInfo={artPiecesInfo}
                onToggle={handleToggleFavorite}
              />
            }
          />
          <Route
            path="/art-pieces"
            element={
              <ArtPieceList
                artPieces={data}
                artPiecesInfo={artPiecesInfo}
                onToggle={handleToggleFavorite}
              />
            }
          />
          <Route path="/favorites" element={<FavoritesPage favoritePieces={favoritePieces} artPiecesInfo={artPiecesInfo}
      onToggle={handleToggleFavorite} />} />
          <Route
            path="/art-pieces/:slug"
            element={
              <ArtPieceDetails
                pieces={data}
                artPiecesInfo={artPiecesInfo}
                onToggle={handleToggleFavorite}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Navigation />
    </>
  );
}
