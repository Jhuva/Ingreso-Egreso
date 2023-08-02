import { Component } from '@angular/core';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  nombre: string = '';
  nombreSubs!: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.nombreSubs = this.store.select('user')
                        .pipe(
                          filter( ({user}) => user !== null )
                        )
                        .subscribe(({user}) => {
                          this.nombre = user?.nombre!;
                      } )
  }

  ngOnDestroy(): void {
    this.nombreSubs.unsubscribe();
  }

}
