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
