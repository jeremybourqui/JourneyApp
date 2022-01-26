import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { switchMap } from 'rxjs/operators';


import { PlaceService } from 'src/app/services/place.service';
import { AuthService } from 'src/app/auth/auth.service';

import { PlaceRequest } from 'src/app/models/place-request';
import { TripService } from 'src/app/services/trip.service';

import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-create-place',
  templateUrl: './create-place.page.html',
  styleUrls: ['./create-place.page.scss'],
})
export class CreatePlacePage implements OnInit {

  placeRequest: PlaceRequest;

  formError: boolean;

  constructor(private auth: AuthService, private router: Router, private placeService: PlaceService) {
    this.placeRequest = {
      title: undefined,
      description: undefined,
      location:{
        type: "Point",
        coordinates: [undefined, undefined],
        },
      pictureUrl: undefined
    }
   }

   onSubmit(form: NgForm){
     if (form.invalid){
       return;
     }
      
     this.formError = false;

     this.auth.getUser$().pipe(
      switchMap((user) => this.placeService.addPlace(user._id, "61deedc4e2914fc943558eda", this.placeRequest))
    ).subscribe({
      next: () => this.router.navigateByUrl("/"),
      error: (err) => {
             this.formError = true;
             console.warn(`Error: failed: ${err.message}`)}
    });


   };

  ngOnInit(): void {
    
    // const printCurrentPosition = async () => {
    //   const coordinates = await Geolocation.getCurrentPosition();
    //   console.log('Current position:', coordinates.coords);
    //   }
    // printCurrentPosition();

    const CurrentPosition = async () => {
      const coordinates = await Geolocation.getCurrentPosition();
      this.placeRequest.location.coordinates[0] = coordinates.coords.latitude;
      this.placeRequest.location.coordinates[1] = coordinates.coords.longitude;
      console.log('Current position:', coordinates.coords.latitude, coordinates.coords.longitude);
      }
      CurrentPosition();
  

  }

}