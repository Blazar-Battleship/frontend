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
  showHint: boolean = false;
  showError: boolean = false;
  disableAddButton: boolean = false;


  constructor(private fb: FormBuilder, private playerService: PlayerService) {
    this.registrationForm = this.fb.group({
      playerToAdd: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z]+[a-zA-Z\s]*$/)],
      ],
    });

    this.registrationForm
      .get('playerToAdd')
      ?.statusChanges.subscribe((status) => {
        if (
          status === 'INVALID' &&
          this.registrationForm.get('playerToAdd')?.value
        ) {
          this.showError = true;
          this.disableAddButton = true;
        } else {
          this.showError = false;
          this.disableAddButton = false;
        }
      });

    this.registrationForm
      .get('playerToAdd')
      ?.valueChanges.subscribe((value) => {
        this.checkInputLength();
        this.checkListValues();
      });
  }

  checkInputLength() {
    const playerToAdd = this.registrationForm.get('playerToAdd');
    const value = playerToAdd?.value.trim();
    if (value && value.length > 20) {
      this.showError = true;
      this.disableAddButton = true;
      playerToAdd?.setErrors({ maxlength: true });
    } else if (this.list.includes(value)) {
      this.showError = true;
      this.disableAddButton = true;
      playerToAdd?.setErrors({ exists: true });
    } else {
      this.showError = false;
      this.disableAddButton = false;
      playerToAdd?.setErrors(null);
    }
  }

  checkListValues() {
    const playerToAdd = this.registrationForm.get('playerToAdd');
    if (playerToAdd && playerToAdd.value) {
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

  addToList() {
    const playerToAdd = this.registrationForm.get('playerToAdd');
    if (playerToAdd && playerToAdd.value) {
      const value = playerToAdd.value.trim();
      const pattern = /^[a-zA-Z]+[a-zA-Z\s]*$/;
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
      playerToAdd.setValue('');
      playerToAdd.markAsUntouched();
      playerToAdd.markAsPristine();
      playerToAdd.updateValueAndValidity();
    }
  }

  removeFromList(index: number) {
    this.list.splice(index, 1);
    this.registrationForm.get('playerToAdd')?.markAsUntouched();
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
