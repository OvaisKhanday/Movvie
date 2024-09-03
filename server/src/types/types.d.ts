// type TShow = "movie" | "tv";

// interface IMediaResponse {
//   page: number;
//   results: IMedia[];
//   total_pages: number;
//   total_results: number;
// }

// interface IMedia {
//   backdrop_path: string;
//   id: number;
//   title: string;
//   original_title: string;
//   overview: string;
//   poster_path: string;
//   media_type: TShow;
//   adult: boolean;
//   original_language: string;
//   genre_ids: number[];
//   popularity: number;
//   release_date: string;
//   video: boolean;
//   vote_average: number;
//   vote_count: number;
// }

// interface IPopularMedia extends IMediaResponse {}
// interface ITrending extends IMediaResponse {}

type TMedia = "movie" | "tv";

interface IMovieDetails extends IMovie {
  media_type?: "movie";
  budget: number;
  homepage: string;
  imdb_id: string;
  spoken_languages: string[];
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  casts: string[];
}

interface ITVShowDetails extends ITVShow {
  media_type?: "tv";
  homepage: string;
  in_production: boolean;
  number_of_episodes: number;
  number_of_seasons: number;
  status: string;
  tagline: string;
  type: string;
  last_air_date: string;
  casts: string[];
}

interface IMediaResponse {
  backdrop_path: string;
  id: number;
  overview: string;
  poster_path: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
}
interface IMovieResponse extends IMediaResponse {
  media_type: "movie";
  title: string;
  original_title: string;
  video: boolean;
  release_date: string;
}

interface ITVShowResponse extends IMediaResponse {
  media_type: "tv";
  name: string;
  original_name: string;
  first_air_date: string;
  origin_country: string[];
}

interface ITrendingResponse {
  page: number;
  results: (IMovieResponse | ITVShowResponse)[];
  total_pages: number;
  total_results: number;
}

interface IPopularMediaResponse {
  page: number;
  results: (IMovieResponse | ITVShowResponse)[];
  total_pages: number;
  total_results: number;
}

interface IMedia {
  id: number;
  adult: boolean;
  backdrop_path: string;
  poster_path: string;
}

interface IMovie extends IMedia {
  title: string;
  media_type: "movie";
  release_date: string;
}

interface ITVShow extends IMedia {
  media_type: "tv";
  name: string;
  first_air_date: string;
}

interface IPopularMoviesResponse {
  page: number;
  results: IMovieResponse[];
  total_pages: number;
  total_results: number;
}

interface IPopularTVShowsResponse {
  page: number;
  results: ITVShowResponse[];
  total_pages: number;
  total_results: number;
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
