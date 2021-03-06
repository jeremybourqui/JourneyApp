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

// import Leaflet
import { latLng, MapOptions, tileLayer, Map, Marker, marker } from 'leaflet';
import { defaultIcon } from '../../default-marker';

import { AlertController } from '@ionic/angular';


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

  //searched keyword for search bar
  searchedKeyword: string;

  //insertion options map
  mapOptions: MapOptions;

  //insertion map
  map: Map;

  // insertion markers map
  mapMarkers: Marker[];

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
    private tripService: TripService,

    //Inject alertcontroller to make a popup before deleting
    public atrCtrl: AlertController,



  ) {
    this.mapOptions = {
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { maxZoom: 18 }
        )
      ],
      zoom: 13,
      center: latLng(46.778186, 6.641524)
    };

  }

  ionViewWillEnter() {

    // get the trip id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const tripIdFromRoute = String(routeParams.get('tripId'));

    this.auth.getUser$().pipe(
      switchMap((user) =>
        this.placeService.getPlaces(user._id, tripIdFromRoute))
    ).subscribe(places => {
      this.places = places.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1);
      if (places[0]) {
        this.map.setView([this.places[0].location.coordinates[0], this.places[0].location.coordinates[1]], 8);
        this.mapMarkers = []
        for (let i = 0; i < places.length; i++) {
          this.mapMarkers.push(marker([places[i].location.coordinates[0], places[i].location.coordinates[1]], { icon: defaultIcon }).bindTooltip(this.places[i].title))
            ;
        }
      }

    });

  }

  // Pop up
  async showConfirmAlert(placeID:string) {
    const alertConfirm = await this.atrCtrl.create({
      header: 'Delete',
      message: 'Are you sure to delete this place?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          // handler: () => {
          //   console.log('No clicked');
          // }
        },
        {
          text: 'Yes',
          handler: () => {
            this.delete(placeID);
          }
        }
      ]
    });
    await alertConfirm.present();
  }

  // Method to Delete a place
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

  getPlaces() {
    const routeParams = this.route.snapshot.paramMap;
    const tripIdFromRoute = String(routeParams.get('tripId'));
    this.auth.getUser$().pipe(
      switchMap((user) =>
        this.placeService.getPlaces(user._id, tripIdFromRoute))
    ).subscribe(places => {
      this.places = places.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1)
    });
  }

  //Redirect to the places page
  getRedirect(placeID: string) {
    this.router.navigateByUrl("/place-details");
  }

  onMapReady(map: Map) {
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
    this.map = map;
  }


}
