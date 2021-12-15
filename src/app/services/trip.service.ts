import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Trip } from "../models/trip";

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient) { }

  // getTrip(): Trip {
  //   return { title: "dfmgjvbnbdfékb", description: "kxyjdhdvhnéskdfjnbéf", userId: "dsbdfb", _id: "drrgdrhbdb" };
  // }
  // getTrip(): Observable<Trip> {
  //   return of({ title: "dfmgjvbnbdfékb", description: "kxyjdhdvhnéskdfjnbéf", userId: "dsbdfb", _id: "drrgdrhbdb" });
  // }
  getTrip(): Observable<Trip> {
    return this.http
      .get<Trip>('https://archiowebjourney.herokuapp.com/users/61b0c80f52ab86e3a4fe88a0/trips')

  }
}
