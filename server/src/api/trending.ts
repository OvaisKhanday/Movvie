import axios from "axios";

const getTrending = async (page: number): Promise<ITrendingResponse | null> => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?language=en-US&page=${page}&api_key=${process.env.TMDB_API_KEY}`
    );
    const trending = response.data;

    return await Promise.resolve<ITrendingResponse | null>(trending);
  } catch (error: any) {
    throw new Error(error);
  }
};

export { getTrending };
