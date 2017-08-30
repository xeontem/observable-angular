import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { EventsService } from './events.service';

describe('EventsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule], 
      providers: [EventsService]
    });
  });

  it('should be created', inject([EventsService], (service: EventsService) => {
    expect(service).toBeTruthy();
  }));

  it('should receive events', inject([EventsService], (service: EventsService) => {
    service.getEvents().subscribe(events => {
      console.log(events);
      
      expect(events.length).toBeGreaterThan(0);
    })
  }));
});
