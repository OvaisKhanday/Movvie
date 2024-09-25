type TMedia = "movie" | "tv";
interface IMedia {
  id: number;
  adult: boolean;
  backdrop_path: string;
  poster_path: string;
  title: string;
  media_type: TMedia;
  start_date: string;
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
