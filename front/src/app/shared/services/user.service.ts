import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/User.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = 'https://localhost:8443';
  constructor(private http: HttpClient) {}

  getAllUser() {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  getUser(id: number) {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }

  getUsersWithRole(role: 'user' | 'admin') {
    return this.http.get<User>(`${this.baseUrl}`)
  }

  createUser(user: User) {
    return this.http.post<User>(`${this.baseUrl}/users`, {...user});
  }

  editUser(user: User) {
    const headers = new HttpHeaders().set('Content-Type', 'application/merge-patch+json');
    return this.http.patch<User>(`${this.baseUrl}/users/${user.id}`, user, {headers});
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/users/${id}`);
  }
}
