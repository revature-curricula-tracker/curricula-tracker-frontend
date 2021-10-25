import { Component } from '@angular/core';
import { faUserCircle, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  faUserCircle = faUserCircle;
  faPlus = faPlus;

}
