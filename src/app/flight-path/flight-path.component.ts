import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightsService } from '../services/flights-service';
import { Flight } from '../models/flight.model';
import { Path } from '../models/path.model';

@Component({
  selector: 'app-flight-path',
  templateUrl: './flight-path.component.html',
  styleUrls: ['./flight-path.component.css']
})
export class FlightPathComponent implements OnInit{

  origin: string = 'PEI';
  destination: string = 'MZL';
  maxFlights?: number;
  equalCityError: boolean;
  availableFlights: Flight[] = [];
  flightPath: Path = {
    journey: {
      origin: '',
      destination: '',
      price: 0,
      flights: []
    }
  };

  loading: boolean = false;


  flightsService = inject(FlightsService)
  
  constructor(private router: Router, private route: ActivatedRoute) {
    this.equalCityError = false;
    
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.origin = params['origin'];
      this.destination = params['destination'];
      if (this.origin && this.destination === this.origin) {
        this.equalCityError = true;
      } else {
        this.loading = true;
        this.maxFlights = params['maxFlights'];
        this.flightsService.getFlights().subscribe({
          next: (data: Flight[]) => {
            this.availableFlights = data;
            this.flightPath = this.flightsService.buildPath(this.availableFlights, this.maxFlights, this.origin, this.destination);
            this.loading = false;
          },
          error: (error) => {
            console.log(error);
            this.loading = false;
          }
        });
      }



    });
  }

  goToHome(): void {
    this.router.navigate(['']);
  }

}
