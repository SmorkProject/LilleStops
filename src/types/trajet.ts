export interface TrajetInfo {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

export interface TrajetData {
  type: string;
  name: string;
  city: string;
  id: string;
}

export interface TrajetsDataMap {
  [trajetId: string]: TrajetData[];
}
