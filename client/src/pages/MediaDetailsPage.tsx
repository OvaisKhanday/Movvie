import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MediaDetailsPage = () => {
  const { id, media_type } = useParams<{
    id: string;
    media_type: "movie" | "tv";
  }>();
  const [movieDetails, setMovieDetails] = useState<IMovieDetails | null>(null);
  const [tvDetails, setTVDetails] = useState<ITVShowDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log("Movie details: ", movieDetails);
  console.log("TV details: ", tvDetails);

  const getMediaDetails = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:8080/details/${media_type === "movie" ? "movie" : "tv"}/${id}`
      );

      media_type === "movie"
        ? setMovieDetails(response.data)
        : setTVDetails(response.data);
    } catch (error) {
      console.error("Error getting media details ", error);

      setError("Can't find this media details");
    } finally {
      setIsLoading(false);
    }
  }, [id, media_type]);

  useEffect(() => {
    if (id && media_type) {
      getMediaDetails();
    }
  }, [getMediaDetails, id, media_type]);

  if (isLoading) {
    return (
      <div className="font-sans font-light text-onSurface/75">...Loading</div>
    );
  }

  if (error) {
    return (
      <div className="font-sans font-light text-3xl text-onSurface/75 text-center">
        {error}
      </div>
    );
  }

  return (
    <>
      {media_type === "movie" ? (
        !movieDetails ? (
          <div className="font-sans font-light text-3xl text-onSurface/75 text-center">
            No Movie details found
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <section className="w-[30%] flex items-center justify-center">
              <img
                src={movieDetails.backdrop_path}
                alt="poster"
                className="rounded-xl object-cover w-[70%]"
              />
            </section>
            <section className="w-[65%] flex flex-col items-center font-sans gap-4">
              <span className="flex flex-col items-start">
                <h1 className="font-medium text-onSurface text-4xl ">
                  {movieDetails.original_title}
                </h1>
              </span>
              <span className="text-3xl text-onSurface font-medium">
                {movieDetails.vote_average}
              </span>
              <span className="w-full flex items-center justify-between font-medium text-lg text-onSurface">
                <span>
                  <h4 className="text-onSurface/60">Length</h4>
                  <p>{movieDetails.runtime}</p>
                </span>
                <span>
                  <h4 className="text-onSurface/60">Language</h4>
                  <p>{movieDetails.spoken_languages}</p>
                </span>
                <span>
                  <h4 className="text-onSurface/60">Year</h4>
                  <p>{movieDetails.release_date}</p>
                </span>
                <span>
                  <h4 className="text-onSurface/60">Status</h4>
                  <p>{movieDetails.status}</p>
                </span>
              </span>
              <span className="flex items-center flex-wrap">
                <h4 className="text-lg font-medium text-onSurface">Genres</h4>
                {movieDetails.genres.map((genre) => (
                  <span
                    key={genre}
                    className="bg-onSurface font-sans font-light text-sm p-1 text-tertiary rounded-md"
                  >
                    {genre}
                  </span>
                ))}
              </span>
              <span>
                <h4 className="text-lg font-medium text-onSurface">Synopsis</h4>
                <p className="text-base font-light text-onSurface">
                  {movieDetails.overview}
                </p>
              </span>
              <span className="flex items-center flex-wrap">
                <h4 className="text-lg font-medium text-onSurface">Casts</h4>
                {movieDetails.casts.map((cast) => (
                  <span
                    key={cast}
                    className="flex items-center justify-center p-1 font-sans font-light text-sm text-onSurface border border-onSurface rounded-md"
                  >
                    {cast}
                  </span>
                ))}
              </span>
            </section>
          </div>
        )
      ) : !tvDetails ? (
        <div className="font-sans font-light text-3xl text-onSurface/75 text-center">
          No TV show details found
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <section className="w-[30%] flex items-center justify-center">
            <img
              src={tvDetails.backdrop_path}
              alt="poster"
              className="rounded-xl object-cover w-[70%]"
            />
          </section>
          <section className="w-[65%] flex flex-col items-center font-sans gap-4">
            <span className="flex flex-col items-start">
              <h1 className="font-medium text-onSurface text-4xl ">
                {tvDetails.original_name}
              </h1>
              <h4 className="font-medium text-lg text-onSurface/60">
                {tvDetails.tagline}
              </h4>
            </span>
            <span className="text-3xl text-onSurface font-medium">
              {tvDetails.vote_average}
            </span>
            <span className="w-full flex items-center justify-between font-medium text-lg text-onSurface">
              <span>
                <h4 className="text-onSurface/60">Language</h4>
                <p>{tvDetails.spoken_languages}</p>
              </span>
              <span>
                <h4 className="text-onSurface/60">First Air</h4>
                <p>{tvDetails.first_air_date}</p>
              </span>
              <span>
                <h4 className="text-onSurface/60">Last Air</h4>
                <p>{tvDetails.last_air_date}</p>
              </span>
              <span>
                <h4 className="text-onSurface/60">Status</h4>
                <p>{tvDetails.status}</p>
              </span>
            </span>
            <span className="flex items-center flex-wrap">
              <h4 className="text-lg font-medium text-onSurface">Genres</h4>
              {tvDetails.genres.map((genre) => (
                <span
                  key={genre}
                  className="bg-onSurface font-sans font-light text-sm text-tertiary p-1 rounded-md"
                >
                  {genre}
                </span>
              ))}
            </span>
            <span>
              <h4 className="text-lg font-medium text-onSurface">Synopsis</h4>
              <p className="text-base font-light text-onSurface">
                {tvDetails.overview}
              </p>
            </span>
            <span className="flex items-center flex-wrap">
              <h4 className="text-lg font-medium text-onSurface">Casts</h4>
              {tvDetails.casts.map((cast) => (
                <span
                  key={cast}
                  className="flex items-center justify-center p-1 font-sans font-light text-sm text-onSurface border border-onSurface rounded-md"
                >
                  {cast}
                </span>
              ))}
            </span>
          </section>
        </div>
      )}
    </>
  );
};

export default MediaDetailsPage;
