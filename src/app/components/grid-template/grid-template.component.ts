import { Component, Input, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-grid-template',
  templateUrl: './grid-template.component.html',
  styleUrls: ['./grid-template.component.scss']
})
export class GridTemplateComponent implements OnInit{
  @Input() enemy = false;
  @Input() gridSize = 10;
  lettersRow: string[] = [];



  ngOnInit(): void {

    for (let i = 97; i < this.gridSize + 97; i++) {
      this.lettersRow.push(String.fromCharCode(i));
     }

  }
}
