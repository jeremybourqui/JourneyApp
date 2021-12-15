import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Trip } from "../models/trip";
import { AuthService } from '../auth/auth.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  // getTrip(): Trip {
  //   return { title: "dfmgjvbnbdfékb", description: "kxyjdhdvhnéskdfjnbéf", userId: "dsbdfb", _id: "drrgdrhbdb" };
  // }
  // getTrip(): Observable<Trip> {
  //   return of({ title: "dfmgjvbnbdfékb", description: "kxyjdhdvhnéskdfjnbéf", userId: "dsbdfb", _id: "drrgdrhbdb" });
  // }
  getTrips(userID: string): Observable<Trip[]> {
    return this.http
      .get<Trip[]>(`https://archiowebjourney.herokuapp.com/users/${userID}/trips`);
  }
}
