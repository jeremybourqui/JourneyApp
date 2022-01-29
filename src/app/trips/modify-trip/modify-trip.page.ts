import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from "@angular/forms";


import { TripService } from 'src/app/services/trip.service';
import { AuthService } from "src/app/auth/auth.service";

import { ViewDidEnter, ViewWillEnter } from '@ionic/angular';

import { Trip } from 'src/app/models/trip';
import { switchMap } from 'rxjs/operators';
import { TripRequest } from 'src/app/models/trip-request';

@Component({
  selector: 'app-modify-trip',
  templateUrl: './modify-trip.page.html',
  styleUrls: ['./modify-trip.page.scss'],
})
export class ModifyTripPage implements OnInit {

  trip?: Trip;

  tripRequest?: TripRequest;
  tripError: boolean;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private tripService: TripService,
    private router: Router,
    ){
    this.tripRequest = {
      title: undefined,
      description: undefined,
    };
   }

  ngOnInit() {
    this.getTrip();
    
  }

  ionViewWillEnter(){}
  
  getTrip() {
     // get the trip id from the current route.
     const routeParams = this.route.snapshot.paramMap;
     const tripIdFromRoute = String(routeParams.get('tripId'));
 
     this.auth.getUser$().subscribe(user => {
       this.tripService.getSingleTrip(user._id, tripIdFromRoute).subscribe(tripRequest => {
        this.tripRequest = tripRequest[0];
         console.log(this.tripRequest);
       })
     })
  }

  onSubmit(form: NgForm){
    if (form.invalid) {
      return;
    }

    const routeParams = this.route.snapshot.paramMap;
    const tripIdFromRoute = String(routeParams.get('tripId'));

   this.tripError = false;

   this.auth.getUser$().pipe(
     switchMap((user) => this.tripService.modifyTrip(user._id, tripIdFromRoute, this.tripRequest))
   ).subscribe({
     next: () => this.router.navigateByUrl("/"),
     error: (err) => {
            this.tripError = true;
            console.warn(`Error: failed: ${err.message}`)}
   });
  }
  
}