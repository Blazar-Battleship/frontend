import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { GridCell, Player } from 'src/app/types';
import { Howl } from 'howler';

@Component({
  selector: 'app-play-grid',
  templateUrl: './play-grid.component.html',
  styleUrls: ['./play-grid.component.scss'],
})
export class PlayGridComponent implements OnInit {
  @Input() enemy = true;
  @Input() gridSize = 10;
  @Input() currentPlayer: Player | undefined = undefined;
  @Input() currentCoalition = 'red';
  @Output() finishTurn = new EventEmitter();

  grid: GridCell[] = [];
  selectedCell: undefined | GridCell = undefined;
  isGridDisabled = false;
  isGameFinished = false;
  winner : string | undefined

  // sound
  hitSound = new Howl({
    src: '../../assets/ship-hit.mp3',
  });
  splashSound = new Howl({
    src: '../../assets/splash.mp3',
  });

  constructor(private game: GameService) {}

  ngOnInit(): void {
    let arr: GridCell[] = [];
    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        arr.push({ coordinates: { x: j, y: i }, status: undefined });
      }
    }
    this.grid = arr;
  }

  getShotResult() {
    let enemy;
    enemy = this.currentCoalition === 'red' ? 'blue' : 'red';
    let result = this.game.getAttackResult(
      this.currentPlayer!.name,
      this.selectedCell!,
      enemy
    );
    result.subscribe((res) => {
      console.log(res);
      this.selectedCell!.status = res.colpita;
      if (res.colpita === true) {
        this.hitSound.play();
      } else {
        this.splashSound.play();
      }

      if (res.finita) {
        this.winner = res.player.name
        this.isGameFinished = true;
      }
    });

    this.isGridDisabled = true;
    console.log(this.selectedCell?.status);
  }

  handleTurnFinished() {
    if(!this.isGameFinished){

      this.finishTurn.emit();
      this.isGridDisabled = false;
      this.selectedCell = undefined;
    }
  }
}
