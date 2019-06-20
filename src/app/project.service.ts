import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Project} from "./project";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map,tap} from "rxjs/operators";
import {MessageService} from "./message.service";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectsUrl = '//localhost:9999/projects';

  constructor(private http:HttpClient,
              private messageService: MessageService) {
  }

  getProjects(): Observable<Project[]>
  { return this.http.get<Project[]>(this.projectsUrl).pipe(
    tap(_ => this.log('fetched projects ')),
    catchError(this.handleError<Project[]>('getProjects', []))
  ); }

  getProjectNo404<Data>(id: number): Observable<Project> {
    const url = `${this.projectsUrl}/?id=${id}`;
    return this.http.get<Project[]>(url)
      .pipe(
        map(projects => projects[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} project id=${id}`);
        }),
        catchError(this.handleError<Project>(`getProject id=${id}`))
      );
  }

  getProject(id: number): Observable<Project> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http.get<Project>(url).pipe(
      tap(_ => this.log(`fetched project id=${id}`)),
      catchError(this.handleError<Project>(`getProject id=${id}`))
    );
  }

  addProject (project: Project): Observable<Project> {
    return this.http.post<Project>(this.projectsUrl, project, httpOptions).pipe(
      tap((newProject: Project) => this.log(`added project w/ id=${newProject.id}`)),
      catchError(this.handleError<Project>('addProject'))
    );
  }

  deleteProject (project: Project | number): Observable<Project> {
    const id = typeof project === 'number' ? project : project.id;
    const url = `${this.projectsUrl}/${id}`;

    return this.http.delete<Project>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted project id=${id}`)),
      catchError(this.handleError<Project>('deleteProject'))
    );
  }


  updateProject (project: Project): Observable<any> {
    return this.http.put(this.projectsUrl, project, httpOptions).pipe(
      tap(_ => this.log(`updated project id=${project.id}`)),
      catchError(this.handleError<any>('updateProject'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {


      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`ProjectService: ${message}`);
  }

}
