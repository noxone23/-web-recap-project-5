import type { ArtPiecesInfo } from "../components/FavoriteButton/ArtPiecesInfo";
import type { Comment } from "../types";
export function loadArtPieceInfo(): ArtPiecesInfo[] {
  // check if window is defined (safety check for server side rendering environments)
  if (typeof window === "undefined") {
    return [];
  }
  // get raw JSON string from browsers localStorage
  const saved_state = localStorage.getItem("art-piece-info");

  if(!saved_state) {
    return [];
  }
  try {
    // parse JSON string back into a real javascript array
    return JSON.parse(saved_state);
  } catch (error) {
    console.error("Failed to parse the art piece from localStorage", error);
    return [];
  }
}

export function savedArtPieceInfo(artPiecesInfo: ArtPiecesInfo[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("art-piece-info", JSON.stringify(artPiecesInfo));
}



export function loadComments(): Comment[]{
  if(typeof window === "undefined"){
      return [];
  } 
  
  const savedCommentState = localStorage.getItem("comments");
  if(!savedCommentState){
    return [];
  }
  try{
    return JSON.parse(savedCommentState);
  }
  catch(error){
    console.log("Failed to parse the comment from LocalStorage", error);
    return [];
  }
}
export function saveComments(comment: Comment []){
  if (typeof window === "undefined") return;
  localStorage.setItem("comments", JSON.stringify(comment));
}