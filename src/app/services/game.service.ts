import { Injectable } from '@angular/core';
import { AttackResult, Game, GridCell, Ship } from '../types';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
function getRandomBoolean() {
  return Math.random() < 0.5;
}
@Injectable({
  providedIn: 'root',
})
export class GameService {
  baseUrl = 'https://localhost:7174/api/';

  constructor(private http: HttpClient) {}

  sendBlueShips(blueShips: Ship[]) {
    const url = this.baseUrl + 'Grids/blu';
    return this.http.post(url, blueShips);
  }

  sendRedShips(redShips: Ship[]) {
    const url = this.baseUrl + 'Grids/rossa';
    return this.http.post(url, redShips);
  }

  getGame() {
    return this.http.get<Game>(this.baseUrl + 'Games');
  }

  getAttackResult(
    player: string,
    gridcell: GridCell,
    team: string
  ): Observable<any> {
    const url = this.baseUrl + 'Grids/' + player + '/' + team;

    return this.http.post(url, gridcell.coordinates);
  }

  getIsShipHit(
    gridcell: GridCell,
    team: string
  ): Observable<any> {
    const url = this.baseUrl + 'Grids/' + team;

    return this.http.post(url, gridcell.coordinates);
  }
}
