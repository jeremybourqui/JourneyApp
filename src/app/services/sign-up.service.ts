import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { AuthService } from '../auth/auth.service';

import { environment } from "src/environments/environment";

import { SignupRequest } from "../models/signup-request";
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  signup(SignupRequest: SignupRequest){
    return this.http.post<User>(`${environment.apiUrl}/users/`, SignupRequest)
  }
}
