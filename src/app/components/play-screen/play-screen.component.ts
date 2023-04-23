import { Component, OnInit } from '@angular/core';
import { Coalition, Player } from 'src/app/types';

@Component({
  selector: 'app-play-screen',
  templateUrl: './play-screen.component.html',
  styleUrls: ['./play-screen.component.scss'],
})
export class PlayScreenComponent implements OnInit {
  players: Player[] = [
    {
      id: 0,
      name: 'Ali',
      points: 0,
      coalitionId: 0,
      coalition: undefined,
    },
    {
      id: 1,
      name: 'Miguel',
      points: 0,
      coalitionId: 1,
      coalition: undefined,
    },
    {
      id: 2,
      name: 'Ilaria',
      points: 0,
      coalitionId: 0,
      coalition: undefined,
    },
    {
      id: 3,
      name: 'Giulia',
      points: 0,
      coalitionId: 1,
      coalition: undefined,
    },
  ];

  coalitions: Coalition[] = [
    {
      id: 0,
      name: 'any',
      gameId: 0,
      game: 'any',
      grids: [],
      players: this.players,
    },
    {
      id: 1,
      name: 'any',
      gameId: 0,
      game: 'any',
      grids: [],
      players: this.players,
    },
  ];
  currentCoalition:Coalition = this.coalitions[0];
  currentPlayer:Player  = this.players[0]
  turnNumber = 1;
  isNextPlayerOpen = false;

  ngOnInit(): void {
    this.players.forEach((player)=>{
      player.coalition = this.coalitions[player.coalitionId]
    })
  }

  handleFinishTurn() {
    let currentPlayerIndex = this.players.findIndex(p=> p === this.currentPlayer)
    if (currentPlayerIndex + 1 === this.players.length) {
      this.currentPlayer = this.players[0];
      this.turnNumber++;
    } else {
      this.currentPlayer = this.players[++currentPlayerIndex];
    }
    this.currentCoalition = this.currentPlayer.coalition
    console.log(this.currentCoalition)
    this.isNextPlayerOpen = true;
  }

  closeNextPlayer() {
    this.isNextPlayerOpen = false;
  }
}
