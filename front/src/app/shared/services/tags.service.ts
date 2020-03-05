import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private readonly baseUrl = 'https://localhost:8443';
  constructor(private http: HttpClient) {}

  getAllTags() {
    return this.http.get(`${this.baseUrl}/tags`).pipe(
      map(result => result['hydra:member'])
    )
  }
}
