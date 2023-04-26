import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private baseUrl = 'https://localhost:7174/api/Games';
  game = [
    {
      "id": 0,
      "name": "string",
      "points": 0
    },{
      "id": 0,
      "name": "string",
      "points": 0
    },{
      "id": 0,
      "name": "string",
      "points": 0
    }
  ]
  
  constructor(private http: HttpClient) {}

  sendPlayers(players: any[]): Observable<any> {
    return this.http.post(this.baseUrl, players);
  }
}
