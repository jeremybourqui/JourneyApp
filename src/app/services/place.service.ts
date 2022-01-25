import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { AuthService } from '../auth/auth.service';

import { environment } from "src/environments/environment";

import { PlaceRequest } from "../models/place-request";
import { Place } from "../models/place";

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  addPlace(userID: string, tripID: string, PlaceRequest: PlaceRequest){
    return this.http.post<Place>(`${environment.apiUrl}/users/${userID}/trips/${tripID}/places`, PlaceRequest)
  }


}
