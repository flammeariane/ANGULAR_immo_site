import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

signinForm: FormGroup; // Modèle de données qui permet d'utiliser la méthode réactive

  constructor(
    private fomrBuilder: FormBuilder, // le constructeur de formulaire
    private authenticationService: AuthenticationService, 
    private router: Router,
  ) { }

  ngOnInit() {
    this.initSigninForm();
  }

  initSigninForm(){ // initialisation de formbuilder avec se constructeur
    this.signinForm = this.fomrBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
     
    });
  }

  onSubmitSigninForm(){
    const email = this.signinForm.get('email').value;   // on recupere les valeur entree dans le formulaire
    const password = this.signinForm.get('password').value;
    this.authenticationService.signInUser(email, password).then(
      (data)=>{
        this.router.navigate(['/admin', 'dashboard'])
      }
    ).catch(
      (error)=>{
        console.log(error);
      }
    );
  }

}
