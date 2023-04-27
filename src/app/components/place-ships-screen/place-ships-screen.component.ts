import {
  AfterViewInit,
  Component,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import interact from 'interactjs';
import { Coalition, Player, ShipSlice, Ship } from 'src/app/types';
import { InteractEvent } from '@interactjs/types';
import { GameService } from 'src/app/services/game.service';
import { PlayerService } from 'src/app/services/player.service';
import { Navigation, Router } from '@angular/router';
@Component({
  selector: 'app-place-ships-screen',
  templateUrl: './place-ships-screen.component.html',
  styleUrls: ['./place-ships-screen.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlaceShipsScreenComponent implements AfterViewInit, OnInit {
  players: Player[] = [];
  coalitions: Coalition[] = [];
  ships = [Array(5), Array(4), Array(3), Array(2), Array(1)];
  shipPositions: Ship[] = Array(this.ships.length);
  selectedShip: undefined | any[];
  currentPlayer: Player = { id: 0, name: '0', points: 0 };
  currentCoalition: string = 'red';
  isNextPlayerOpen = false;
  isStartGameOpen = false;
  redCoalitionShips: Ship[] = [];
  blueCoalitionShips: Ship[] = [];

  constructor(
    private gameService: GameService,
    private playerService: PlayerService,
    private router: Router
  ) {
    let nav: Navigation = this.router.getCurrentNavigation()!;
    if (nav.extras && nav.extras.state) {
      this.players = nav.extras.state['players'] as Player[];
      this.coalitions = nav.extras.state['game'].coalitions;
    }
    this.currentPlayer = this.players[0];
    this.currentCoalition = this.coalitions.find((coalition) =>
      Boolean(coalition.players.find((p) => p.name == this.currentPlayer.name))
    )!.name;

    console.log('currentCoalition', this.currentCoalition);
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    console.log(this.shipPositions[2]);
    this.makeShipsDraggable();
  }

  makeShipsDraggable() {
    const cells: NodeListOf<HTMLDivElement> = document.querySelectorAll(
      '.place-ships-grid-cell'
    );
    const thisClass = this;
    let initialCells: HTMLDivElement[] = [];
    interact('.ship').draggable({
      listeners: {
        start(event: InteractEvent) {
          const target: HTMLDivElement = event.currentTarget as HTMLDivElement;
          initialCells = thisClass.selectInitialCells(cells, target);
        },
        move(event: InteractEvent) {
          const target: HTMLDivElement = event.currentTarget as HTMLDivElement;
          thisClass.translateOnMove(event, target);
          // check if the element is over a grid cell
          thisClass.selectCellsOnHover(cells, target);
          const selectedCells: NodeListOf<HTMLDivElement> =
            document.querySelectorAll('.place-ships-grid-cell.selected');
          if (
            Array.from(selectedCells).some((c) =>
              c.classList.contains('occupied')
            )
          ) {
            target.classList.add('ship-error');
          } else {
            target.classList.remove('ship-error');
          }
        },
        end(event: InteractEvent) {
          const target = event.target;
          target.classList.remove('ship-error');

          const shipLength = Number(target.dataset['shipLength']);
          const selectedCells: NodeListOf<HTMLDivElement> =
            document.querySelectorAll('.place-ships-grid-cell.selected');
          const areCellsFree = Array.from(selectedCells).every(
            (cell) => !cell.classList.contains('occupied')
          );
          if (selectedCells.length === shipLength && areCellsFree) {
            let firstCell = selectedCells[0];
            target.style.transform = 'translate(' + -1 + 'px, ' + -1 + 'px)';
            target.setAttribute('data-x', '0');
            target.setAttribute('data-y', '0');
            target.style.position = 'absolute';

            target.remove();
            firstCell.append(target);
            let shipArray: ShipSlice[] = [];
            selectedCells.forEach((cell) => {
              let coordsArray = cell.dataset['coords']
                ?.split(',')
                .map((c) => Number(c))!;
              let coordsObj: ShipSlice = {
                id: 0,
                x: coordsArray[0],
                y: coordsArray[1],
                team: thisClass.currentCoalition,
              };
              shipArray.push(coordsObj);
              cell.classList.add('occupied');
            });
            thisClass.shipPositions[Number(target.id)] = {
              shipSlices: shipArray,
            };
          } else {
            target.style.transform = 'translate(' + -1 + 'px, ' + -1 + 'px)';
            initialCells.forEach((cell) => {
              cell.classList.add('occupied');
            });
          }
          selectedCells.forEach((cell) => {
            cell.classList.remove('selected');
          });
          target.setAttribute('data-x', '0');
          target.setAttribute('data-y', '0');
        },
      },
    });
  }

  rotateShip() {
    let selectedShipElement: HTMLDivElement =
      document.querySelector('.ship-selected')!;
    let direction = selectedShipElement.style.flexDirection;
    const cells: NodeListOf<HTMLDivElement> = document.querySelectorAll(
      '.place-ships-grid-cell'
    );
    let initialCells = this.selectInitialCells(cells, selectedShipElement);
    if (direction === 'column' || direction === '') {
      selectedShipElement.style.flexDirection = 'row';
    } else {
      selectedShipElement.style.flexDirection = 'column';
    }

    this.selectCellsOnHover(cells, selectedShipElement);

    const shipLength = Number(selectedShipElement.dataset['shipLength']);
    const selectedCells: NodeListOf<HTMLDivElement> = document.querySelectorAll(
      '.place-ships-grid-cell.selected'
    );

    const areCellsFree = Array.from(selectedCells).every(
      (cell) => !cell.classList.contains('occupied')
    );
    if (selectedCells.length === shipLength && areCellsFree) {
      let shipArray: ShipSlice[] = [];
      selectedCells.forEach((cell) => {
        let coordsArray = cell.dataset['coords']
          ?.split(',')
          .map((c) => Number(c))!;
        let coordsObj: ShipSlice = {
          id: 0,
          x: coordsArray[0],
          y: coordsArray[1],
          team: this.currentCoalition,
        };
        shipArray.push(coordsObj);
        cell.classList.add('occupied');
      });
      this.shipPositions[Number(selectedShipElement.id)] = {
        shipSlices: shipArray,
      };
    } else {
      selectedShipElement.style.flexDirection = direction;
      initialCells.forEach((cell) => {
        cell.classList.add('occupied');
      });
    }
    selectedCells.forEach((cell) => {
      cell.classList.remove('selected');
    });
  }

  selectCellsOnHover(cells: NodeListOf<HTMLDivElement>, ship: HTMLDivElement) {
    cells.forEach((cell) => {
      const cellCoords = cell.getBoundingClientRect();
      const shipCoords = ship.getBoundingClientRect();
      const cellWidth = cell.offsetWidth;
      if (
        cellCoords.left + cellWidth / 2 >= shipCoords.left &&
        cellCoords.right - cellWidth / 2 + 2 <= shipCoords.right &&
        cellCoords.top + cellWidth / 2 >= shipCoords.top &&
        cellCoords.bottom - cellWidth / 2 + 1 <= shipCoords.bottom
      ) {
        cell.classList.add('selected');
      } else {
        cell.classList.remove('selected');
      }
    });
  }

  selectInitialCells(
    cells: NodeListOf<HTMLDivElement>,
    ship: HTMLDivElement
  ): HTMLDivElement[] {
    let cellsArr: HTMLDivElement[] = [];
    cells.forEach((cell) => {
      const cellCoords = cell.getBoundingClientRect();
      const shipCoords = ship.getBoundingClientRect();
      const cellWidth = cell.offsetWidth;
      if (
        cellCoords.left + cellWidth / 2 >= shipCoords.left &&
        cellCoords.right - cellWidth / 2 + 2 <= shipCoords.right &&
        cellCoords.top + cellWidth / 2 >= shipCoords.top &&
        cellCoords.bottom - cellWidth / 2 + 1 <= shipCoords.bottom
      ) {
        cell.classList.remove('occupied');
        cellsArr.push(cell);
      }
    });
    return cellsArr;
  }

  translateOnMove(event: InteractEvent, target: HTMLDivElement) {
    const x =
      (parseFloat(target.getAttribute('data-x' as string)!) || 0) + event.dx;
    const y =
      (parseFloat(target.getAttribute('data-y' as string)!) || 0) + event.dy;
    // translate the element
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    target.setAttribute('data-x', x.toString());
    target.setAttribute('data-y', y.toString());
  }

  handleClearAll() {
    this.shipPositions = Array(this.ships.length);

    const shipsContainer = document.querySelector('.ships-container');
    const ships: NodeListOf<HTMLDivElement> =
      document.querySelectorAll('.ship');
    ships.forEach((ship) => {
      ship.style.cssText = '';
      ship.remove();
      shipsContainer?.append(ship);
    });
    const cells: NodeListOf<HTMLDivElement> = document.querySelectorAll(
      '.place-ships-grid-cell'
    );
    cells.forEach((cell) => {
      cell.classList.remove('occupied');
    });
  }

  isShipPositionsFull(): boolean {
    for (let index = 0; index < this.shipPositions.length; index++) {
      const element = this.shipPositions[index];
      if (element == undefined) {
        return false;
      }
    }
    return true;
  }

  closeNextPlayer() {
    this.isNextPlayerOpen = false;
  }

  handleFinishTurn() {
    if (this.currentCoalition == 'red') {
      this.redCoalitionShips.push(...this.shipPositions);
    } else {
      this.blueCoalitionShips.push(...this.shipPositions);
    }

    console.log('blueCoalitionShips', this.blueCoalitionShips);
    console.log('redCoalitionShips', this.redCoalitionShips);
    this.handleClearAll();
    let currentPlayerIndex = this.players.findIndex(
      (p) => p === this.currentPlayer
    );

    if (currentPlayerIndex + 1 === this.players.length) {
      this.isStartGameOpen = true;
    } else {
      this.currentPlayer = this.players[++currentPlayerIndex];
      this.currentCoalition = this.coalitions.find((coalition) =>
        Boolean(
          coalition.players.find((p) => p.name == this.currentPlayer.name)
        )
      )!.name;
      console.log(this.currentCoalition);
      this.isNextPlayerOpen = true;
    }
  }

  handleStartGame() {
    this.gameService.sendBlueShips(this.blueCoalitionShips).subscribe(res=>console.log(res));
    this.gameService.sendRedShips(this.redCoalitionShips).subscribe(res=>console.log(res));

    this.router.navigate(['/play'], { state: { players: this.players } });
  }
}
