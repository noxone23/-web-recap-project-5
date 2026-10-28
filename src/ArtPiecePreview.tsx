import type { ArtPiece } from "./types";
import ColorPalette from "./components/ColorPalette/ColorPalette";
import { Link } from "react-router";

import type { ArtPiecesInfo } from "./components/FavoriteButton/ArtPiecesInfo";
import FavoriteButton from "./components/FavoriteButton/FavoriteButton";


type ArtPiecePreviewProps = {
  artPiece: ArtPiece;
  artPiecesInfo: ArtPiecesInfo[];
  onToggle: (slug: string) => void;
};

export default function ArtPiecePreview({ artPiece, artPiecesInfo,
  onToggle }: ArtPiecePreviewProps) {
    const isFavorite = artPiecesInfo.some(
    (piece) =>
      piece.slug === artPiece.slug && piece.isFavorite
  );
    return (
        <article className="art-piece">
            <Link to={`./${artPiece.slug}`}>
            <img src={artPiece.imageSource} alt={artPiece.name} />
            </Link>
            <h2>
                {artPiece.name}
            </h2>
            
            <p>{artPiece.artist}</p>
            <FavoriteButton
        isFavorite={isFavorite}
        onToggle={() => onToggle(artPiece.slug)}
      />

            <ColorPalette colors={artPiece.colors}/>
        </article>
    )
}
