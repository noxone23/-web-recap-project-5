import { useMemo } from "react";
import { ArtPiece } from "../../types";
import { ArtPiecesInfo } from "../FavoriteButton/ArtPiecesInfo";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
type SpotlightProps = {
  pieces: ArtPiece[];
   artPiecesInfo: ArtPiecesInfo[];
  onToggle: (slug: string) => void;
};

export function Spotlight( { pieces, artPiecesInfo, onToggle }: SpotlightProps) {
  // useMemo caches randomly selected art piece so it does not change on every single re-render of the component
  // it only runs once when pieces array is loaded or updated
  const spotlightPiece = useMemo(() => {
    if (!pieces || pieces.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * pieces.length);
    return pieces[randomIndex];
  }, [pieces]);

  if (!spotlightPiece)
  {
    return <p>No art piece found!</p>
  }

  return (
    <section className="spotlight">
      <figure className="art-piece">
        <img
          src={spotlightPiece.imageSource}
          alt={spotlightPiece.name}
        />
        <figcaption>
          <strong>Artist:</strong> {spotlightPiece.artist}
          <FavoriteButton
            isFavorite={artPiecesInfo.some(
              (piece) => piece.slug === spotlightPiece.slug && piece.isFavorite
            )}
            onToggle={() => onToggle(spotlightPiece.slug)}
          />
        </figcaption>
      </figure>
    </section>
  );
}