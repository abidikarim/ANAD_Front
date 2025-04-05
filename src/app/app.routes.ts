import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { AntidopageComponent } from './antidopage/antidopage.component';
import { ReglementComponent } from './reglement/reglement.component';
import { AUTComponent } from './aut/aut.component';
import { SignalementDopageComponent } from './signalement-dopage/signalement-dopage.component';
import { OutilsComponent } from './outils/outils.component';
import { ActualitesComponent } from './actualites/actualites.component';

export const routes: Routes = [
    {
        path: '', component: LayoutComponent, children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent, title: 'Home' },
            { path: 'antidopage', component: AntidopageComponent, title: 'Antidopage' },
            { path: 'reglement', component: ReglementComponent, title: 'Reglement' },
            { path: 'aut', component: AUTComponent, title: 'AUT' },
            { path: 'signalement-dopage', component: SignalementDopageComponent, title: 'Signalement Dopage' },
            { path: 'outils', component: OutilsComponent, title: 'Outils' },
            { path: 'actualites', component: ActualitesComponent, title: 'Actualites' }
        ]
    }
];
