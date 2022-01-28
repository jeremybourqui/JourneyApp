import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject, Observable } from "rxjs";
import { map} from "rxjs/operators";

import { AuthService } from '../auth/auth.service';

import { environment } from "src/environments/environment";

import { PlaceRequest } from "../models/place-request";
import { Place } from "../models/place";

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient) { }

  getPlaces(userID: string, tripID: string): Observable<Place[]> {
    return this.http
      .get<Place[]>(`${environment.apiUrl}/users/${userID}/trips/${tripID}/places`);
  }

  deletePlace(userID: string, tripID: string, placeID: string): Observable<Place[]> {
    return this.http
      .delete<Place[]>(`${environment.apiUrl}/users/${userID}/trips/${tripID}/places/${placeID}`);
  }
  
  addPlace(userID: string, tripID: string, PlaceRequest: PlaceRequest){
    return this.http.post<Place>(`${environment.apiUrl}/users/${userID}/trips/${tripID}/places`, PlaceRequest)
  }

  getSinglePlace(userID: string, tripID: string, placeID): Observable<Place>{
    return this.http
      .get<Place>(`${environment.apiUrl}/users/${userID}/trips/${tripID}/places/${placeID}`);
  }

  modifyPlace(userID: string, tripID: string, placeID: string, PlaceRequest: PlaceRequest){
    return this.http.patch<Place>(`${environment.apiUrl}/users/${userID}/trips/${tripID}/places/${placeID}`, PlaceRequest)
  }




}
