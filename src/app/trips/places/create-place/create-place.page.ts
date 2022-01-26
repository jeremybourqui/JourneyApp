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

@Component({
  selector: 'app-create-place',
  templateUrl: './create-place.page.html',
  styleUrls: ['./create-place.page.scss'],
})
export class CreatePlacePage implements OnInit {

  placeRequest: PlaceRequest;

  formError: boolean;

  constructor(private picture: PictureService, private route: ActivatedRoute, private auth: AuthService, private router: Router, private placeService: PlaceService) {
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

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.formError = false;
    const routeParams = this.route.snapshot.paramMap;
    const tripIdFromRoute = String(routeParams.get('tripId'));

    this.auth.getUser$().pipe(
      switchMap((user) => this.placeService.addPlace(user._id, tripIdFromRoute, this.placeRequest))
    ).subscribe({
      next: () => this.router.navigateByUrl("/"),
      error: (err) => {
        this.formError = true;
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

     
   }

  ngOnInit(): void {

    const CurrentPosition = async () => {
      const coordinates = await Geolocation.getCurrentPosition();
      this.placeRequest.location.coordinates[0] = coordinates.coords.latitude;
      this.placeRequest.location.coordinates[1] = coordinates.coords.longitude;
      console.log('Current position:', coordinates.coords.latitude, coordinates.coords.longitude);
      }
      CurrentPosition();
  }

}