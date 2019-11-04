import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Property } from '../interfaces/property';
import * as firebase from 'firebase';
import { error } from '@angular/compiler/src/util';
import { resolve, reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  properties :Property[] = [];

  propertiesSubject = new Subject<Property[]>();

  constructor() { }

  emitProperties(){
    this.propertiesSubject.next(this.properties);
  }

  saveProperties(){
    firebase.database().ref('/properties').set(this.properties);
  }

  getProperties(){
    firebase.database().ref('/properties').on('value',(data)=>{
      this.properties = data.val() ? data.val() : [];
      this.emitProperties();

    });
  }

  getSingleProperties(id){
return new Promise(
  (resolve, reject)=>{
    firebase.database().ref('/properties/' + id).once('value').then( // on recupere une seu bien grace a l'id passé en parametre
      (data)=>{
        resolve(data.val());
      }
    ).catch(
      (error)=>{
        reject(error);
      }
    )
  }
)
  }

  createProperty(property: Property){
    this.properties.push(property);
    this.saveProperties();
    this.emitProperties();
  }
 
  deleteProperty(index){
    this.properties.splice(index, 1); // supprime 1 element unique a partir de l index récupéré 
    this.saveProperties();
    this.emitProperties();
  }

  updateProperty(property: Property, index){
   firebase.database().ref('/properties/' + index).update(property);
     }
   
     uploadFile(file: File){   // l'utilisateur envoie le fichier
       return new Promise(
         (resolve, reject) => {
          const uniqueId = Date.now().toString();  // creation d 'un identifiant unique pour les fichier dans la db
          const fileName = uniqueId + file.name; // l'identifiant unique est concatainer
          const upload = firebase.storage().ref().child('images/properties/' + fileName).put(file); // le fichier est placer dans le bon dossier sur le storage
          upload.on(firebase.storage.TaskEvent.STATE_CHANGED,   // on ecoute la Db a chaque état de chargement du fichier  ( 3 states)
            ()=>{                                    // state 1 le chargement 
              console.log('chargement....');
            },
            (error)=>{                                // en cas d erreur 
              console.log(error);
              reject(error);
            },
            ()=>{
              upload.snapshot.ref.getDownloadURL().then(
                (downLoadUrl)=>{
                resolve(downLoadUrl);                         // on recupère l'url pour le passer dans le composant
              }
              )
            }
            );
         }
       );
     }

removeFile(fileLink: string){
  if (fileLink){
    const storageRef = firebase.storage().refFromURL(fileLink);
    storageRef.delete().then(
      ()=> {
        console.log('File Deleted');
      }
    ).catch(
      (error)=>{
        console.error(error);
      }
    )
  }
}

}


