import { TestBed } from '@angular/core/testing';

import { MoviesRecommenderService } from './movies-recommender.service';

describe('MoviesRecommenderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MoviesRecommenderService = TestBed.get(MoviesRecommenderService);
    expect(service).toBeTruthy();
  });
});
