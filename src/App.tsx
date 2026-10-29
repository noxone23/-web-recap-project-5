import { Routes, Route } from "react-router";
import useSWR from "swr";
import { useState } from "react";
import type { ArtPiece } from "./types";
import "./styles.css";
import Navigation from "./components/Navigation/Navigation";
import ArtPieceList from "./ArtPieceList";
import { Spotlight } from "./components/Spotlight/Spotlight";
import { ArtPiecesInfo } from "./components/FavoriteButton/ArtPiecesInfo";
import FavoritesPage from "./components/Favorites/FavoritesPage";
import ArtPieceDetails from "./components/ArtPieceDetails/ArtPieceDetails";
import YellowSpotlight from "../src/assets/Yellow-Spotlight.jpeg"

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
    <div>
      <h2>Page not found</h2>
      <p>The page does not existing</p>
    </div>
  );
}

export default function App() {
  const { data, error, isLoading } = useSWR<ArtPiece[]>(url, fetcher);
  const [artPiecesInfo, setArtPiecesInfo] = useState<ArtPiecesInfo[]>([]);

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

  const favoritePieces = data.filter((artPiece) =>
    artPiecesInfo.some((info) => info.slug === artPiece.slug && info.isFavorite)
  );

  return (
    <>
      <main>
       
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
          <Route
            path="/favorites"
            element={
              <FavoritesPage
                favoritePieces={favoritePieces}
                artPiecesInfo={artPiecesInfo}
                onToggle={handleToggleFavorite}
              />
            }
          />
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
