import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../interfaces/Project.interface';
import { tap, map } from 'rxjs/operators';
import {User} from "../interfaces/User.interface";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private readonly baseUrl = 'https://localhost:8443';
  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('https://localhost:8443/projects').pipe(
      map(result => result['hydra:member'])
    );
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`https://localhost:8443/projects/${id}`);
  }

  editProject(project: Project) {
    const headers = new HttpHeaders().set('Content-Type', 'application/merge-patch+json');
    return this.http.patch<User>(`${this.baseUrl}/projects/${project.id}`, project, {headers});
  }

  addProject(project: Project) {
    return this.http.post<Project>(`${this.baseUrl}/projects`, {...project})
  }
}
