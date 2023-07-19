import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../shared/data.service';
import { AuthService } from '../authentication/auth.service';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  cartSize: number = 0;
  loggedIn:boolean = false;
 

  constructor(private dataService: DataService,public authService:AuthService,private router:Router) {}

  ngOnInit() {
    // console.log("initialized")
    this.dataService.bookingChanged.subscribe((bookings) => {
      this.cartSize = bookings.length;
    });

    this.authService.user.subscribe((user) => {
      if(user) this.loggedIn = true;
      else this.loggedIn = false;
    });

    console.log(document.getElementById("logoutBtn"))
    
  }

  logout(){
    this.authService.logOut();
  }


}
