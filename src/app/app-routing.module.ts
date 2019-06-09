import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ProjectsComponent} from "./projects/projects.component";
import {HomeComponent} from "./home/home.component";
import {ProjectDetailComponent} from "./project-detail/project-detail.component";

const routes: Routes =[
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  { path: 'detail/:id', component: ProjectDetailComponent },
  {path: 'projects', component: ProjectsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
