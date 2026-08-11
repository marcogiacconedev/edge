import { Component } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-home',
  imports: [Navbar, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  isMenuVisible: boolean = false;
  receiveMenuVisibilityStatus(status: boolean): void {
    this.isMenuVisible = status;
  }

}
