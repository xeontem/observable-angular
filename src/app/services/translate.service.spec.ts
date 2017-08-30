import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { TranslateService } from './translate.service';

describe('TranslateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [TranslateService]
    });
  });

  it('should be created', inject([TranslateService], (service: TranslateService) => {
    expect(service).toBeTruthy();
  }));
});
