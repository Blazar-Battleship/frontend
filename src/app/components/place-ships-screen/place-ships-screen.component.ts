import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import interact from 'interactjs';
import { Coalition, Player, ShipSlice, Ship } from 'src/app/types';
import { InteractEvent } from '@interactjs/types';
import { InteractEvent as InteractEventValue } from '@interactjs/core/InteractEvent';
@Component({
  selector: 'app-place-ships-screen',
  templateUrl: './place-ships-screen.component.html',
  styleUrls: ['./place-ships-screen.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlaceShipsScreenComponent implements AfterViewInit {
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
      name: 'blue',
      gameId: 0,
      game: 'any',
      grids: [],
      players: [this.players[0], this.players[2]],
    },
    {
      id: 1,
      name: 'red',
      gameId: 0,
      game: 'any',
      grids: [],
      players: [this.players[1], this.players[3]],
    },
  ];

  ships = [Array(6), Array(5), Array(4), Array(4), Array(3)];
  shipPositions: Ship[] = Array(5);
  selectedShip: undefined | any[];
  currentCoalition: Coalition = this.coalitions[0];
  currentPlayer: Player = this.players[0];
  isNextPlayerOpen = false;
  ngAfterViewInit(): void {
    console.log(this.shipPositions[2])
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
              };
              shipArray.push(coordsObj);
              cell.classList.add('occupied');
            });
            thisClass.shipPositions[Number(target.id)] = {
              id: Number(target.id),
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
        };
        shipArray.push(coordsObj);
        cell.classList.add('occupied');
      });
      this.shipPositions[Number(selectedShipElement.id)] = {
        id: Number(selectedShipElement.id),
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

  isShipPositionsFull(): boolean{
    for (let index = 0; index < this.shipPositions.length; index++) {
      const element = this.shipPositions[index];
      if(element == undefined) {
        return false
      }
    }
    return true
  }
}
