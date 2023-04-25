import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  providers: [PlayerService],
})
export class RegistrationFormComponent {
  registrationForm: FormGroup;
  list: string[] = [];
  showHint = false;
  showError = false;
  disableAddButton = false;

  constructor(private fb: FormBuilder, private playerService: PlayerService) {
    this.registrationForm = this.fb.group({
      playerToAdd: [
        '',
        [
          Validators.pattern(/^\S.*$/)],
      ],
    });

    this.registrationForm.get('playerToAdd')?.valueChanges.subscribe(() => {
      this.checkInputValidity();
    });
  }

  getInputLength(): number {
    const playerToAdd = this.registrationForm.get('playerToAdd');
    return playerToAdd?.value.trim().replace(/\s+/g, ' ').split(' ').join('').length;
  }

  checkInputValidity() {
    const playerToAdd = this.registrationForm.get('playerToAdd');
    if (playerToAdd && playerToAdd.dirty && !playerToAdd.errors) {
      const value = playerToAdd.value.trim();
      if (value.length > 20) {
        this.showError = true;
        this.disableAddButton = true;
        playerToAdd.setErrors({ maxlength: true });
      } else if (
        this.list.find((player) => player.toLowerCase() === value.toLowerCase())
      ) {
        this.showError = true;
        this.disableAddButton = true;
        playerToAdd.setErrors({ exists: true });
      } else {
        this.showError = false;
        this.disableAddButton = false;
        playerToAdd.setErrors(null);
      }
    }
  }

  isValidPlayer() {
    const playerToAdd = this.registrationForm.get('playerToAdd')?.value;
    return (
      !this.disableAddButton &&
      playerToAdd &&
      playerToAdd.length > 0 &&
      playerToAdd.length <= 20 &&
      !this.registrationForm.get('playerToAdd')?.hasError('pattern') &&
      !this.registrationForm.get('playerToAdd')?.hasError('maxlength') &&
      !this.registrationForm.get('playerToAdd')?.hasError('exists')
    );
  }

  addToList() {
    const playerToAdd = this.registrationForm.get('playerToAdd');
    if (playerToAdd && playerToAdd.value) {
      const value = playerToAdd.value.trim();
      const pattern = /^\S.*$/;
      if (!pattern.test(value)) {
        playerToAdd.setErrors({ pattern: true });
        return;
      }
      const existingPlayer = this.list.find(
        (player) => player.toLowerCase() === value.toLowerCase()
      );
      if (existingPlayer) {
        playerToAdd.setErrors({ exists: true });
        return;
      } else if (value.length > 20) {
        playerToAdd.setErrors({ maxlength: true });
        return;
      }
      this.list.push(value);
      this.clearInput();
    }
  }

  clearInput() {
    const playerToAdd = this.registrationForm.get('playerToAdd');
    playerToAdd?.setValue('');
    playerToAdd?.markAsUntouched();
    playerToAdd?.markAsPristine();
    playerToAdd?.updateValueAndValidity();
  }

  removeFromList(index: number) {
    this.list.splice(index, 1);
    this.registrationForm.get('playerToAdd')?.markAsUntouched();
    this.showError = false; // aggiungi questa riga per nascondere l'errore dopo aver svuotato l'input
  this.disableAddButton = false;
  }  updateInputHint() {
    const inputLength = this.getInputLength();
    this.showHint = inputLength > 0 && inputLength < 20;
  }


  confirmPlayers() {
    const players = this.list.map((name) => ({ id: 0, name, points: 0 }));
    this.playerService.sendPlayers(players).subscribe({
      next: (response) => {
        console.log('Giocatori aggiunti:', response);
      },
      error: (error) => {
        console.error("Errore durante l'aggiunta dei giocatori:", error);
      },
    });
  }
}
