import { Component } from '@angular/core';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from "ng2-charts";

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent {

  ingresos: number = 0;
  egresos: number = 0;

  totalEgresos: number = 0;
  totalIngresos: number = 0;

  // Doughnut
  public doughnutChartLabels: Label[] = [
    'Egresos',
    'Ingresos',
  ];
  public doughnutChartData: MultiDataSet = [
      []
  ];

  public doughnutChartType: ChartType = 'doughnut';

  constructor( private store: Store<AppState> ) {}

  ngOnInit(): void {
    this.store.select('ingresosEgresos')
      .subscribe( ({items}) => this.generarEstadistica(items) )

  }

  generarEstadistica(items: IngresoEgreso[]) {
    this.totalIngresos = 0;
    this.totalEgresos = 0;
    this.ingresos = 0;
    this.egresos = 0;

    for( const item of items ){
      if( item.tipo === 'ingreso' ) {
        this.totalIngresos += item.monto;
        this.ingresos ++;
      } else {
        this.totalEgresos += item.monto;
        this.egresos ++;
      }
    }
    this.doughnutChartData = [ [this.totalEgresos, this.totalIngresos] ]
  }

}
