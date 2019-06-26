import { Component, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.page.html',
  styleUrls: ['./ubicacion.page.scss'],
})
export class UbicacionPage implements OnInit {
  map: L.Map;
  constructor(public actionSheetController: ActionSheetController,
              private alertController: AlertController,
              private loginSevice: LoginService) {}

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.loginSevice.verificarStorage();
    this.iniciarMapa();
  }
  iniciarMapa() {
    this.map = L.map('mapid').setView([-17.8533, -63.1742727], 14);
    L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png ')
    .addTo(this.map);
    this.agregarPopup(-17.8533, -63.1742727);
    this.map.on('click', this.onMapClick, this);
  }
  onMapClick(e) {
    // console.log( e );
    const {lat , lng} = e.latlng;
  }
  agregarPopup(lat: number, lng: number) {
    const marker = L.marker([lat, lng], {
      icon: L.icon({
        iconSize: [ 25, 41 ],
        iconAnchor: [ 13, 41 ],
        iconUrl: 'leaflet/marker-icon.png',
        shadowUrl: 'leaflet/marker-shadow.png'
     }),
     alt: 'id1'
   });
    console.log( marker.options );
    marker.on('click', (e: any) => {
      // this.map.removeLayer(marker) Eliminar slayer;
      console.log( marker.getLatLng() );
      this.presentActionSheet(marker);
    }, this);
    this.map.addLayer(marker);
  }
  async presentActionSheet(marker: L.Marker) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Ubicacion',
      buttons: [
      {
        text: 'Ver',
        icon: 'book',
        handler: () => {
          this.presentAlertShow(marker.getLatLng());
        }
      },
      {
        text: 'Borrar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.presentAlertConfirm(marker);
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  async presentAlertConfirm( marker: L.Marker) {
      const alert = await this.alertController.create({
        header: 'Confirmar!',
        message: 'Desea <strong>Eliminar</strong> su ubicacion!!!',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
            }
          }, {
            text: 'Aceptar',
            handler: () => {
              this.map.removeLayer(marker);
            }
          }
        ]
      });
      await alert.present();
  }
  async presentAlertShow({lat , lng}) {
    const alert = await this.alertController.create({
      header: 'Ubicacion',
      subHeader: 'modulo',
      message: `
      Longitud: ${lat} <br>
      latitud: ${lng}
      `,
    });

    await alert.present();
  }
}
