import { Component, Injector, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";

//import model
import { Trip } from "../models/trip";
//import services
import { TripService } from "../services/trip.service";

// import Angular's HTTP client.
import { HttpClient } from "@angular/common/http";
import { ViewDidEnter } from "@ionic/angular";

// import the environment config.
import { environment } from "src/environments/environment";
import { switchMap } from 'rxjs/operators';

// import the Websocket service
import { WebsocketService } from '../services/websocket.service';

// import custom component


@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
})
export class TripsPage implements ViewDidEnter {

  //insertion trips
  trips: Trip[];

  constructor(
    // Inject the authentication provider.
    private auth: AuthService,
    // Inject the router
    private router: Router,

    //Inject the HTTP client
    public http: HttpClient,

    //Inject trip service
    private tripService: TripService,

    //Inject websocket service
    private wsService: WebsocketService

  ) { 
    this.wsService
    .listen()
    .subscribe(message => {
      console.log(message);
    });
  }

  ionViewDidEnter(): void {

  }

  ionViewWillEnter() {
    //technique 2 pour récupérer ID de l'utilisateur. Mais pas très propre, double subscribe
    // this.auth.getUser$().subscribe(user => {
    //   this.tripService.getTrips(user._id).subscribe(trips => {
    //     this.trips = trips
    //   })
    // })

    //technique 3 pour récupérer ID de l'utilisateur
    this.auth.getUser$().pipe(
      switchMap((user) => this.tripService.getTrips(user._id))
    ).subscribe(trips => {
      this.trips = trips
    });
  
  }

  ngOnInit() {

  }



  // Add a method to log out.
  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }



}
