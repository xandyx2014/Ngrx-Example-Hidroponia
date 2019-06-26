import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IonicModule } from '@ionic/angular';
import { GraficasPage } from './graficas.page';
import { ChartsModule } from 'ng2-charts';
const routes: Routes = [
  {
    path: '',
    component: GraficasPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartsModule,
    FlexLayoutModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GraficasPage]
})
export class GraficasPageModule {}
