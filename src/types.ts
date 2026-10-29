export type ArtPiece ={
    slug: string;
    artist: string;
    name: string;
    imageSource: string;
    year: string;
    genre: string;
    colors: string[];
    dimensions: {
        height: number;
        width: number;
        type: string;
    }
}
export type Comment ={
    slug: string;
    text: string;
    date: string;
}
