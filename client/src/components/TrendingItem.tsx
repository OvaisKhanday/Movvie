import { FC, HTMLAttributes } from "react";
import { MovieLogo, TVSeriesLogo } from "./logos";
import { cn } from "../lib/utils";

interface TrendingItemProps extends HTMLAttributes<HTMLDivElement> {
  media: IMedia;
}
const TrendingItem: FC<TrendingItemProps> = ({
  media,
  className,
  ...props
}) => {
  return (
    <div
      style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/w500${media.backdrop_path}')`,
      }}
      className={cn(
        "relative overflow-hidden w-96 h-48 rounded-md inline-block text-onSurface bg-no-repeat bg-cover",
        className
      )}
      {...props}
    >
      <div className="absolute rounded-md bottom-0 w-full h-32 bg-gradient-to-b from-gray-800/0 to-gray-900" />
      <div className="absolute bottom-4 left-4">
        <div className="text-muted flex  items-center text-body-sm -mb-3">
          <span>{media.start_date}</span>
          <span className="text-heading-sm">&nbsp;{"·"}&nbsp;</span>
          {media.media_type === "movie" ? (
            <span className="flex items-center">
              <MovieLogo className="text-muted" /> <p>&nbsp;Movie</p>
            </span>
          ) : (
            <span className="flex items-center">
              <TVSeriesLogo className="text-muted" /> <p>&nbsp;TV Series</p>
            </span>
          )}
        </div>
        <p className="text-heading-md">{media.title}</p>
      </div>
    </div>
  );
};

export default TrendingItem;
