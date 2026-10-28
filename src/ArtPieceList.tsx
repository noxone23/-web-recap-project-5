import type { ArtPiece } from "./types";
import ArtPiecePreview from "./ArtPiecePreview";
import type { ArtPiecesInfo } from "./components/FavoriteButton/ArtPiecesInfo";

type ArtPieceListProps = {
  artPieces: ArtPiece[];
  artPiecesInfo: ArtPiecesInfo[];
  onToggle: (slug: string) => void;
};
export default function ArtPieceList({
  artPieces,
  artPiecesInfo,
  onToggle,
}: ArtPieceListProps) {
  return (
    <ul className="art-list">
      {artPieces.map((artPiece) => (
        <li key={artPiece.slug}>
          <ArtPiecePreview
            artPiece={artPiece}
            artPiecesInfo={artPiecesInfo}
            onToggle={onToggle}
          />
        </li>
      ))}
    </ul>
  );
}
