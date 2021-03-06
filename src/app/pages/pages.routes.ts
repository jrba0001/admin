import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';



const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate:[LoginGuardGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent,data:{titulo:"Dashboard"} },
            { path: 'progress', component: ProgressComponent,data:{titulo:"Progress"} },
            { path: 'graficas1', component: Graficas1Component,data:{titulo:"Graficas Donna"} },
            { path: 'promesas', component: PromesasComponent,data:{titulo:"Ejemplo Promesas"} },
            { path: 'account-settings', component: AccoutSettingsComponent,data:{titulo:"Settings de usuario"} },
            { path: 'profile', component: ProfileComponent,data:{titulo:"Perfil de usuario"} },
            //mantenimiento
            { path: 'usuarios', component: UsuariosComponent,data:{titulo:"Mantenimiento de usuario"} },

            { path: 'rxjs', component: RxjsComponent,data:{titulo:"Ejemplo RXJS"} },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full',data:{titulo:"Dashboard"} }
        ]
    }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
