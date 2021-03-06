import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Trip } from "../models/trip";
import { AuthService } from '../auth/auth.service';
import { switchMap } from 'rxjs/operators';
import { TripRequest } from '../models/trip-request';
import { environment } from "src/environments/environment";


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

  //technique 1 pour récupérer l'id de l'utilisateur. Pas très propre, préférer la technique 2 où le travail est fait dans le composant et qu'il y a plus qu'à récupérer la variable.
  // getTrips(): Observable<Trip[]> {
  //   return this.auth.getUser$().pipe(
  //     switchMap((user) => this.http
  //       .get<Trip[]>(`https://archiowebjourney.herokuapp.com/users/${user._id}/trips`))
  //   )

  // }
  getTrips(userID: string): Observable<Trip[]> {
    return this.http
      .get<Trip[]>(`${environment.apiUrl}/users/${userID}/trips`);
  }

  getSingleTrip(userID: string, tripID): Observable<Trip> {
    return this.http
      .get<Trip>(`${environment.apiUrl}/users/${userID}/trips/${tripID}`);
  }

  deleteTrip(userID: string, tripID: string): Observable<Trip[]> {
    return this.http
      .delete<Trip[]>(`${environment.apiUrl}/users/${userID}/trips/${tripID}`);
  }

  addTrip(userID: string, tripRequest: TripRequest){
    return this.http
      .post<Trip>(`${environment.apiUrl}/users/${userID}/trips/`, tripRequest)
  }

  modifyTrip(userID: string, tripID: string, tripRequest: TripRequest){
    return this.http
      .patch<Trip>(`${environment.apiUrl}/users/${userID}/trips/${tripID}`, tripRequest)
  }
  
  

  // addTrip(userID: string): Observable<Trip[]>{
  //   return this.http
  //     .post<Trip[]>(`https://archiowebjourney.herokuapp.com/users/${userID}/trips`)
  // }
}
