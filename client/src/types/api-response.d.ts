interface ISearchItems {
  id: number;
  title: string;
  media_type: TMedia;
  overview: string;
  poster_path: string;
  backdrop_path: string;
}

interface IMediaDetails {
  adult: boolean;
  backdrop_path: string;
  genres: string[];
  homepage?: string;
  id: number;
  poster_path: number;
  spoken_languages: string[];
  status?: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
  overview: string;
  popularity: number;
  casts: string[];
}

interface IMovieDetails extends IMediaDetails {
  budget: number;
  imdb_id?: string;
  original_title: string;
  release_date: string;
  revenue: number;
  runtime: number;
  title: string;
  video: boolean;
}

interface ITVShowDetails extends IMediaDetails {
  first_air_date: string;
  in_production: boolean;
  last_air_date: string;
  name: string;
  number_of_episodes: number;
  number_of_seasons: number;
  original_name: string;
  popularity: number;
  status: string;
  tagline: string;
  type: string;
}
