import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePrincipalPageComponent } from './home-principal-page/home-principal-page.component';

const routes: Routes = [
  { path:'', component:HomePrincipalPageComponent, pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
