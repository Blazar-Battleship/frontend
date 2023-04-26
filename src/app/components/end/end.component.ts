import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})

export class EndComponent implements OnInit {
  leaderboard!: any[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('https://localhost:7174/api/Games')
      .subscribe(data => {
        return this.leaderboard; //
      });
  }
}

