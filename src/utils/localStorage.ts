import type { ArtPiecesInfo } from "../components/FavoriteButton/ArtPiecesInfo";

export function loadArtPieceInfo(): ArtPiecesInfo[] {
  // check if window is defined (safety check for server side rendering environments)
  if (typeof window === "undefined") {
    return [];
  }
  // get raw JSON string from browsers localStorage
  const saved_state = localStorage.getItem("art-piece-info");

  if(!saved_state) {
    return [];
  }
  try {
    // parse JSON string back into a real javascript array
    return JSON.parse(saved_state);
  } catch (error) {
    console.error("Failed to parse the art piece from localStorage", error);
    return [];
  }
}

export function savedArtPieceInfo(artPiecesInfo: ArtPiecesInfo[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("art-piece-info", JSON.stringify(artPiecesInfo));
}