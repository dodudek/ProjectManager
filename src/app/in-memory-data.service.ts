import { Injectable } from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
import {Project} from "./project";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb() {
    const projects = [
      {id: 3, name: 'Social media asset'},
      {id: 4, name: 'Website redesign'},
      {id: 5, name: 'Brand ad campaign'}
    ];
    return {projects};

  }

  genId(projects: Project[]): number {
    return projects.length > 0 ? Math.max(...projects.map(project => project.id)) + 1 : 11;
  }
}
