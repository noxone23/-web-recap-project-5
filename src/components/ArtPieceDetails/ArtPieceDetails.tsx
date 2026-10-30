
import { useState } from "react";
import type { SyntheticEvent } from "react";
import { useParams, Link } from "react-router";
import type { ArtPiece, Comment } from "../../types";

import ColorPalette from "../ColorPalette/ColorPalette";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { ArtPiecesInfo } from "../FavoriteButton/ArtPiecesInfo";

import commentEdit from "./image/comment -edit.png";
import commentDelete from "./image/delete.png";
import commentSave from "./image/comment-save.png";
import commentCancel from "./image/discussion.png";

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

    const pieceComments = comments.filter(
        (comment) => comment.slug === slug
    );

    // Add a new comment
    function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();

        const trimmedComment = newComment.trim();

        if (!slug || !trimmedComment) return;

        const comment: Comment = {
            id: crypto.randomUUID(),
            text: trimmedComment,
            date: new Date().toLocaleDateString("de-DE"),
            slug,
        };

        onAddComment(comment);
        setNewComment("");
    }

    // Start editing a comment
    function handleEdit(comment: Comment) {
        setEditingCommentId(comment.id);
        setEditedText(comment.text);
    }

    // Save edited comment
    function handleSaveEdit(id: string) {
        const trimmedText = editedText.trim();

        if (!trimmedText) return;

        onEditComment(id, trimmedText);

        setEditingCommentId(null);
        setEditedText("");
    }

    // Cancel editing
    function handleCancelEdit() {
        setEditingCommentId(null);
        setEditedText("");
    }

    // Delete a comment
    function handleDelete(id: string) {
        onDeleteComment(id);

        if (editingCommentId === id) {
            handleCancelEdit();
        }
    }

    if (!artPiece) {
        return (
            <div className="not-found-page">
                <div className="art-piece">
                    <h2>Page not found</h2>
                    <img
                        src="/not-found.png"
                        alt="Page not found illustration"
                    />
                    <p className="not-found-text">
                        <strong>Artist:</strong> ChatDalí
                    </p>
                    <Link to="/art-pieces" className="back-to-gallery">
                        Back to Gallery
                    </Link>
                </div>
            </div>
        );
    }

    const isFavorite = artPiecesInfo.some(
        (piece) =>
            piece.slug === artPiece.slug && piece.isFavorite
    );

    return (
        <article className="details-page">

            {/* Artwork and information */}
            <div className="details">

                <div className="details-image">
                    <img
                        src={artPiece.imageSource}
                        alt={artPiece.name}
                    />

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
                        <p className="color-values">
                            {artPiece.colors.join(", ")}
                        </p>
                    </section>

                    <Link to="/art-pieces" className="back-to-gallery">
                        ← Back to Gallery
                    </Link>
                </div>
            </div>

            {/* Comments section */}
            <section className="comments-section">

                <div className="comments-heading">
                    <p className="details-label">SHARE YOUR THOUGHTS</p>
                    <h2>Comments</h2>
                    <span className="comments-count">
                        {pieceComments.length}{" "}
                        {pieceComments.length === 1 ? "comment" : "comments"}
                    </span>
                </div>

                <ul className="comments">
                    {pieceComments.length === 0 ? (
                        <li className="no-comments">
                            No comments yet. Be the first to share your thoughts.
                        </li>
                    ) : (
                        pieceComments.map((comment) => (
                            <li key={comment.id} className="comment-item">

                                {editingCommentId === comment.id ? (
                                    <div className="comment-editing-form">

                                        <input
                                            type="text"
                                            value={editedText}
                                            onChange={(event) =>
                                                setEditedText(event.target.value)
                                            }
                                            className="comment-input"
                                            aria-label="Edit comment"
                                            autoFocus
                                        />

                                        <div className="comment-actions">
                                            <button
                                                type="button"
                                                className="comment-icon-button"
                                                onClick={() =>
                                                    handleSaveEdit(comment.id)
                                                }
                                                disabled={!editedText.trim()}
                                                aria-label="Save comment"
                                                title="Save"
                                            >
                                                <img
                                                    src={commentSave}
                                                    alt=""
                                                />
                                            </button>

                                            <button
                                                type="button"
                                                className="comment-icon-button"
                                                onClick={handleCancelEdit}
                                                aria-label="Cancel editing"
                                                title="Cancel"
                                            >
                                                <img
                                                    src={commentCancel}
                                                    alt=""
                                                />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="comment-editing">

                                        <div className="comment-content">
                                            <p className="comment-span">
                                                {comment.text}
                                            </p>

                                            <span className="comment-date">
                                                {comment.date}
                                            </span>
                                        </div>

                                        <div className="comment-actions">
                                            <button
                                                type="button"
                                                className="comment-icon-button"
                                                onClick={() =>
                                                    handleEdit(comment)
                                                }
                                                aria-label="Edit comment"
                                                title="Edit"
                                            >
                                                <img
                                                    src={commentEdit}
                                                    alt=""
                                                />
                                            </button>

                                            <button
                                                type="button"
                                                className="comment-icon-button delete-comment"
                                                onClick={() =>
                                                    handleDelete(comment.id)
                                                }
                                                aria-label="Delete comment"
                                                title="Delete"
                                            >
                                                <img
                                                    src={commentDelete}
                                                    alt=""
                                                />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))
                    )}
                </ul>

                {/* Add comment form */}
                <form
                    className="comment-form"
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="new-comment">
                        Add your thoughts
                    </label>

                    <div className="comment-form-row">
                        <input
                            id="new-comment"
                            type="text"
                            value={newComment}
                            onChange={(event) =>
                                setNewComment(event.target.value)
                            }
                            className="comment-input"
                            placeholder="Write a comment about this artwork..."
                        />

                        <button
                            className="comment-button"
                            type="submit"
                            disabled={!newComment.trim()}
                        >
                            Add Comment
                        </button>
                    </div>
                </form>

                <Link to="/art-pieces" className="back-link">
                    ← Back to Gallery
                </Link>

            </section>
        </article>
    );
}
