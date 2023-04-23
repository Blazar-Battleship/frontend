import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-grid-cell',
  templateUrl: './grid-cell.component.html',
  styleUrls: ['./grid-cell.component.scss']
})
export class GridCellComponent {
  @Input ()  hasBeenShot: boolean = false
  @Input ()  enemy: boolean = false
}
