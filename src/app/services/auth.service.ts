import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';

import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as authActions from '../auth/auth.actions';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription!: Subscription;
  private _user!: Usuario | null;

  constructor(private auth: AngularFireAuth,
              private fireStore: AngularFirestore,
              private store: Store<AppState>) { }

  initAuthListener() {
    this.auth.authState.subscribe( fuser => {
      if(fuser) {
        this.userSubscription = this.fireStore.doc(`${ fuser.uid }/usuario`).valueChanges()
          .subscribe(firestoreUser => {
            const user = Usuario.fromFirestore(firestoreUser);
            this._user = user;
            this.store.dispatch(authActions.setUser({ user }));
          })
      } else {
        this._user = null;
        this.userSubscription?.unsubscribe();
        this.store.dispatch(authActions.unSetUser());
        this.store.dispatch(ingresoEgresoActions.unSetItems());
      }
    } )
  }

  crearUsuario(nombre: string, email: string, password: string) {
    // console.log({nombre, email, password})
   return this.auth.createUserWithEmailAndPassword(email, password)
            .then(({user}) => {
              const newUser = new Usuario( user?.uid!, nombre, user?.email! );
              return this.fireStore.doc(`${ user?.uid }/usuario`).set({...newUser});
            })
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState
            .pipe(
              map( fbUser => fbUser != null )
            )
  }

  get user() {
    return {... this._user}
  }

}
