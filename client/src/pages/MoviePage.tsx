import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import MediaGrid from "../components/MediaGrid";
import { MediaCard } from "../components/ui";

const MoviePage = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const [movieMedia, setMovieMedia] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarkedMedia, setBookmarkedMedia] = useState<IBookmark[]>([]);

  const getMovieMedia = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/popular/movies");

      console.log("Response media - ", response.data.results);

      if (response.data) {
        setMovieMedia(response.data.results);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error getting the media: ", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMovieMedia();
  }, []);

  useEffect(() => {
    const getBookmarkedMedia = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/bookmark/all`, {
          headers: {
            Authorization: `Bearer ${auth.userData?.id}`,
          },
        });

        console.log("Response - ", response.data);

        if (response.data) {
          setBookmarkedMedia(response.data.results);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error getting the bookmarked media: ", error);
        setIsLoading(false);
      }
    };

    getBookmarkedMedia();
  }, [auth.userData?.id]);

  const checkBookmarked = (id: number): boolean => {
    const res = bookmarkedMedia.findIndex((media) => media.id === id);

    return res >= 0;
  };

  return (
    <>
      <h2 className="font-sans text-heading-lg mb-1 text-onSurface">Movies</h2>
      {isLoading ? (
        <span>...Loading</span>
      ) : (
        <MediaGrid>
          {movieMedia.map((med) => (
            <MediaCard
              key={med.id}
              id={med.id}
              adult={med.adult}
              authState={auth}
              title={med.title}
              start_date={med?.start_date ?? "2020"}
              media_type={med.media_type}
              poster_path={med.poster_path}
              backdrop_path={med.backdrop_path}
              checkBookmark={checkBookmarked}
            />
          ))}
        </MediaGrid>
      )}
    </>
  );
};

export default MoviePage;
