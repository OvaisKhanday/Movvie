type TShow = "movie" | "tv";

interface ITrending {
  backdrop_path: string;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: TShow;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
// {
//     "adult": false,
//     "backdrop_path": "/zE9jOFPFCz30cFY606KdhHQbPhI.jpg",
//     "id": 221802,
//     "name": "The Nurse",
//     "original_language": "da",
//     "original_name": "Sygeplejersken",
//     "overview": "Pernille Kurzmann Larsen, a fresh-faced nurse at a hospital, begins to question the attention-seeking tendencies of her colleague, Christina Aistrup Hansen. As Pernille delves deeper into her suspicions, she starts to believe that Christina's behavior may be linked to a series of patient deaths.",
//     "poster_path": "/zroHjvuzScGWfNKpqBPuCDuYZnh.jpg",
//     "media_type": "tv",
//     "genre_ids": [
//       80,
//       18
//     ],
//     "popularity": 33.958,
//     "first_air_date": "2023-04-27",
//     "vote_average": 6,
//     "vote_count": 3,
//     "origin_country": [
//       "DK"
//     ]
//   },
