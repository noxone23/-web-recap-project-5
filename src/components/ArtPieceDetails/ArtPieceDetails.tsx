import { ArtPiece, Comment  } from "../../types";
import {  useState } from "react";
import type {SyntheticEvent} from "react";
import { useParams, Link } from "react-router";
import ColorPalette from "../ColorPalette/ColorPalette";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { ArtPiecesInfo } from "../FavoriteButton/ArtPiecesInfo";


type ArtPieceDetailsProps = {
  pieces: ArtPiece[];
  artPiecesInfo: ArtPiecesInfo[];
  onToggle: (slug: string) => void;
  comments: Comment[];
  onAddComment: (comment: Comment) => void;
};

export default function ArtPieceDetails({
  pieces,
  artPiecesInfo,
  onToggle,
  comments,
  onAddComment,
}: ArtPieceDetailsProps) {
   
  
  const [newComment, setNewComment] = useState("");
  const { slug } = useParams();
  const artPiece = pieces.find((piece) => piece.slug === slug);
  const pieceComments = comments.filter((comment) => comment.slug === slug);
  
  function handleSubmit(event: SyntheticEvent<HTMLFormElement>){
    event.preventDefault();
    if(newComment.trim() === ""){
      return;
    }
    if(!slug || newComment.trim() === ""){
    return;
  }

    const comment: Comment = {
      text: newComment,
      date : new Date().toLocaleDateString("de-DE"),
      slug : slug,

    }
    
    onAddComment(comment);
    
    setNewComment("");

  } 
  
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
       <h2>Comments</h2>
       <ul className="comments">
        {pieceComments.map((comment, index) => (<li key={index}>  {`${comment.text} - (${comment.date} )`}</li>))}
       </ul>
       
       <form className="comment-form" onSubmit={handleSubmit} >
        
          
          <label htmlFor="comment">
            <input type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)} 
              className="comment-input"
              placeholder="Enter Your Comment here"
               />
          </label>
          <button className="comment-button" type="submit">Add Comment</button>

          

       </form>
       <Link to={`/art-pieces`}>Back to Gallery</Link>
       </article>
    </main>
  );
}
