import { Component, OnInit } from '@angular/core';
import { AuthService } from './authentication/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // title = 'Biking';

  constructor(private auth:AuthService){

  }


  ngOnInit(){
    // localStorage.removeItem("user");
    this.auth.autoLogin();
  }
}
