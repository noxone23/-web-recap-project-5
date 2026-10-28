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
      <main>
        <p>Art Pieces are Not Founded</p>
        <Link to="/art-pieces">Back to Gallery</Link>
      </main>
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
       <p>{artPiece.colors.join(", ")}</p>
       <Link to={`/art-pieces`}>Back to Gallery</Link>
       </article>
    </main>
  );
}
