import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../interfaces/Project.interface';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor(private http: HttpClient) { }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('https://localhost:8443/projects').pipe(
      map(result => result['hydra:member'])
    );
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`https://localhost:8443/projects/${id}`);
  }
}
