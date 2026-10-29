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
    <div className="not-found-page">
      <div className="art-piece">
      <h2>Page not found</h2>
      <img src="/not-found.png"
      alt="Page not found illustration"/>
      <p className="not-found-text"><strong>Artist:</strong> ChatDalí</p>
      <Link to="/art-pieces" className="back-link">
          Back to Gallery
        </Link>
      </div>
    </div>
  );
}

  return (
    <main>
      <article className="art-piece">
       <img src={artPiece.imageSource} alt="art piece image" />
         <FavoriteButton
          isFavorite={artPiecesInfo.some(
            (piece) => piece.slug === artPiece.slug && piece.isFavorite
          )}
          onToggle={() => onToggle(artPiece.slug)}
        />
       <h1>{artPiece.name}</h1>
       <p>{artPiece.artist}</p>
       <p>{artPiece.year}</p>
       <p>{artPiece.genre}</p>
       <ColorPalette colors={artPiece.colors}/>
       <Link to="/art-pieces" className="back-link">
       Back to Gallery
       </Link>
       </article>
    </main>
  );
}
