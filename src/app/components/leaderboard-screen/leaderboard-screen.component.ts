import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { Player } from 'src/app/types';

@Component({
  selector: 'app-leaderboard-screen',
  templateUrl: './leaderboard-screen.component.html',
  styleUrls: ['./leaderboard-screen.component.scss'],
})
export class LeaderboardScreenComponent implements OnInit {
  players: Player[] = [];
  constructor(private playerService: PlayerService) {
    playerService.getPlayers().subscribe((res) => {
      this.players = res.sort((a, b)=>a.points<b.points ? 1 : -1);

    });
  }

  ngOnInit(): void {}
}
