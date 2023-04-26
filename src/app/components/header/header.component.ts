import { Component, Input, OnInit } from '@angular/core';
import { RegistrationFormComponent } from '../registration-form/registration-form.component';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  registrationForm: any;
  gameEnded = false;
  showExitIcon = true;
   constructor(private router: Router) {
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

 quitGame() {

   //  this.http.delete('').subscribe(() => {
    // //  this.gameEnded = true;
    // });

  }
}

