import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GanComponent } from './gan/gan.component';


const routes: Routes = [
  { path: 'gan', component: GanComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
