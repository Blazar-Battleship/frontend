import { Injectable } from '@angular/core';
import { AttackResult, GridCell } from '../types';
import { of , Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

function getRandomBoolean() {
  return Math.random() < 0.5;
}
@Injectable({
  providedIn: 'root',
})
export class GameService {
  private baseUrl = 'https://localhost:7174/api/Games';

  constructor(private http: HttpClient) {}


  getAttackResult(gridCell: GridCell): Observable<AttackResult> {
    return  of({
      isShipHit: getRandomBoolean(),
      isShipSunk: false,
      isGameFinished: {id:0, name: 'ali', points: 100,  coalitionId:0,coalition:"asd"},
    });
  }

  deleteGame(id: number): Observable<void> {
    const deleteUrl = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(deleteUrl);
  }


}
