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
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoginComponent } from './login/login.component';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActualitiesManagementComponent } from './actualities-management/actualities-management.component';
import { SignalementManagementComponent } from './signalement-management/signalement-management.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';

export const routes: Routes = [
    {path:"forget-password",component:ForgetPasswordComponent,title:"Forget Password"},
    {path:"reset-password",component:ResetPasswordComponent,title:"Reset Password"},
    {path:"login",component:LoginComponent,title:"Login"},
    {path:"confirm-account",component:ConfirmAccountComponent,title:"Confirm Account"},
    {path:"dashboard",component:DashboardComponent,title:"Dashboard",children:[
        {path:"profile",component:AdminProfileComponent,title:"Profile"},
        {path:"actualities",component:ActualitiesManagementComponent,title:"Actualities"},
        {path:"signalement",component:SignalementManagementComponent,title:"Signalement"}
    ]},
    {
        path: '', component: LayoutComponent, children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
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
