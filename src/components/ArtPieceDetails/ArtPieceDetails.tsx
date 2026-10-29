import { ArtPiece } from "../../types";
import { useParams, Link } from "react-router";
import ColorPalette from "../ColorPalette/ColorPalette";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { ArtPiecesInfo } from "../FavoriteButton/ArtPiecesInfo";

type ArtPieceDetailsProps = {
  pieces: ArtPiece[];
  artPiecesInfo: ArtPiecesInfo[];
  onToggle: (slug: string) => void;
};

export default function ArtPieceDetails({
  pieces,
  artPiecesInfo,
  onToggle,
}: ArtPieceDetailsProps) {
  const { slug } = useParams();
  const artPiece = pieces.find((piece) => piece.slug === slug);

  if (!artPiece) {
    return (
      <main className="details-not-found">
        <h1>Artwork not found</h1>
        <Link to="/art-pieces" className="back-to-gallery">
          Back to Gallery
        </Link>
      </main>
    );
  }

  const isFavorite = artPiecesInfo.some(
    (piece) => piece.slug === artPiece.slug && piece.isFavorite
  );

  return (
    <article className="details">
      <div className="details-image">
        <img src={artPiece.imageSource} alt={artPiece.name} />

        <FavoriteButton
          isFavorite={isFavorite}
          onToggle={() => onToggle(artPiece.slug)}
        />
      </div>

      <div className="details-info">
        <p className="details-label">ARTWORK DETAILS</p>

        <h1>{artPiece.name}</h1>

        <div className="details-divider" />

        <p>
          <strong>Artist</strong>
          <span>{artPiece.artist}</span>
        </p>

        <p>
          <strong>Year</strong>
          <span>{artPiece.year}</span>
        </p>

        <p>
          <strong>Genre</strong>
          <span>{artPiece.genre}</span>
        </p>

        <section className="details-colors">
          <h2>Color palette</h2>
          <ColorPalette colors={artPiece.colors} />
          <p className="color-values">{artPiece.colors.join(", ")}</p>
        </section>

        <Link to="/art-pieces" className="back-to-gallery">
          ← Back to Gallery
        </Link>
      </div>
    </article>
  );
}
