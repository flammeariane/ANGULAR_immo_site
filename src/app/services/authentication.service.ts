import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { resolve, reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }


 signInUser(email: string, password: string){  
    return new Promise(                     
      (resolve, reject)=>{                  
        firebase.auth().signInWithEmailAndPassword(email, password).then(   
          (data)=>{
            resolve(data);                   
          }
        ).catch(                        
          (error)=> {
            reject(error);
          }
        )     
      }
    )
  }

  signOutUser(){
    firebase.auth().signOut();
  }


  signUpUser(email: string, password: string){  // méthode pour la création d'un utilisateur 
    return new Promise(                     // appel de l'object promise
      (resolve, reject)=>{                  //on lui met en parametre une fonction anonyme avec resolve et reject
        firebase.auth().createUserWithEmailAndPassword(email, password).then(    // on utilise le service firebase et on appel sa methode auth()
          ()=>{
            console.log('connecté');
           resolve();                      // si toute c'est bien passer on est connecté = resolve
          }
        ).catch(                           // si il y a eu un probleme à la connexion , on reject l'erreur
          (error)=> {
            reject(error);
           }
        )     
       }
    )
  }

}
