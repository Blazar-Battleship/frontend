import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { GridCell } from 'src/app/types';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  @Input() enemy = false;
  @Output() finishTurn = new EventEmitter()

  gridSize = 10;
  grid: GridCell[] = [];
  selectedCell: undefined | GridCell = undefined;
  lettersRow: string[] = [];
  isGridDisabled = false;

  constructor(private game: GameService) {}

  ngOnInit(): void {
    let arr: GridCell[] = [];
    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        arr.push({ coordinates: [i, j], status: undefined });
      }
    }
    this.grid = arr;



    for (let i = 97; i < this.gridSize + 97; i++) {
     this.lettersRow.push(String.fromCharCode(i));
    }
  }

  getRandomBoolean() {
    return Math.random() < 0.1;
  }

  getShotResult() {
    let result = this.game.getAttackResult(this.selectedCell!);
    this.selectedCell!.status = result.isShipHit;
    this.isGridDisabled = true
    console.log(this.selectedCell?.status);
  }


  handleTurnFinished(){
    this.finishTurn.emit()
    this.isGridDisabled=false
    this.selectedCell = undefined
  }
  test() {}
}
