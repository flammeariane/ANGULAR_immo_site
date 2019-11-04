import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { SinglePropertyComponent } from './single-property/single-property.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'admin/dashboard', canActivate:[AuthGuardService], component: AdminDashboardComponent }, // localhost:4200/admin/dashboard
  { path: 'login', component: SigninComponent},
  { path: 'property/:id', component: SinglePropertyComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // pathMatch full recupère l ensemble du chemin
  { path: '**', redirectTo: 'home' } // si l utilisateur entre une mauvais address il est rediriger vers home ! doit etre le dernier chemin de la liste des path
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
