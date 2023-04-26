import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  registrationForm: any;
  gameEnded = false;
  showExitIcon = true;
  gameId = 0;

   constructor(private router: Router, private gameService: GameService) {
     this.router.events.pipe(
       filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd))
     .subscribe((value: NavigationEnd) => {
       console.log(value.url);
       if(value.url == '/players-form') {
         this.showExitIcon = false;
       } else {
         this.showExitIcon = true;
       }
     });

  }

  deleteGame(): void {
    this.gameService.deleteGame(this.gameId)
    .subscribe({
      next: () => {
        console.log('Gioco eliminato con successo');
      },
      error: (err) => {
        console.error('Errore durante l\'eliminazione del gioco', err);
      }
    });
}
}
