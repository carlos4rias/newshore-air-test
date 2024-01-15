import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from '../models/flight.model';
import { Path } from '../models/path.model';
import { Graph } from '../models/graph.model';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  private baseURL = 'https://recruiting-api.newshore.es/api/flights/';
  apiLevel: number = 2;

  constructor(private httpClient: HttpClient) { }

  public getFlights(): Observable<Flight[]>{
    return this.httpClient.get<Flight[]>(`${this.baseURL}${this.apiLevel}`);
  }

  public buildPath(flights: Flight[], maxFlights: number = 0, origin: string, destination: string): Path {
    type NodeType = {name: string}
    const nodes = [];

    const cities:string[] = [... (new Set(
      [...flights.map(flight => flight.arrivalStation), ...flights.map(flight => flight.departureStation)]
    ))];

    let graph:Graph = {};

    for (let city of cities) {
      for (let idx = 0; idx < flights.length; idx += 1) {
        const {departureStation, arrivalStation, flightNumber} = flights[idx];
        if (departureStation === city) {
          if (!graph.hasOwnProperty(city))
            graph[city] = [];
          graph[city].push({destination: arrivalStation, flightNumber});
        }
      }
    }

    const path = this.findPath(graph, maxFlights, origin, destination);
    console.log(graph)
    return this.pathReconstruction(flights, path, origin, destination);
  }

  public pathReconstruction(flights: Flight[], flightNumbers: string[], origin: string, destination: string): Path {
    const finalPath: Path = {
      journey: {
        origin,
        destination,
        price: 0,
        flights: []
      }
    };

    if (flightNumbers.length === 0) return finalPath;

    let currentPrice = 0;
    
    for (let idx = 0; idx < flightNumbers.length; idx += 1) {
      const [flight] = flights.filter(fl => fl.flightNumber === flightNumbers[idx]);
      finalPath.journey.flights.push({
        origin: flight.departureStation,
        destination: flight.arrivalStation,
        price: flight.price,
        transport: {
          flightCarrier: flight.flightCarrier,
          flightNumber: flight.flightNumber,
        }
      });
      currentPrice += flight.price;
    }

    finalPath.journey.price = currentPrice;

    return finalPath;
  }

  public findPath(graph: Graph, maxFlights: number, origin: string, destination: string): string[] {

    interface State {
      node: string;
      flights: string[];
    }

    let visited: Set<string> = new Set(origin);
    let states: State[] = [{node: origin, flights: []}];


    while (states.length > 0) {
      const curState = states.shift();
      if (!curState?.flights) break;
      if (!graph[curState.node]) break;
      if (curState.node === destination) return curState.flights
      if (Number(maxFlights) !== 0 && curState?.flights?.length > maxFlights) break;
      visited.add(curState.node);

      for (let nextNode of graph[curState.node]) {
        if (visited.has(nextNode.destination)) continue;
        states.push({node: nextNode.destination, flights: [...curState.flights, nextNode.flightNumber]});
      }
    }
    return [];
  }

}
