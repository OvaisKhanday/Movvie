import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import MediaGrid from "../components/MediaGrid";
import { BookmarkCard } from "../components/ui";

const BookmarkPage = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarkedMedia, setBookmarkedMedia] = useState<IBookmark[]>([]);

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
      {isLoading ? (
        <span>...Loading</span>
      ) : bookmarkedMedia.length === 0 ? (
        <span className="w-full flex justify-center items-center">
          <h2 className="font-sans text-heading-lg mb-1 text-onSurface/50">
            {" "}
            Nothing in the Bookmark
          </h2>
        </span>
      ) : (
        <div className="flex flex-col items-start gap-8">
          <span>
            <h2 className="font-sans text-heading-lg mb-1 text-onSurface">
              Bookmarked Movies
            </h2>
            <MediaGrid>
              {bookmarkedMedia
                .filter((med) => med.mediaType === "MOVIE")
                .map((med) => (
                  <BookmarkCard
                    key={med.id}
                    id={med.id}
                    adult={med.adult}
                    authState={auth}
                    title={med.title}
                    startDate={med.startDate}
                    mediaType={med.mediaType}
                    poster_path={med.posterPath}
                    backdrop_path={med.backdropPath}
                    checkBookmark={checkBookmarked}
                  />
                ))}
            </MediaGrid>
          </span>
          <span>
            <h2 className="font-sans text-heading-lg mb-1 text-onSurface">
              Bookmarked TV Shows
            </h2>
            <MediaGrid>
              {bookmarkedMedia
                .filter((med) => med.mediaType === "TV")
                .map((med) => (
                  <BookmarkCard
                    key={med.id}
                    id={med.id}
                    adult={med.adult}
                    authState={auth}
                    title={med.title}
                    startDate={med.startDate}
                    mediaType={med.mediaType}
                    poster_path={med.posterPath}
                    backdrop_path={med.backdropPath}
                    checkBookmark={checkBookmarked}
                  />
                ))}
            </MediaGrid>
          </span>
        </div>
      )}
    </>
  );
};

export default BookmarkPage;
