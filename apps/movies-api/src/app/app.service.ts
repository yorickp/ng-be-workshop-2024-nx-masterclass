import { Injectable } from '@nestjs/common';
import { TMDBMovieModel, TMDBMovieGenreModel, TMDBMovieCategory } from '@ng-be-workshop/models';
import { GENRES_DATA, MOVIES_DATA } from './static-data';

@Injectable()
export class AppService {
  getGenres(): TMDBMovieGenreModel[] {
    return GENRES_DATA;
  }

  getMovies(category?: TMDBMovieCategory): TMDBMovieModel[] {
    return MOVIES_DATA
      .filter((movie) => {
        if (category) {
          if (category === 'popular') {
            return movie.popular;
          }
          if (category === 'top_rated') {
            return movie.topRated;
          }
          if (category === 'upcoming') {
            return movie.upcoming;
          }
        }
        return true;
      })
      .sort((a, b) => a.popularity - b.popularity);
  }

  getMoviesByGenre(genre: TMDBMovieGenreModel['id']): TMDBMovieModel[] {
    return MOVIES_DATA
      .filter((movie) => movie.genre_ids.includes(genre))
      .sort((a, b) => a.popularity - b.popularity);
  }

  getMovieById(id: number): TMDBMovieModel {
    return MOVIES_DATA.find((movie) => movie.id === id);
  }
}
