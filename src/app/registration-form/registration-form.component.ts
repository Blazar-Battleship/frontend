import { Component } from '@angular/core';

export interface Player {
  username: string;
}

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent {
  players: Player[] = [{ username: '' }];

  addPlayer(): void {
    if (this.players.length < 6) {
      this.players.push({ username: '' });
    }
  }

  removePlayer(index: number): void {
    if (this.players.length > 1) {
      this.players.splice(index, 1);
    }
  }

  onSubmit(): void {
    // da completare
  }


  // onSubmit() {
  //   const url = 'http://...';
  //   const data = { players: this.players.map(player => player.username) };

  //   this.http.post(url, data).subscribe(
  //     response => {
  //       console.log('Dati inviati al server con successo!', response);
  //       // Aggiungere qui la logica per gestire la risposta del server
  //     },
  //     error => {
  //       console.error('Errore durante l\'invio dei dati al server:', error);
  //       // Aggiungere qui la logica per gestire l'errore
  //     }
  //   );
  // }

  // onSubmit() {
  //
  //   const mockResponse = {
  //     success: true,
  //     message: 'Registrazione avvenuta con successo!',
  //     data: {
  //       players: this.players
  //     }
  //   };

  //
  //   setTimeout(() => {
  //     console.log('Mock response:', mockResponse);
  //   }, 2000);
  // }



}
