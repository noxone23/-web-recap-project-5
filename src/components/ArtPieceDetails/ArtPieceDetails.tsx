import { ArtPiece } from "../../types";
import { useParams, Link } from "react-router";

type ArtPieceDetailsProps = {
  artPieces: ArtPiece[];
};

export default function ArtPieceDetails({ artPieces }: ArtPieceDetailsProps) {
  const { slug } = useParams();
  const artPiece = artPieces.find((piece) => piece.slug === slug);

  if (!artPiece) {
    return <p>Art Pieces are Not Founded</p>;
  }

  return (
    <main>
       <img src={artPiece.imageSource} alt="art piece image" />
       <h1>{artPiece.name}</h1>
       <p>{artPiece.artist}</p>
       <p>{artPiece.year}</p>
       <p>{artPiece.genre}</p>
       <p>{artPiece.colors.join(", ")}</p>
    </main>
  );
}