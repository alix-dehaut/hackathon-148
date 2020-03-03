import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('https://localhost:8443/projects').subscribe(
      result => console.log(result)
    )
  }

}
