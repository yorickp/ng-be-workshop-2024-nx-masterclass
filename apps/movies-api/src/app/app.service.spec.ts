import { Test } from '@nestjs/testing';
import { AppService } from './app.service';
import { STATIC_DATA } from './static-data';

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
      expect(service.getMovies()).toEqual(STATIC_DATA);
    });
  });
});
