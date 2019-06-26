import { Component, OnInit, ViewChild } from '@angular/core';
import { interval, Subscription, pipe  } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { ChartDataSets, ChartOptions, ChartPoint } from 'chart.js';
import { Label, Color, BaseChartDirective } from 'ng2-charts';
import { tap, distinct, distinctUntilChanged, filter, takeWhile } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.reducer';
import { Store, select } from '@ngrx/store';
import { ObtenerMedicion } from 'src/app/store/actions/medicion.action';
import { Medicion } from 'src/app/store/interfaces/medicion.interface';
import { format } from 'date-fns';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.page.html',
  styleUrls: ['./graficas.page.scss'],
})
export class GraficasPage implements OnInit {
  timerSubscription = new Subscription();
  usuarioSubscription = new Subscription();
  medicionSubscription = new Subscription();
  datosMedicion: Medicion;
  public lineChartData: ChartDataSets[] = [
    { data: [0], label: 'T 1', pointRadius: 10 },
    { data: [0], label: 'T 2', pointRadius: 10},
    { data: [0], label: 'T 3', pointRadius: 10},
    { data: [0], label: 'T 4', pointRadius: 10},
  ];
  public lineChartLabels: Label[] = ['January'];
  public lineChartOptions: ChartOptions = {
    legend: {
      labels: {
        usePointStyle: true
      }
    },
    responsive: true,
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartType = 'line';
  idUsuario;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  constructor(private loginService: LoginService,
              private store: Store<AppState>) { }
  ngOnInit() {}
  ionViewDidEnter() {
    this.loginService.verificarStorage();
    this.obtenerUsuario();
    this.comenzarPeticion();
  }
  ionViewWillEnter() {
    this.datosGrafica();
  }
  ionViewDidLeave() {
    this.timerSubscription.unsubscribe();
    this.usuarioSubscription.unsubscribe();
    this.medicionSubscription.unsubscribe();
  }
  obtenerUsuario() {
    this.usuarioSubscription = this.store.pipe(
      select( state => state.usuario))
      .subscribe(({id}) => this.idUsuario = id);
  }
  datosGrafica() {
    this.medicionSubscription = this.store.pipe(
      select(state => state.medicion),
      filter(medicion => medicion.id !== null)
      )
        .subscribe(resp => {
          this.datosMedicion = resp;
          this.agregarDatos();
          this.agregarLabels();
        });
  }
  agregarDatos() {
    if (this.lineChartData[0].data.length <= 5) {
      this.lineChartData[0].data = [
        ...this.lineChartData[0].data,
        Number(this.datosMedicion.t1)] as ChartPoint[];
      this.lineChartData[1].data = [
        ...this.lineChartData[1].data,
        Number(this.datosMedicion.t2)] as ChartPoint[];
      this.lineChartData[2].data = [
        ...this.lineChartData[2].data,
        Number(this.datosMedicion.t3)] as ChartPoint[];
      this.lineChartData[3].data = [
        ...this.lineChartData[3].data,
        Number(this.datosMedicion.t4)] as ChartPoint[];
    }
    if (this.lineChartData[0].data.length === 5) {
      this.lineChartData[0].data.shift();
      this.lineChartData[1].data.shift();
      this.lineChartData[2].data.shift();
      this.lineChartData[3].data.shift();
    }
  }
  agregarLabels() {
    if (this.lineChartLabels.length <= 5) {
      this.lineChartLabels = [...this.lineChartLabels, format(this.datosMedicion.fecha, 'DD-MM-YYYY')];
    }
    if (this.lineChartLabels.length === 5) {
      this.lineChartLabels.shift();
    }
  }
  comenzarPeticion() {
    this.timerSubscription =  interval(2000)
    .subscribe(() => {
        this.store.dispatch(ObtenerMedicion({id: this.idUsuario}));
      });
  }
  handleClick() {
  }
  random(): number {
   return (Math.random() * 1000);
  }

}
