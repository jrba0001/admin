import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { FormsModule } from "@angular/forms";
import { IncrementadorComponent } from "../components/incrementador/incrementador.component";
import {ChartsModule} from 'ng2-charts'
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { PipesModule } from '../pipes/pipes.module';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';




@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent,
        IncrementadorComponent,
        GraficoDonaComponent,
        RxjsComponent,
        ProfileComponent

    ],
    exports:[
        DashboardComponent,
        ProgressComponent,
        Graficas1Component, 
        PagesComponent,
        PipesModule
    ],
    imports:[
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule,
        CommonModule
    ]
  })
  export class PagesModule { }