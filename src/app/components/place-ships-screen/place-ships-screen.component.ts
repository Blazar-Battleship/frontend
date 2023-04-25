import { AfterViewInit, Component, OnInit } from '@angular/core';
import interact from 'interactjs';
import { Coalition, Player } from 'src/app/types';
import { InteractEvent } from '@interactjs/types';
import { InteractEvent as InteractEventValue } from '@interactjs/core/InteractEvent';
@Component({
  selector: 'app-place-ships-screen',
  templateUrl: './place-ships-screen.component.html',
  styleUrls: ['./place-ships-screen.component.scss'],
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

  ships = [Array(6), Array(5), Array(4), Array(4), Array(3)];
  shipPositions = Array(5);
  selectedShip: undefined | any[];
  currentCoalition: Coalition = this.coalitions[0];
  currentPlayer: Player = this.players[0];
  turnNumber = 1;
  isNextPlayerOpen = false;
  currentShip: HTMLElement | undefined;

  rotateShip() {
    let selectedShipElement: HTMLDivElement =
      document.querySelector('.ship-selected')!;
    let direction = selectedShipElement.style.flexDirection;

    if (direction === 'column' || direction === '') {
      selectedShipElement.style.flexDirection = 'row';
    } else {
      selectedShipElement.style.flexDirection = 'column';
    }

    const cells: NodeListOf<HTMLDivElement> = document.querySelectorAll(
      '.place-ships-grid-cell'
    );
    cells.forEach((cell) => {
      const cellCoords = cell.getBoundingClientRect();
      const shipCoords = selectedShipElement.getBoundingClientRect();
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
    const target = selectedShipElement;
    const shipLength = Number(target.dataset['shipLength']);
    const selectedCells: NodeListOf<HTMLDivElement> = document.querySelectorAll(
      '.place-ships-grid-cell.selected'
    );
    if (selectedCells.length === shipLength) {
      let minX = Math.min(
        ...Array.from(selectedCells).map(
          (cell) => cell.getBoundingClientRect().left
        )
      );
      let minY = Math.min(
        ...Array.from(selectedCells).map(
          (cell) => cell.getBoundingClientRect().top
        )
      );
      target.style.position = 'absolute';
      target.style.left = minX + 'px';
      target.style.top = minY + 'px';
      target.style.transform = 'translate(' + 0 + 'px, ' + 0 + 'px)';

      let occupiedCells: number[] = [];
      selectedCells.forEach((cell) => {
        let occupiedIndex = Array.from(cells).findIndex((c) => c === cell);
        occupiedCells.push(occupiedIndex);

        cell.classList.add('occupied');
      });
      this.shipPositions[Number(target.id)] = occupiedCells;
      console.log(this.shipPositions);
    } else {
      selectedShipElement.style.flexDirection = direction;
    }
    selectedCells.forEach((cell) => {
      cell.classList.remove('selected');
    });
    console.log(this.shipPositions);
  }
  ngAfterViewInit(): void {
    const cells: NodeListOf<HTMLDivElement> = document.querySelectorAll(
      '.place-ships-grid-cell'
    );
    let self = this;
    this.ships.forEach((ship) => {
      interact('.ship').draggable({
        listeners: {
          start(event: InteractEvent) {},
          move(event: InteractEvent) {
            const target = event.currentTarget;
            const x =
              (parseFloat(target.getAttribute('data-x' as string)!) || 0) +
              event.dx;
            const y =
              (parseFloat(target.getAttribute('data-y' as string)!) || 0) +
              event.dy;

            // translate the element
            target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

            // check if the element is over a grid cell

            cells.forEach((cell) => {
              const cellCoords = cell.getBoundingClientRect();
              const shipCoords = target.getBoundingClientRect();
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

            target.setAttribute('data-x', x.toString());
            target.setAttribute('data-y', y.toString());
          },
          end(event: InteractEvent) {
            const target = event.target;
            const shipLength = Number(target.dataset['shipLength']);
            const selectedCells: NodeListOf<HTMLDivElement> =
              document.querySelectorAll('.place-ships-grid-cell.selected');
            if (selectedCells.length === shipLength) {
              let minX = Math.min(
                ...Array.from(selectedCells).map(
                  (cell) => cell.getBoundingClientRect().left
                )
              );
              let minY = Math.min(
                ...Array.from(selectedCells).map(
                  (cell) => cell.getBoundingClientRect().top
                )
              );
              target.style.position = 'absolute';
              target.style.left = minX + 'px';
              target.style.top = minY + 'px';
              target.style.transform = 'translate(' + 0 + 'px, ' + 0 + 'px)';

              let occupiedCells: number[] = [];
              selectedCells.forEach((cell) => {
                let occupiedIndex = Array.from(cells).findIndex(
                  (c) => c === cell
                );
                occupiedCells.push(occupiedIndex);

                cell.classList.add('occupied');
              });
              self.shipPositions[Number(target.id)] = occupiedCells;
              console.log(self.shipPositions);
            } else {
              target.style.transform = 'translate(' + 0 + 'px, ' + 0 + 'px)';
            }
            selectedCells.forEach((cell) => {
              cell.classList.remove('selected');
            });
            target.setAttribute('data-x', '0');
            target.setAttribute('data-y', '0');
          },
        },
      });
    });
  }
}
