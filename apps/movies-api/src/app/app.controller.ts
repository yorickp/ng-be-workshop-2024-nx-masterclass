import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { TMDBMovieCategory, TMDBMovieGenreModel, TMDBMovieModel } from '@ng-be-workshop/models';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getGenres(): TMDBMovieGenreModel[] {
    return this.appService.getGenres();
  }

  @Get()
  getMovieById(id: number) {
    return this.appService.getMovieById(id);
  }

  @Get()
  getMovies(category?: TMDBMovieCategory): TMDBMovieModel[] {
    return this.appService.getMovies(category);
  }
}
