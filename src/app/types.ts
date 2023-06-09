export interface GridCell {
  coordinates: {x: number, y: number;}
  status: undefined | boolean;
}
export interface AttackResult {
  isShipHit: boolean;
  isShipSunk: boolean;
  isGameFinished: Player;
}

export interface Player {
  id: number;
  name: string;
  points: number;
  coalitionId?: number;
  coalition?: string;
}

export interface Coalition {
  id?: number;
  name: string;
  gameId?: number;
  game?: any;
  grids?: any[];
  players: Player[];
}

export interface Game {
  id?: number;
  coalitions: Coalition[];
}
export interface ShipSlice {
  id: number;
  x: number;
  y: number;
  team?: string;
}
export interface Ship {
  shipSlices: ShipSlice[];
}
