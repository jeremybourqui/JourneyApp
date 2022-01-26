import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { TripService } from "../../services/trip.service";
import { TripRequest } from "../../models/trip-request";

import { AuthService } from "src/app/auth/auth.service";

import { switchMap } from 'rxjs/operators';






@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.page.html',
  styleUrls: ['./create-trip.page.scss'],
})
export class CreateTripPage implements OnInit {

  tripRequest: TripRequest;

  tripError: boolean;

  constructor(
    private tripService: TripService,
    private router: Router,
    private auth: AuthService) {
    this.tripRequest = {
      title: undefined,
      description: undefined,
    };
   }

   ionViewWillEnter() {

    //technique 3 pour récupérer ID de l'utilisateur
    // this.auth.getUser$().subscribe(user => user._id);    
    // console.log(this.user);
    
  }

   onSubmit(form: NgForm){
     if (form.invalid) {
       return;
     }

     this.tripError = false;



    this.auth.getUser$().pipe(
      switchMap((user) => this.tripService.addTrip(user._id, this.tripRequest))
    ).subscribe({
      next: () => this.router.navigateByUrl("/"),
      error: (err) => {
             this.tripError = true;
             console.warn(`Error: failed: ${err.message}`)}
    });



   }

  ngOnInit() {
  }

}
