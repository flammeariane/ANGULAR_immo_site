import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Immo';

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyBvaxzgNIN6YqGRZgyqZ8EMe79kNoUKNto",
      authDomain: "immo-1400.firebaseapp.com",
      databaseURL: "https://immo-1400.firebaseio.com",
      projectId: "immo-1400",
      storageBucket: "immo-1400.appspot.com",
      messagingSenderId: "246065639515",
      appId: "1:246065639515:web:5a470219adba8384924f7e"
    };
    firebase.initializeApp(firebaseConfig);
  }

}
