import type { ArtPiece } from "../../types";
import ArtPieceList from "../../ArtPieceList";
import type { ArtPiecesInfo } from "../FavoriteButton/ArtPiecesInfo";

type FavoritesPageProps = {
  favoritePieces: ArtPiece[];
  artPiecesInfo: ArtPiecesInfo[];
  onToggle: (slug: string) => void;
};

export default function FavoritesPage({
  favoritePieces,
  artPiecesInfo,
  onToggle,
}: FavoritesPageProps) {
  return (
    <div>
      {favoritePieces.length === 0 ? (
        <div className="emptyphoto">
        
        </div>
      ) : (
        <ArtPieceList
          artPieces={favoritePieces}
          artPiecesInfo={artPiecesInfo}
          onToggle={onToggle}
        />
      )}
    </div>
  );
}
