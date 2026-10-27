import type { ArtPiece } from "./types";
import ColorPalette from "./components/ColorPalette/ColorPalette";

type ArtPiecePreviewProps = {
  artPiece: ArtPiece;
};

export default function ArtPiecePreview({ artPiece }: ArtPiecePreviewProps) {
    return (
        <article className="art-piece">
            <img src={artPiece.imageSource} alt={artPiece.name} />
            <h2>
                {artPiece.name}
            </h2>
            <p>{artPiece.artist}</p>

            <ColorPalette colors={artPiece.colors}/>
        </article>
    )
}
