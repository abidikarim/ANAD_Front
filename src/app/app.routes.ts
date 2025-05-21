import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { AntidopageComponent } from './antidopage/antidopage.component';
import { ReglementComponent } from './reglement/reglement.component';
import { AUTComponent } from './aut/aut.component';
import { SignalementDopageComponent } from './signalement-dopage/signalement-dopage.component';
import { OutilsComponent } from './outils/outils.component';
import { ActualitesComponent } from './actualites/actualites.component';
import { ContactComponent } from './contact/contact.component';
import { SignaleFormComponent } from './signale-form/signale-form.component';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path:"login",component:LoginComponent,title:"Login"},
    {path:"forget-password",component:ForgetPasswordComponent,title:"Forget Password"},
    {path:"reset-password",component:ResetPasswordComponent,title:"Reset Password"},
    {
        path: '', component: LayoutComponent, children: [
            { path: 'home', component: HomeComponent, title: 'Home' },
            { path: 'antidopage', component: AntidopageComponent, title: 'Antidopage' },
            { path: 'reglement', component: ReglementComponent, title: 'Reglement' },
            { path: 'aut', component: AUTComponent, title: 'AUT' },
            { path: 'signalement-dopage', component: SignalementDopageComponent, title: 'Signalement Dopage' },
            { path: 'outils', component: OutilsComponent, title: 'Outils' },
            { path: 'actualites', component: ActualitesComponent, title: 'Actualites' },
            { path: 'contact', component: ContactComponent, title: 'Contact' },
            { path: 'signale-form', component: SignaleFormComponent, title: 'Signale Form' }
        ]
    }
];
