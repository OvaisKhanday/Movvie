import { FC, useEffect, useState } from "react";
import MediaGrid from "../components/MediaGrid";
import { cn } from "../lib/utils";
import { Trending } from "../components";
import { MediaCard } from "../components/ui";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import axios from "axios";

interface HomepageProps {}

const Homepage: FC<HomepageProps> = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [media, setMedia] = useState<IMedia[]>([]);
  const [bookmarkedMedia, setBookmarkedMedia] = useState<IBookmark[]>([]);

  const getMedia = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/popular/all");

      console.log("Response media - ", response.data.results);

      if (response.data) {
        setMedia(response.data.results);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error getting the media: ", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMedia();
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
      <div
        className={cn(
          "flex gap-4 overflow-x-auto w-full whitespace-nowrap horizontal-scroll"
        )}
      >
        <Trending />
      </div>
      <h2 className="font-sans text-heading-lg mb-1 text-onSurface">
        Popular Movies and TV Shows
      </h2>
      {isLoading ? (
        <span>...Loading</span>
      ) : (
        <MediaGrid>
          {media.map((med) => (
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

export default Homepage;
