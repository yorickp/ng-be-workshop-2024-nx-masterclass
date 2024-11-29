import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { TMDBMovieCategory, TMDBMovieGenreModel, TMDBMovieModel } from '@nx-workshop/models';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/genre/list')
  getGenres(): TMDBMovieGenreModel[] {
    return this.appService.getGenres();
  }

  @Get('/movie/:id')
  getMovieById(@Param('id') id: number) {
    return this.appService.getMovieById(Number(id));
  }

  @Get('/movies/:category')
  getMovies(@Param('category') category?: TMDBMovieCategory): TMDBMovieModel[] {
    return this.appService.getMovies(category);
  }

  @Get('/discover/movie/:genre')
  getMoviesByGenre(@Param('genre') genre: TMDBMovieGenreModel['id']): TMDBMovieModel[] {
    return this.appService.getMoviesByGenre(Number(genre));
  }

  @Get('/search/movie')
  getMovieByQuery(@Query('query') query: string): TMDBMovieModel[] {
    return this.appService.getMovieByQuery(query);
  }
}
