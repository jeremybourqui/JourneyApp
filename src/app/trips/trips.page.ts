import { Component, OnInit } from '@angular/core';
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
    private tripService: TripService

  ) {
    //insertion trips
    this.trips=[
      // {title: "dfmgjvbnbdfékb", description: "kxyjdhdvhnéskdfjnbéf", userId: "dsbdfb", _id: "drrgdrhbdb" },
      // {title: "dkfljvgvsldfkhbvsfldkjhbv", description: "sdjkdhflskdhjfuisadhf", userId: "dsbdfb", _id: "drrgdrhbdb"}
    ];
 
    
  }

  ionViewDidEnter(): void {
     // Make an HTTP request to retrieve the trips.
    const url = "https://archiowebjourney.herokuapp.com/users/:userId/trips";
    this.http.get(url).subscribe((trips) => {
      console.log(`Trips loaded`, trips);
    });
  }

  ngOnInit() {
    const url = `${environment.apiUrl}/users/:userId/trips`;
    this.http.get(url).subscribe((trips) => {
      console.log(`Trips loaded`, trips);
    });
  }

  // Add a method to log out.
  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }

  addTrip(){
    // this.trips.push(this.tripService.getTrip());
    this.tripService.getTrip().subscribe(trip => {
      this.trips.push(trip);
    });
  }

}
