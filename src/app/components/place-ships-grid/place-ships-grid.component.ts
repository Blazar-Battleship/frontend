import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GridCell } from 'src/app/types';

@Component({
  selector: 'app-place-ships-grid',
  templateUrl: './place-ships-grid.component.html',
  styleUrls: ['./place-ships-grid.component.scss']
})
export class PlaceShipsGridComponent implements OnInit, OnChanges{

  gridSize = 10;
  grid: GridCell[] = [];
  occupiedCells: undefined | GridCell[] = undefined;

  ngOnInit(): void {
    let arr: GridCell[] = [];
    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        arr.push({ coordinates: [j, i], status: undefined });
      }
    }
    this.grid = arr;
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

}
