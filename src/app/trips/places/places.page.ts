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

// import the environment config.
import { switchMap } from 'rxjs/operators';

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

  ) {}

  ionViewWillEnter() {

    // get the trip id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const tripIdFromRoute = String(routeParams.get('tripId'));

    this.auth.getUser$().pipe(
      switchMap((user) =>
      this.placeService.getPlaces(user._id, tripIdFromRoute))
      ).subscribe(places => {
          this.places = places
        });
  
  }

  ngOnInit() {
  }

  //Redirect to the places page
  getRedirect(placeID:string){
    this.router.navigateByUrl("/place-details");
  }

}
