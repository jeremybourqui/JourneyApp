import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap } from 'rxjs/operators';


import { PlaceService } from 'src/app/services/place.service';
import { AuthService } from 'src/app/auth/auth.service';

import { PlaceRequest } from 'src/app/models/place-request';
import { TripService } from 'src/app/services/trip.service';


@Component({
  selector: 'app-create-place',
  templateUrl: './create-place.page.html',
  styleUrls: ['./create-place.page.scss'],
})
export class CreatePlacePage implements OnInit {

  placeRequest: PlaceRequest;

  formError: boolean;

  constructor(private route: ActivatedRoute, private auth: AuthService, private router: Router, private placeService: PlaceService) {
    this.placeRequest = {
      title: undefined,
      description: undefined,
      location: {
        type: "Point",
        coordinates: [54.3498, -6.25],
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

  ngOnInit(): void {
  }

}
