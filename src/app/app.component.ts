import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Store, select } from '@ngrx/store';
import { AppState } from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Graficas',
      url: '/graficas',
      icon: 'analytics'
    },
    {
      title: 'Ubicacion',
      url: '/ubicacion',
      icon: 'map'
    },
    {
      title: 'Salir',
      url: '/login',
      icon: 'exit'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuCtrl: MenuController,
    private store: Store<AppState>
  ) {
    this.initializeApp();
    this.menuEstado();
  }
  menuEstado() {
    this.store.pipe(
      select(miStore => miStore.usuario)
    ).subscribe( ({islogin}) => {
      this.menuCtrl.enable(islogin);
    });
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
