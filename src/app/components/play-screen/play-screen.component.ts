import { Component, OnInit } from '@angular/core';
import { Navigation, Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { Coalition, Player } from 'src/app/types';

@Component({
  selector: 'app-play-screen',
  templateUrl: './play-screen.component.html',
  styleUrls: ['./play-screen.component.scss'],
})
export class PlayScreenComponent implements OnInit {
  coalitions: Coalition[] = [];
  currentPlayer: Player = { id: 0, name: '0', points: 0 };
  currentCoalition: string = 'red';
  players: Player[] = [];
  turnNumber = 1;
  isNextPlayerOpen = false;

  constructor(private gameService: GameService, private router: Router) {
    let nav: Navigation = this.router.getCurrentNavigation()!;
    if (nav.extras && nav.extras.state) {
      this.players = nav.extras.state['players'] as Player[];
    }
  }

  ngOnInit(): void {
    this.currentPlayer = this.players[0];

    this.gameService.getGame().subscribe((res) => {
      this.coalitions = res.coalitions!;
      this.currentCoalition = this.coalitions
        .find((coalition) =>
          Boolean(
            coalition.players.find(
              (p) => p.name.trim() == this.currentPlayer.name
            )
          )
        )!
        .name.trim();
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
    this.currentCoalition = this.coalitions
      .find((coalition) =>
        Boolean(
          coalition.players.find((p) => p.name == this.currentPlayer.name)
        )
      )!
      .name.trim();
  }

  closeNextPlayer() {
    this.isNextPlayerOpen = false;
  }
}
