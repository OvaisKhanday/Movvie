import { FC, HTMLAttributes } from "react";
import { cn } from "../lib/utils";

interface MediaGridProps extends HTMLAttributes<HTMLDivElement> {}

const MediaGrid: FC<MediaGridProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default MediaGrid;
