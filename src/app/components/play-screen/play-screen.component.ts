import { Component, OnInit } from '@angular/core';
import { Navigation, Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { PlayerService } from 'src/app/services/player.service';
import { Coalition, Player } from 'src/app/types';

@Component({
  selector: 'app-play-screen',
  templateUrl: './play-screen.component.html',
  styleUrls: ['./play-screen.component.scss'],
})
export class PlayScreenComponent implements OnInit {
  coalitions: Coalition[] = [];
  currentPlayer: Player = { id: 0, name: '0', points: 0 };
  currentCoalition: string = '';
  players: Player[] = [];
  playersLeaderboard: Player[] = [];

  turnNumber = 1;
  isNextPlayerOpen = false;
  gridSize = 10;
  leaderboardOpen = false;

  constructor(
    private gameService: GameService,
    private router: Router,
    private playerService: PlayerService
  ) {
    let nav: Navigation = this.router.getCurrentNavigation()!;
    if (nav.extras && nav.extras.state) {
      this.players = nav.extras.state['players'] as Player[];
      this.gridSize = this.players.length * 5;
    }
  }

  ngOnInit(): void {
    this.currentPlayer = this.players[0];
    this.gameService.getGame().subscribe((res) => {
      this.coalitions = res.coalitions!;
      console.log(this.coalitions.map((c) => c.name.trim()));
      this.currentCoalition = this.coalitions
        .find((coalition) =>
          Boolean(
            coalition.players.find(
              (p) => p.name.trim() == this.currentPlayer.name
            )
          )
        )!
        .name.trim();

      console.log(this.currentCoalition);
    });
  }

  handleFinishTurn() {
    let currentPlayerIndex = this.players.findIndex(
      (p) => p === this.currentPlayer
    );
    if (currentPlayerIndex + 1 === this.players.length) {
      this.currentPlayer = this.players[0];
      this.turnNumber++;
    } else {
      this.currentPlayer = this.players[++currentPlayerIndex];
    }
    this.isNextPlayerOpen = true;
    console.log(this.coalitions);
    this.currentCoalition = this.coalitions
      .find((coalition) =>
        Boolean(
          coalition.players.find(
            (p) => p.name.trim() == this.currentPlayer.name
          )
        )
      )!
      .name.trim();
    console.log(this.currentCoalition);
  }

  closeNextPlayer() {
    this.isNextPlayerOpen = false;
  }

  openLeaderboard() {
    this.playerService.getPlayers().subscribe((res) => {
      this.playersLeaderboard = res.sort((a, b) => (a.points < b.points ? 1 : -1));
      this.leaderboardOpen = true;
    });
  }
  closeLeaderboard() {
    this.leaderboardOpen = false;
  }
}
