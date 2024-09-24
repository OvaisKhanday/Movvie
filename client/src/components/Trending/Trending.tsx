import axios from "axios";
import { useEffect, useState } from "react";
import { TrendingCard } from "../ui";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Trending = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const [trendingMedia, setTrendingMedia] = useState<IMedia[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarkedMedia, setBookmarkedMedia] = useState<IBookmark[]>([]);

  const settings: Settings = {
    arrows: true,
    swipeToSlide: true,
    infinite: true,
    slidesToShow: 3,
    dots: true,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const getTrendingMedia = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/trending/all");

      console.log("Response - ", response.data.length);

      if (response.data) {
        setTrendingMedia(response.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error getting the trending media: ", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTrendingMedia();
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
    <div className="overflow-hidden text-body-md text-onSurface">
      <h2 className="font-sans text-heading-lg mb-1 ">Trending</h2>
      <div className="slider-container">
        {isLoading ? (
          <span>...Loading</span>
        ) : (
          <Slider {...settings}>
            {trendingMedia.map((media) => (
              <TrendingCard
                key={media.id}
                id={media.id}
                title={media.title}
                adult={media.adult}
                backdrop_path={media.backdrop_path}
                poster_path={media.poster_path}
                media_type={media.media_type}
                start_date={media.start_date}
                authState={auth}
                checkBookmark={checkBookmarked}
              />
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default Trending;
