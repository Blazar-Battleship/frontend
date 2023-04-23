import { Injectable } from '@angular/core';
import { AttackResult, GridCell } from '../types';
import { of , Observable} from 'rxjs';
function getRandomBoolean() {
  return Math.random() < 0.5;
}
@Injectable({
  providedIn: 'root',
})
export class GameService {


  constructor() {}


  getAttackResult(gridCell: GridCell): Observable<AttackResult> {
    return  of({
      isShipHit: getRandomBoolean(),
      isShipSunk: false,
      isGameFinished: {id:0, name: 'ali', points: 100,  coalitionId:0,coalition:"asd"},
    });
  }
}
