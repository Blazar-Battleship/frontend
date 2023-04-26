import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../types';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private baseUrl = 'https://localhost:7174/api/Games';

  
  constructor(private http: HttpClient) {}

  sendPlayers(players: any[]): Observable<any> {
    return this.http.post(this.baseUrl, players);
  }


}
