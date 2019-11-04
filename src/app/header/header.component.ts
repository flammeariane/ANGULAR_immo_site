import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = "Mon Agence";
  isLoggedIn = false;


  constructor(
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(  // on "listener" de l état de connexion firebase
      (userSession)=>{
        console.log('userSession',userSession);
          if(userSession){
            this.isLoggedIn = true;
          }else{
            this.isLoggedIn = false;
          }
      }
    )
  }

  onSignOut(){
    this.authenticationService.signOutUser(); // methode de deconnexion
  }

 
}
