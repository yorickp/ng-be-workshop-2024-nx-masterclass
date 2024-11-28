import { TMDBMovieGenreModel } from './genres';

export interface MovieModel {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

export interface TMDBMovieModel {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_title: string;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;

  genre_ids: number[];
  // categories
  upcoming?: boolean;
  popular?: boolean;
  topRated?: boolean;
}

export type TMDBMovieCategory = 'upcoming' | 'popular' | 'top_rated';

export interface TMDBMovieDetailsModel {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;

  genres: TMDBMovieGenreModel[];
  // categories
  upcoming?: boolean;
  popular?: boolean;
  topRated?: boolean;
}
