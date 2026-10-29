import { ArtPiece, Comment } from "../../types";
import { useState } from "react";
import type { SyntheticEvent } from "react";
import { useParams, Link } from "react-router";
import ColorPalette from "../ColorPalette/ColorPalette";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { ArtPiecesInfo } from "../FavoriteButton/ArtPiecesInfo";
import commentEdit from "./image/comment-edit.png"
import commentDelete from "./image/delete.png"
import commentSave from "./image/comment-save.png"
import commentCancel from "./image/discussion.png"

type ArtPieceDetailsProps = {
  pieces: ArtPiece[];
  artPiecesInfo: ArtPiecesInfo[];
  onToggle: (slug: string) => void;
  comments: Comment[];
  onAddComment: (comment: Comment) => void;
  onEditComment: (id: string, updateText: string) => void;
  onDeleteComment: (id: string) => void;
};

export default function ArtPieceDetails({
  pieces,
  artPiecesInfo,
  onToggle,
  comments,
  onAddComment,
  onEditComment,
  onDeleteComment,
}: ArtPieceDetailsProps) {
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState("");

  


  const { slug } = useParams();
  const artPiece = pieces.find((piece) => piece.slug === slug);
  const pieceComments = comments.filter((comment) => comment.slug === slug);

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
  /*   if (newComment.trim() === "") {
      return;
    } */
    if (!slug || newComment.trim() === "") {
      return;
    }

    const comment: Comment = {
      id: crypto.randomUUID(),
      text: newComment,
      date: new Date().toLocaleDateString("de-DE"),
      slug: slug,
    };

    onAddComment(comment);

    setNewComment("");
  }

  if (!artPiece) {
    return (
      <div className="not-found-page">
        <div className="art-piece">
          <h2>Page not found</h2>
          <img src="/not-found.png" alt="Page not found illustration" />
          <p className="not-found-text">
            <strong>Artist:</strong> ChatDalí
          </p>
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
        <ColorPalette colors={artPiece.colors} />

        <h2>Comments</h2>
        <ul className="comments">
          {/*  {pieceComments.map((comment, index) => (<li key={index}>  {`${comment.text} - (${comment.date} )`}</li>))} */}
          {pieceComments.map((comment) => (
            <li key={comment.id}>
              {editingCommentId === comment.id ? (
                <div className="confirmation-button">
                  <input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="comment-input"
                  />
                  <button
                    type="button"
                    className="button"
                    onClick={() => {
                      if (!editedText.trim()) return;

                      onEditComment(comment.id, editedText.trim());
                      setEditingCommentId(null);
                      setEditedText("");
                    }}
                  >
                    <img src={commentSave} alt="Save-button"/>
                  </button>
                  <button
                    type="button"
                    className="button"
                    onClick={() => {
                      setEditingCommentId(null);
                      setEditedText("");
                    }}
                  >
                    <img src={commentCancel} alt="Cancel-button"/>
                  </button>
                </div>
              ) : (
                <div className="comment-editing">
                  <span className="comment-span">
                    {comment.text} - ({comment.date})
                  </span>
                  <div className="button-editing">
                  <button
                    type="button"
                    className="button"
                    onClick={() => {
                      setEditingCommentId(comment.id);
                      setEditedText(comment.text);
                    }}
                  >
                    <img src={commentEdit} alt="edit-button"/>
                  </button>
                  <button
                    type="button"
                    className="button"
                    onClick={() => onDeleteComment(comment.id)}
                  >
                   <img src={commentDelete} alt="Delete-button"/>
                  </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <form className="comment-form" onSubmit={handleSubmit}>
          <label htmlFor="comment">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="comment-input"
              placeholder="Enter Your Comment here"
            />
          </label>
          <button className="comment-button" type="submit">
            Add Comment
          </button>
        </form>
        <Link to="/art-pieces" className="back-link">
          Back to Gallery
        </Link>
      </article>
    </main>
  );
}
