import { FlightCarrier } from "./flight.model";

export interface Path {
  journey: {
    origin: string;
    destination: string;
    price: number;
    flights: Flight[];
  }
}

interface Flight {
  origin: string;
  destination: string;
  price: number;
  transport: Transport;
}

interface Transport {
  flightCarrier:    FlightCarrier;
  flightNumber:     string;
}