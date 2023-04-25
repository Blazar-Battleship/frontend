import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  navbarVisible = false;
  darkMode = false;

  toggleNavbar() {
    this.navbarVisible = !this.navbarVisible;
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
  }

  quitGame() {
    //
  }
}
