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

export default function App() {
  const { data, error, isLoading } = useSWR<ArtPiece[]>(url, fetcher);
  return (
  <Routes>
      <Route
        path="/"
        element={
          <main>
            <h1>Art Gallery</h1>
            {isLoading && <p>Loading art pieces...</p>}
            {error && <p>Failed to load art pieces.</p>}
            {data && <ArtPieceList artPieces={data} />}
          </main>
        }
      />
    </Routes> 
   
  );
}
