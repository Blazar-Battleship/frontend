export type GridCell = {
  coordinates: [x: number, y: number];
  status: undefined | boolean;
};
export type AttackResult = {
  isShipHit: boolean;
  isShipSunk: boolean;
  isGameFinished: Player;
};

export type Player = {
  id: number
  name: string
  points: number
  coalitionId: number
  coalition: any
};


export interface Coalition {
  id: number
  name: any
  gameId: number
  game: any
  grids: any[]
  players: Player[]
}

export interface Game {
  id: number
  coalitions: Coalition[]
}


