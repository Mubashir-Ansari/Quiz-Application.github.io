import { TestBed } from '@angular/core/testing';

import { QuizDatasetService } from './quiz-dataset.service';

describe('QuizDatasetService', () => {
  let service: QuizDatasetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizDatasetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
