import { FC, useEffect, useState } from "react";
import MediaGrid from "../components/MediaGrid";
import MediaItem from "../components/MediaItem";
import TrendingItem from "../components/TrendingItem";
import { cn } from "../lib/utils";
import Layout from "./Layout";

interface HomepageProps {}

const Homepage: FC<HomepageProps> = ({}) => {
  const [trending, setTrending] = useState<IMedia[]>([]);
  const [media, setMedia] = useState<IMedia[]>([]);
  useEffect(() => {
    fetch("/data/trending.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((resp) =>
      resp.json().then((data) => {
        setTrending(data);
        setMedia(data);
      })
    );
  }, []);

  return (
    <>
      <Layout className="text-body-md text-onSurface">
        <h1 className="mt-4 mb-1 text-heading-md">Trending Media</h1>

        <div
          className={cn(
            "flex gap-4 overflow-x-auto w-full whitespace-nowrap horizontal-scroll"
          )}
        >
          {trending.map((trend) => (
            <TrendingItem
              key={trend.id}
              media={trend}
              className="flex-shrink-0"
            />
          ))}
        </div>
        <h1 className="mt-4 mb-1 text-heading-md">
          Popular Movies and TV Shows
        </h1>
        <MediaGrid>
          {media.map((med) => (
            <MediaItem key={med.id} media={med} />
          ))}
        </MediaGrid>
      </Layout>
    </>
  );
};

export default Homepage;
