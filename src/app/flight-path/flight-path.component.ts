import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-flight-path',
  templateUrl: './flight-path.component.html',
  styleUrls: ['./flight-path.component.css']
})
export class FlightPathComponent implements OnInit{

  origin?: string;
  destination?: string;
  equalCityError: boolean;
  
  constructor(private router: Router, private route: ActivatedRoute) {
    this.equalCityError = false;
    
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.origin = params['origin'];
      this.destination = params['destination'];
      console.log(params)
      if (this.origin && this.destination === this.origin) {
        this.equalCityError = true;
      }
    });
  }

  goToHome(): void {
    this.router.navigate(['']);
  }

}
