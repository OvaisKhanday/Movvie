import axios from "axios";

async function fetchMovieDetails(id: string): Promise<IMovieDetails | null> {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${process.env.TMDB_API_KEY}`
    );

    const movieDetails = response.data;

    const casts = await fetchMovieCasts(id);
    const movie: IMovieDetails = {
      adult: movieDetails.adult,
      backdrop_path: movieDetails.backdrop_path,
      budget: movieDetails.budget,
      genres: movieDetails.genres.map((genre: { name: any }) => genre.name),
      homepage: movieDetails.homepage,
      id: movieDetails.id,
      original_title: movieDetails.original_title,
      overview: movieDetails.overview,
      popularity: movieDetails.popularity,
      poster_path: movieDetails.poster_path,
      release_date: movieDetails.release_date,
      revenue: movieDetails.revenue,
      runtime: movieDetails.runtime,
      spoken_languages: movieDetails.spoken_languages.map((lang: { english_name: any }) => lang.english_name),
      status: movieDetails.status,
      tagline: movieDetails.tagline,
      title: movieDetails.title,
      video: movieDetails.video,
      vote_average: movieDetails.vote_average,
      vote_count: movieDetails.vote_count,
      imdb_id: movieDetails.imdb_id,
      media_type: "movie",
      casts: casts,
    };

    return await Promise.resolve<IMovieDetails | null>(movie);
  } catch (error: any) {
    throw new Error(error);
  }
}

async function fetchMovieCasts(id: string): Promise<string[]> {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US&api_key=${process.env.TMDB_API_KEY}`
    );
    const movieCredits = response.data;

    return movieCredits.cast.slice(0, 25).map((cast: { name: any }) => cast.name);
  } catch (error: any) {
    throw new Error(error);
  }
}

async function fetchTVShowDetails(id: string): Promise<ITVShowDetails | null> {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US&api_key=${process.env.TMDB_API_KEY}`
    );

    const tvShowDetails = response.data;

    const casts = await fetchTVShowCasts(id);
    const tvShow: ITVShowDetails = {
      adult: tvShowDetails.adult,
      backdrop_path: tvShowDetails.backdrop_path,
      first_air_date: tvShowDetails.first_air_date,
      genres: tvShowDetails.genres.map((genre: { name: any }) => genre.name),
      homepage: tvShowDetails.homepage,
      id: tvShowDetails.id,
      in_production: tvShowDetails.in_production,
      last_air_date: tvShowDetails.last_air_date,
      name: tvShowDetails.name,
      number_of_episodes: tvShowDetails.number_of_episodes,
      number_of_seasons: tvShowDetails.number_of_seasons,
      original_name: tvShowDetails.original_name,
      overview: tvShowDetails.overview,
      popularity: tvShowDetails.popularity,
      poster_path: tvShowDetails.poster_path,
      spoken_languages: tvShowDetails.spoken_languages.map((lang: { english_name: any }) => lang.english_name),
      status: tvShowDetails.status,
      tagline: tvShowDetails.tagline,
      type: tvShowDetails.type,
      vote_average: tvShowDetails.vote_average,
      vote_count: tvShowDetails.vote_count,
      media_type: "tv",
      casts: casts,
    };
    return tvShow;
  } catch (error: any) {
    throw new Error(error);
  }
}

async function fetchTVShowCasts(id: string): Promise<string[]> {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/credits?language=en-US&api_key=${process.env.TMDB_API_KEY}`
    );
    const tvShowCredits = response.data;

    return tvShowCredits.cast.slice(0, 25).map((cast: { name: any }) => cast.name);
  } catch (error: any) {
    throw new Error(error);
  }
}
export { fetchMovieDetails, fetchTVShowDetails };
