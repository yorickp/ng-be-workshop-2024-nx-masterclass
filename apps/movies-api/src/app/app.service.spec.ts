import { Test } from '@nestjs/testing';
import { AppService } from './app.service';
import { MOVIES_DATA } from './static-data';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getMovies', () => {
    it('should return static data', () => {
      expect(service.getMovies()).toEqual(
        MOVIES_DATA.sort((a, b) => a.popularity - b.popularity)
      );
    });
  });
});
