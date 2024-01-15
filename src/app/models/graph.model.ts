export interface Node {
  destination: string;
  flightNumber: string;
}

export interface Graph {
  [key: string]: Node[];
};