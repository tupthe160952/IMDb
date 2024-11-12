export default interface Genre {
  popularity: any;
  vote_count: any;
  id: number;
  name: string;
}

export default interface CardProps {
  id: number;
  image: string;
  rating: string | number;
  name: string;
}

export default interface SliderProps {
  id: number;
  title: string;
  extract: string;
  thumbnail: string;
  banner: string;
  vote_average: number;
  trailer: string;
}

// export interface Movie {
//   id: number;
//   title: string;
//   date: string;
//   cast: string[];
//   genres: number[];
//   href: string;
//   extract: string;
//   thumbnail: string;
//   banner: string;
//   overview: string;
//   popularity: number;
//   vote_average: number;
//   vote_count: number;
//   trailer: string;
// }

// export interface WatchlistItem {
//   id: number;
//   userId: number;
//   movieId: number;
// }
