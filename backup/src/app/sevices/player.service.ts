import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private baseUrl = 'http://localhost:3000/players';

  constructor(private http: HttpClient) { }

  sendPlayers(players: any[]): Observable<any> {
    const url = `${this.baseUrl}/players`;
    return this.http.post<any>(url, players);
  }
}

