export default interface Genre {
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
