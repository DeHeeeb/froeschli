import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./simple-grid.scss', './app.component.scss']
})
export class AppComponent implements OnInit {
  public weatherBayreuth: any;
  public weatherStGallen: any;

  private baseUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=de&APPID=fbb4bb9ce8ee1b0e9097972e8429c9d3";
  private bayreuthUrl = this.baseUrl + "&q=Bayreuth,de&";
  private stGallenUrl = this.baseUrl + "&q=Sankt Gallen,ch&";

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getBayreuth().subscribe(bayreuth =>
      this.weatherBayreuth = bayreuth);
    this.getStGallen().subscribe(stGallen =>
      this.weatherStGallen = stGallen);
  }

  getBayreuth() {
    return this.http.get<any>(this.bayreuthUrl);
  }

  getStGallen() {
    return this.http.get<any>(this.stGallenUrl);
  }
}
