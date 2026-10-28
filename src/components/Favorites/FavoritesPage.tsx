import type { ArtPiece } from "../../types";
import ArtPieceList from "../../ArtPieceList";
import type { ArtPiecesInfo } from "../FavoriteButton/ArtPiecesInfo";

type FavoritesPageProps = {
  favoritePieces: ArtPiece[];
  artPiecesInfo: ArtPiecesInfo[];
  onToggle: (slug: string) => void;
};

export default function FavoritesPage({ favoritePieces, artPiecesInfo, onToggle }: FavoritesPageProps) {
  return (
    <div>
      {favoritePieces.length === 0 ? (<p>No favorite art pieces yet.</p>) : <ArtPieceList artPieces={favoritePieces} artPiecesInfo={artPiecesInfo} onToggle={onToggle} />}
    </div>
  );
}