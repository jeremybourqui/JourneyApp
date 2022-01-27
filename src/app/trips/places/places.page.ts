import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";

//import services
import { PlaceService } from "../../services/place.service";
import { TripService } from "../../services/trip.service";

// import Angular's HTTP client.
import { HttpClient } from "@angular/common/http";
import { ViewDidEnter } from "@ionic/angular";

//import model
import { Place } from "../../models/place";
import { Trip } from "../../models/trip";
import { TripRequest } from 'src/app/models/trip-request';

// import the environment config.
import { switchMap } from 'rxjs/operators';
import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-places',
  templateUrl: './places.page.html',
  styleUrls: ['./places.page.scss'],
})
export class PlacesPage implements OnInit {

  //insertion places
  places: Place[];

  //insertion trip
  trip?: Trip;


  constructor(

    private route: ActivatedRoute,
    // Inject the authentication provider.
    private auth: AuthService,
    // Inject the router
    private router: Router,

    //Inject the HTTP client
    public http: HttpClient,

    //Inject place service
    private placeService: PlaceService,

    //Inject trip service
    private tripService: TripService

  ) { }

  ionViewWillEnter() {

    // get the trip id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const tripIdFromRoute = String(routeParams.get('tripId'));

    this.auth.getUser$().pipe(
      switchMap((user) =>
        this.placeService.getPlaces(user._id, tripIdFromRoute))
    ).subscribe(places => {
      this.places = places.sort((a, b) => a.title > b.title ? 1 : -1)
    });

  }

  // Method to Delete a trip
  delete(placeID: string) {
    // get the trip id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const tripIdFromRoute = String(routeParams.get('tripId'));

    if (this.places) {
      this.auth.getUser$().pipe(
        switchMap((user) => this.placeService.deletePlace(user._id, tripIdFromRoute, placeID))
      ).subscribe(() => {
        const index = this.places.findIndex(place => place._id === placeID);
        if (index > -1) {
          this.places.splice(index, 1);
        }
      });

    }
  }

  ngOnInit() {
    this.getTrip();

  }

  getTrip() {
    const routeParams = this.route.snapshot.paramMap;
    const tripIdFromRoute = String(routeParams.get('tripId'));

    this.auth.getUser$().subscribe(user => {
      this.tripService.getSingleTrip(user._id, tripIdFromRoute).subscribe(trip => {
        this.trip = trip[0];
      })
    })
  }

  //Redirect to the places page
  getRedirect(placeID:string){
    this.router.navigateByUrl("/place-details");
  }

}
