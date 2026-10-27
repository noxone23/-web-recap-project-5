import type { ArtPiece } from "./types";

type ArtPiecePreviewProps = {
  artPiece: ArtPiece;
};

export default function ArtPiecePreview({ artPiece }: ArtPiecePreviewProps) {
    return (
        <article>
            <img src={artPiece.imageSource} alt={artPiece.name} />
            <h2>
                {artPiece.name}
            </h2>
            <p>{artPiece.artist}</p>
        </article>
    )
}
