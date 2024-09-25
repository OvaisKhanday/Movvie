import { FC, useState } from "react";
import { MovieLogo, TVSeriesLogo, StarLogo, StarFilledLogo } from "../../logos";
import { useNavigate } from "react-router-dom";
import { UserState } from "../../../store/features/auth/authSlice";
import axios from "axios";

interface TrendingCardProps extends IMedia {
  authState: UserState;
  checkBookmark: (id: number) => boolean;
}

const TrendingCard: FC<TrendingCardProps> = ({
  id,
  media_type,
  adult,
  backdrop_path,
  poster_path,
  title,
  start_date,
  authState,
  checkBookmark,
}) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(checkBookmark(id));

  const handleToggle = async (id: number, media_type: "movie" | "tv") => {
    if (!authState.status) {
      navigate("/login");
      return;
    }

    try {
      if (isBookmarked) {
        const response = await axios.delete(
          `http://localhost:8080/bookmark/delete?id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${authState.userData?.id}`,
            },
          }
        );

        if (response.data) {
          setIsBookmarked(checkBookmark(id));
        }
      } else {
        const response = await axios.post(
          `http://localhost:8080/bookmark/add`,
          { id, media_type },
          {
            headers: {
              Authorization: `Bearer ${authState.userData?.id}`,
            },
          }
        );

        if (response.data) {
          setIsBookmarked(checkBookmark(id));
        }
      }
    } catch (error) {
      console.error("Error toggling bookmark button: ", error);
    }
  };
  return (
    <div
      className="group relative lg:min-w-[28rem] lg:min-h-[12rem] min-w-[28rem] min-h-[12rem] rounded-md object-cover shadow after:transition-opacity after:duration-300 after:ease-linear after:content-[''] after:absolute after:w-full after:h-full after:bg-black/10 after:inset-0 hover:after:bg-black/40 px-5 py-4 flex flex-col justify-between "
      style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/w500${backdrop_path}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <span className="self-end flex justify-center items-center z-10 group/bookmark rounded-full p-1.5 w-7 h-7 bg-black/40 transition duration-150 ease-linear hover:bg-onSecondary/80">
        <button onClick={() => handleToggle(id, media_type!)}>
          {isBookmarked ? (
            <StarFilledLogo />
          ) : (
            <StarLogo className="group-hover/bookmark:text-black/80 transition-colors duration-150 ease-linear" />
          )}
        </button>
      </span>
      <div className="self-start w-full flex flex-col font-sans font-light text-onSecondary">
        <span className="w-full flex items-center gap-3 text-sm text-onSecondary/80 z-10">
          <span>{start_date?.substring(0, 4)}</span>
          <span className="w-1 h-1 bg-muted rounded-full"></span>
          <span className="flex items-center ">
            {media_type === "movie" ? (
              <>
                <MovieLogo className="text-onSecondary" />
                &nbsp; <span className="capitalize">{media_type}</span>{" "}
              </>
            ) : (
              <>
                <TVSeriesLogo className="text-onSecondary" />
                &nbsp; <span className="capitalize">{`TV Series`}</span>{" "}
              </>
            )}
          </span>
          <span className="w-1 h-1 bg-muted rounded-full"></span>
          <span>{adult ? "18+" : "PG"}</span>
        </span>
        <span className="font-medium text-onPrimary z-10 text-heading-sm">
          {title}
        </span>
      </div>
    </div>
  );
};

export default TrendingCard;
