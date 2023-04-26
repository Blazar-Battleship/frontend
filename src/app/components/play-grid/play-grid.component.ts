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
  @Input() enemy = true
  @Input() currentPlayer: Player| undefined = undefined;
  @Input() currentCoalition = "red";
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
        arr.push({ coordinates: {x:j, y:i}, status: undefined });
      }
    }
    this.grid = arr;
  }



  getShotResult() {
    let result = this.game.getAttackResult(this.currentPlayer!.name, this.selectedCell!,"blue",);
    result.subscribe((res) => {
      console.log(res)

    });
    this.game.getIsShipHit(this.selectedCell!, "blue").subscribe((res=>{
      this.selectedCell!.status = res;
      if ( res === true) {
        this.hitSound.play();
      } else {

        this.splashSound.play();
      }
    }))
    this.isGridDisabled = true;
    console.log(this.selectedCell?.status);
  }

  handleTurnFinished() {
    this.finishTurn.emit();
    this.isGridDisabled = false;
    this.selectedCell = undefined;
  }

}
