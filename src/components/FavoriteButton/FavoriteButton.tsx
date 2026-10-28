import favoriteImage from "../../assets/favorite.png";
import notFavoriteImage from "../../assets/non-favorite.png";

type FavoriteButtonProps = {
  isFavorite: boolean;
  onToggle: () => void;
};
export default function FavoriteButton({
  isFavorite,
  onToggle,
}: FavoriteButtonProps) {
  return (
    <button
      className="favorite-button"
      type="button"
      onClick={onToggle}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "remove from favorites" : " Add to favorites"}
    >
      <img src={isFavorite ? notFavoriteImage : favoriteImage} alt="" />
    </button>
  );
}
