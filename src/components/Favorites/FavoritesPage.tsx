import type { ArtPiece } from "../../types";
import ArtPieceList from "../../ArtPieceList";
import type { ArtPiecesInfo } from "../FavoriteButton/ArtPiecesInfo";
import HomeWell from "../Favorites/Home-Wall-Gallery.jpeg"
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
        <img src={HomeWell} alt="hopewell" />
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
