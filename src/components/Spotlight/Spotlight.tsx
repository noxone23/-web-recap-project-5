import { useMemo } from "react";
import { ArtPiece } from "../../types";

type SpotlightProps = {
  pieces: ArtPiece[];
};

export function Spotlight( { pieces }: SpotlightProps) {
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
        </figcaption>
      </figure>
    </section>
  );
}