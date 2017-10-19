import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class BarangProvider {
  public barang_yayasan:firebase.database.Reference;

  constructor() {
    firebase.auth().onAuthStateChanged( user => {
      if(user){
        this.barang_yayasan = firebase.database().ref(`/data_barang_yayasan`);
      }
    });
  }

  getBarang():firebase.database.Reference {
    return this.barang_yayasan;
  }
}