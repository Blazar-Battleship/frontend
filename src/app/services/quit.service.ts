import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../types';

@Injectable({
  providedIn: 'root'
})

export class QuitService {
  private baseUrl = 'https://localhost:7174/api/Games';


//   constructor(private http: HttpClient) {}

//   Players(players: any[]): Observable<any> {
//      return this.http.delete(this.baseUrl, players);
//   }
}
