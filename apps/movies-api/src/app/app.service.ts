import { Injectable } from '@nestjs/common';
import { Movie } from '@ng-be-workshop/models';
import { STATIC_DATA } from './static-data';

@Injectable()
export class AppService {
  getMovies(): Movie[] {
    return STATIC_DATA;
  }

  getMovie(id: string): Movie {
    return STATIC_DATA.find((movie) => movie.id === id);
  }
}
