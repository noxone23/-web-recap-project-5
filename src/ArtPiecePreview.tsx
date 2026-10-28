import type { ArtPiece } from "./types";
import ColorPalette from "./components/ColorPalette/ColorPalette";
import { Link } from "react-router";

type ArtPiecePreviewProps = {
  artPiece: ArtPiece;
};

export default function ArtPiecePreview({ artPiece }: ArtPiecePreviewProps) {
    return (
        <article className="art-piece">
            <Link to={`./${artPiece.slug}`}>
            <img src={artPiece.imageSource} alt={artPiece.name} />
            </Link>
            <h2>
                {artPiece.name}
            </h2>
            
            <p>{artPiece.artist}</p>

            <ColorPalette colors={artPiece.colors}/>
        </article>
    )
}
