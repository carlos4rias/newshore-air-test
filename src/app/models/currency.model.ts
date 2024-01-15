export interface Currency {
  result:             string;
  provider:           string;
  documentation:      string;
  termsOfUse:         string;
  timeLastUpdateUnix: number;
  timeLastUpdateUTC:  string;
  timeNextUpdateUnix: number;
  timeNextUpdateUTC:  string;
  timeEOLUnix:        number;
  baseCode:           string;
  rates:              { [key: string]: number };
}