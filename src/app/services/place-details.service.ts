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
export class PlaceDetailsService {

  constructor(private http: HttpClient) { }

  getPlace(userID: string, tripID: string, placeID: string): Observable<Place> {
    return this.http
      .get<Place>(`${environment.apiUrl}/users/${userID}/trips/${tripID}/places/${placeID}`);
  }

  deletePlace(userID: string, tripID: string, placeID: string): Observable<Place> {
    return this.http
      .delete<Place>(`${environment.apiUrl}/users/${userID}/trips/${tripID}/places/${placeID}`);
  }
}
