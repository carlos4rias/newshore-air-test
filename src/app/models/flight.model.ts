export interface Flight {
  departureStation: string;
  arrivalStation:   string;
  flightCarrier:    FlightCarrier;
  flightNumber:     string;
  price:            number;
}

export type FlightCarrier = "CO" | "ES" | "MX";
