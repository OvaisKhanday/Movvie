type TMedia = "movie" | "tv";
interface IMedia {
  id: number;
  adult: boolean;
  backdrop_path: string;
  poster_path: string;
  title: string;
  media_type?: TMedia;
  mediaType?: "MOVIE" | "TV";
  start_date?: string;
  startDate?: Date;
}

interface IMovie extends IMedia {
  media_type: "movie";
}

interface ITVShow extends IMedia {
  media_type: "tv";
}

interface IBookmark {
  id: number;
  title: string;
  adult: boolean;
  backdropPath: string;
  posterPath: string;
  mediaType: "MOVIE" | "TV";
  startDate: Date;
  createdAt: Date | undefined;
}
