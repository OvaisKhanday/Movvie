import { FC, HTMLAttributes } from "react";
import { cn } from "../lib/utils";
import { MovieLogo, TVSeriesLogo } from "./logos";

interface MediaItemProps extends HTMLAttributes<HTMLDivElement> {
  media: IMedia;
}

const MediaItem: FC<MediaItemProps> = ({ media, className, ...props }) => {
  return (
    <div
      className={cn(
        "min-w-full p-2 text-onSurface rounded-lg overflow-hidden",
        className
      )}
      {...props}
    >
      <img
        className="w-full h-40 rounded-lg object-cover"
        src={`https://image.tmdb.org/t/p/w500${media.backdrop_path}')`}
        alt={media.title}
      />
      <div>
        <div className="text-muted flex items-center text-body-sm -mb-2">
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
        <p className="text-body-lg">{media.title}</p>
      </div>
    </div>
  );
};

export default MediaItem;
