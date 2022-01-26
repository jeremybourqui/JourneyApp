import { Injectable } from '@angular/core';
import { Place } from "../models/place";
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getPlaces(userID: string, tripID: string): Observable<Place[]> {
    return this.http
      .get<Place[]>(`https://archiowebjourney.herokuapp.com/users/${userID}/trips/61deedaee2914fc943558ec8/places`);
  }

  deletePlace(userID: string, tripID: string, placeID: string): Observable<Place[]> {
    return this.http
      .delete<Place[]>(`https://archiowebjourney.herokuapp.com/users/${userID}/trips/${tripID}/places/${placeID}`);
  }
}
