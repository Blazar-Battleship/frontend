import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { GridCell } from 'src/app/types';
import { Howl } from 'howler';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  @Input() enemy = false;
  @Output() finishTurn = new EventEmitter();

  gridSize = 10;
  grid: GridCell[] = [];
  selectedCell: undefined | GridCell = undefined;
  isGridDisabled = false;

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
        arr.push({ coordinates: [i, j], status: undefined });
      }
    }
    this.grid = arr;
  }

  getRandomBoolean() {
    return Math.random() < 0.1;
  }

  getShotResult() {
    let result = this.game.getAttackResult(this.selectedCell!);
    result.subscribe((res) => {
      this.selectedCell!.status = res.isShipHit;
      if ( res.isShipHit === true) {
        this.hitSound.play();
      } else {

        this.splashSound.play();
      }
    });
    this.isGridDisabled = true;
    console.log(this.selectedCell?.status);
  }

  handleTurnFinished() {
    this.finishTurn.emit();
    this.isGridDisabled = false;
    this.selectedCell = undefined;
  }
  test() {}
}
