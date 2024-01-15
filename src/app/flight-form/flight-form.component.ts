import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.css']
})
export class FlightFormComponent {

  searchFlightForm: FormGroup;

  constructor(private router: Router, private form: FormBuilder) {
    this.searchFlightForm = this.form.group({
      origin: ['', [Validators.required, Validators.pattern]],
      destination: ['', [Validators.required, Validators.pattern]]
    });

    const originControl = this.searchFlightForm.get('origin');
    originControl?.valueChanges.subscribe(() => {
      originControl?.patchValue(originControl.value.toUpperCase(), {emitEvent: false})
    })

    const destinationControl = this.searchFlightForm.get('destination');
    destinationControl?.valueChanges.subscribe(() => {
      destinationControl?.patchValue(destinationControl.value.toUpperCase(), {emitEvent: false})
    })
  }

  searchFlight() {
    if (this.searchFlightForm.status === 'INVALID')
      return;
      const originControl = this.searchFlightForm.get('origin');
      const destinationControl = this.searchFlightForm.get('destination');
    console.log(`${this.searchFlightForm.status} and redirecting`);
    this.router.navigate(['/flight-path'],
    {queryParams: {
      origin: originControl?.value,
      destination: destinationControl?.value
    }});
  }

  formHasErrors(controlId: string) {
    return (this.searchFlightForm.get(controlId)?.hasError('required') || 
      this.searchFlightForm.get(controlId)?.hasError('pattern')) &&
      this.searchFlightForm.get(controlId)?.touched;
  }
}
