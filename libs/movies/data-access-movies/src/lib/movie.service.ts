import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { insert, remove } from '@rx-angular/cdk/transformations';
import { map, Observable, tap, timer } from 'rxjs';
import {
  MovieModel,
  TMDBMovieCreditsModel,
  TMDBMovieDetailsModel,
  TMDBMovieGenreModel,
  TMDBMovieModel,
} from '@nx-workshop/shared/models';
import { Environment, ENVIRONMENT_TOKEN } from '@nx-workshop/shared/util-env-token';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(
    @Inject(ENVIRONMENT_TOKEN) private env: Environment,
    private httpClient: HttpClient
  ) { }

  getGenres(): Observable<TMDBMovieGenreModel[]> {
    return this.httpClient
      .get<TMDBMovieGenreModel[]>(
        `${this.env.apiUrl}/api/genre/list`
      )
  }

  getMoviesByGenre(
    genre: TMDBMovieGenreModel['id'],
    page = 1,
    sortBy = 'popularity.desc'
  ): Observable<TMDBMovieModel[]> {
    return this.httpClient
      .get<TMDBMovieModel[]>(
        `${this.env.apiUrl}/api/discover/movie/${genre}`,
        {
          params: {
            with_genres: genre,
            page,
            sort_by: sortBy,
          },
        }
      )
  }

  getMovieCredits(id: string): Observable<TMDBMovieCreditsModel> {
    return this.httpClient.get<TMDBMovieCreditsModel>(
      `${this.env.apiUrl}/api/movie/${id}/credits`
    );
  }

  getMovieRecommendations(id: string): Observable<{ results: MovieModel[] }> {
    return this.httpClient.get<{ results: MovieModel[] }>(
      `${this.env.apiUrl}/api/movie/${id}/recommendations`
    );
  }

  getMovieById(id: string): Observable<TMDBMovieDetailsModel> {
    return this.httpClient.get<TMDBMovieDetailsModel>(
      `${this.env.apiUrl}/api/movie/${id}`
    );
  }

  getMovieList(
    category: string,
  ): Observable<TMDBMovieModel[]> {
    return this.httpClient
      .get<TMDBMovieModel[]>(`${this.env.apiUrl}/api/movies/${category}`)
  }

  getFavoriteMovies(): Observable<MovieModel[]> {
    console.log('requesting getFavoriteMovies');
    return timer(1500).pipe(
      map(() => this.getFavorites()),
      tap(() => console.log('requested getFavoriteMovies'))
    );
  }

  toggleFavorite(movie: MovieModel): Observable<boolean> {
    console.log('requesting toggleFavorite');
    return timer(1500).pipe(
      map(() => {
        console.log('requested toggleFavorite');
        if (this.getFavorites().find(f => f.id === movie.id)) {
          this.setFavorites(remove(this.getFavorites(), movie, 'id'));
          return false;
        } else {
          this.setFavorites(
            insert(
              this.getFavorites(),
              movie as MovieModel & { comment: string }
            )
          );
          return true;
        }
      })
    );
  }

  getFavorites(): (MovieModel & { comment: string })[] {
    if (typeof localStorage === 'undefined') return [];
    const movies = localStorage.getItem('my-movies');
    return movies ? JSON.parse(movies) : [];
  }

  setFavorites(movies: (MovieModel & { comment: string })[]) {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem('my-movies', JSON.stringify(movies));
  }
}
