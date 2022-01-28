import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap } from 'rxjs/operators';


import { PlaceService } from 'src/app/services/place.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PictureService } from 'src/app/picture/picture.service';

import { PlaceRequest } from 'src/app/models/place-request';
import { TripService } from 'src/app/services/trip.service';

import { Geolocation } from '@capacitor/geolocation';
import { Location } from '@angular/common';
import { Place } from 'src/app/models/place';

@Component({
  selector: 'app-modify-places',
  templateUrl: './modify-places.page.html',
  styleUrls: ['./modify-places.page.scss'],
})
export class ModifyPlacesPage implements OnInit {

  placeRequest?: PlaceRequest;

  formError: boolean;

  constructor(private route: ActivatedRoute, private auth: AuthService, private router: Router, private placeService: PlaceService, private picture: PictureService, private location: Location) {
    this.placeRequest = {
      title: undefined,
      description: undefined,
      location: {
        type: "Point",
        coordinates: [undefined, undefined],
        },
      pictureUrl: undefined
    }
  }

  getPlace() {
    // get the trip id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const placeIdFromRoute = String(routeParams.get('placeId'));
    const tripIdFromRoute = String(routeParams.get('tripId'));

    this.auth.getUser$().subscribe(user => {
      this.placeService.getSinglePlace(user._id, tripIdFromRoute, placeIdFromRoute, ).subscribe(placeRequest => {
       this.placeRequest = placeRequest;
        console.log(this.placeRequest);
      })
    })
 }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.formError = false;
    const routeParams = this.route.snapshot.paramMap;
    const placeIdFromRoute = String(routeParams.get('placeId'));
    const tripIdFromRoute = String(routeParams.get('tripId'));

    this.auth.getUser$().pipe(
      switchMap((user) => this.placeService.modifyPlace(user._id, tripIdFromRoute, placeIdFromRoute, this.placeRequest))
    ).subscribe({
      next: () => this.location.back(),
      error: (err) => {
        this.formError = true;
        console.log(this.placeRequest);
        
        console.warn(`Error: failed: ${err.message}`)
      }
    });
   };

   takePicture(){
     console.log("test");
     this.picture.takeAndUploadPicture().subscribe(image => {
      this.placeRequest.pictureUrl = image.url;
       console.log(this.placeRequest);}
     );

  };

  ngOnInit(): void {
    this.getPlace();
    // const CurrentPosition = async () => {
    //   const coordinates = await Geolocation.getCurrentPosition();
    //   this.placeRequest.location.coordinates[0] = coordinates.coords.latitude;
    //   this.placeRequest.location.coordinates[1] = coordinates.coords.longitude;
    //   console.log('Current position:', coordinates.coords.latitude, coordinates.coords.longitude);
    //   }
    //   CurrentPosition();
  }

}