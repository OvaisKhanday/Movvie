import axios from "axios";

const getPopularMedia = async (page: number): Promise<IPopularMediaResponse | null> => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/all/week?language=en-US&page=${page}&api_key=${process.env.TMDB_API_KEY}`
    );
    const popularAllMedia = response.data;

    return await Promise.resolve<IPopularMediaResponse | null>(popularAllMedia);
  } catch (error: any) {
    throw new Error(error);
  }
};
async function getPopularMovies(page: number): Promise<IPopularMoviesResponse | null> {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?language=en-US&page=${page}&api_key=${process.env.TMDB_API_KEY}`
    );
    const popularMovies = response.data;
    return await Promise.resolve<IPopularMoviesResponse | null>(popularMovies);
  } catch (error: any) {
    throw new Error(error);
  }
}

async function getPopularTVShows(page: number): Promise<IPopularTVShowsResponse | null> {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/tv/week?language=en-US&page=${page}&api_key=${process.env.TMDB_API_KEY}`
    );
    const popularTVShows = response.data;
    return await Promise.resolve<IPopularTVShowsResponse | null>(popularTVShows);
  } catch (error: any) {
    throw new Error(error);
  }
}

export { getPopularMedia, getPopularMovies, getPopularTVShows };
