import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getMovies() {
    return this.appService.getMovies();
  }

  @Get()
  getMovie(id: string) {
    return this.appService.getMovie(id);
  }
}
