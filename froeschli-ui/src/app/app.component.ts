import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {formatNumber} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./simple-grid.scss', './app.component.scss']
})
export class AppComponent implements OnInit {
  public weatherSambi: any;
  public weatherStGallen: any;

  private baseUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=de&APPID=fbb4bb9ce8ee1b0e9097972e8429c9d3";
  private sambiUrl = this.baseUrl + "&q=Untersambach,de&";
  private stGallenUrl = this.baseUrl + "&q=Sankt Gallen,ch&";

  constructor(
    private http: HttpClient,
    @Inject(LOCALE_ID) private locale: string
  ) {
  }

  ngOnInit() {
    this.getSambi().subscribe(sambi =>
      this.weatherSambi = sambi);
    this.getStGallen().subscribe(stGallen =>
      this.weatherStGallen = stGallen);
  }

  getSambi() {
    return this.http.get<any>(this.sambiUrl);
  }

  getStGallen() {
    return this.http.get<any>(this.stGallenUrl);
  }

  isSameWeather() {
    return this.weatherStGallen?.main && this.weatherSambi?.main &&
      this.getTempRounded(this.weatherStGallen) === this.getTempRounded(this.weatherSambi) &&
      this.weatherStGallen.weather[0].description === this.weatherSambi.weather[0].description;
  }

  private getTempRounded(weather: any) {
    return formatNumber(weather.main.temp, this.locale, '1.0-0');
  }
}
