import axios from "axios";

async function getSearched(
  page: number,
  query: string
): Promise<ISearchMedia | null> {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=${page}&api_key=${process.env.TMDB_API_KEY}`
    );
    const searchResult = response.data;

    const searched: ISearchMedia = {
      page: searchResult.page,
      total_pages: searchResult.total_pages,
      total_results: searchResult.total_results,
      results: searchResult.results.map(
        (result: {
          id: any;
          media_type: string;
          poster_path: any;
          title: any;
          name: any;
          overview: any;
          backdrop_path: any;
        }) => {
          return {
            id: result.id!,
            media_type: result.media_type === "movie" ? "movie" : "tv",
            poster_path: result.poster_path!,
            title: (result.media_type === "movie"
              ? result.title
              : result.name)!,
            overview: result.overview!,
            backdrop_path: result.backdrop_path!,
          };
        }
      ),
    };

    return Promise.resolve<ISearchMedia | null>(searched);
  } catch (error: any) {
    throw new Error("Error getting search result", error);
  }
}

export { getSearched };
