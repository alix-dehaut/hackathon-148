import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from "../interfaces/User.interface";

@Injectable({
  providedIn: 'root'
})
export class ProjectUserService {
  private readonly baseUrl = 'https://localhost:8443';
  constructor(private http: HttpClient) {}

  createProjectUser(projectUser: {agent: string, project: string}) {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post(`${this.baseUrl}/project_users`, projectUser, {headers});
  }
}
