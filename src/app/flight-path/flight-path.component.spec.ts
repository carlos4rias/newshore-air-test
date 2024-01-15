import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightPathComponent } from './flight-path.component';

describe('FlightPathComponent', () => {
  let component: FlightPathComponent;
  let fixture: ComponentFixture<FlightPathComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlightPathComponent]
    });
    fixture = TestBed.createComponent(FlightPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
