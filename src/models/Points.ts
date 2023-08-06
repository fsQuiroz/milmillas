export type Points = { [key: string]: Point };

export type Point = {
  fullTrip: number;
  traveled: number;
  tk: number;
  securities: number;
  fullSecurities: number;
  noOverSpeed: number;
  blocked: number;
  overTime: number;
  extraMile: number;
};