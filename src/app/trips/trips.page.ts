import { Component, Injector, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";

//import model
import { Trip } from "../models/trip";
import { WsMessage } from '../models/wsmessage';
//import services
import { TripService } from "../services/trip.service";
import { PlaceService } from "../services/place.service";

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

  //searched keyword for search bar
  searchedKeyword: string;

  constructor(
    // Inject the authentication provider.
    private auth: AuthService,
    // Inject the router
    private router: Router,

    //Inject the HTTP client
    public http: HttpClient,

    //Inject trip service
    private tripService: TripService,
    private placeService: PlaceService,

    //Inject websocket service
    private wsService: WebsocketService

  ) { 
    this.wsService
    .listen<WsMessage>()
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
      this.trips = trips.sort((a,b) => a.title > b.title ? 1: -1) //pour s'assurer que c'est bien dand l'ordre alphabétique      
    });
  
  }

  ngOnInit() {

  }

  // Methods to order

  orderAlphabeticDown(){
    // add class .selected to selected and remove from other
    const element = document.getElementById("orderAlphabeticDown");
    const selected = document.querySelector(".selected");
    if(selected){
      selected.classList.remove("selected")
    }
    element.classList.add("selected");

    //order by alphabetic
    return this.trips.sort((a,b) => a.title > b.title ? 1: -1);
    
  }
  orderAlphabeticUp(){
    // add class .selected to selected and remove from other
    const element = document.getElementById("orderAlphabeticUp");
    const selected = document.querySelector(".selected");
    if(selected){
      selected.classList.remove("selected")
    }
    element.classList.add("selected");

    //order by alphabetic invert
    return this.trips.sort((a,b) => a.title < b.title ? 1: -1);
    
  }
  orderDateDown(){
    // add class .selected to selected and remove from other
    const element = document.getElementById("orderDateDown");
    const selected = document.querySelector(".selected");
    if(selected){
      selected.classList.remove("selected")
    }
    element.classList.add("selected");

    //order by latest created
    return this.trips.sort((a,b) => {
      return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
    })
  }
  orderDateUp(){
    // add class .selected to selected and remove from other
    const element = document.getElementById("orderDateUp");
    const selected = document.querySelector(".selected");
    if(selected){
      selected.classList.remove("selected")
    }
    element.classList.add("selected");

    //order by oldest created
    return this.trips.sort((a,b) => {
      return <any>new Date(a.createdAt) - <any>new Date(b.createdAt);
    })
  }

  // Method to Delete a trip
  delete(tripID:string) {
    if (this.trips){
      this.auth.getUser$().pipe(
        switchMap((user) => this.tripService.deleteTrip(user._id, tripID))
      ).subscribe(()=> {
        const index = this.trips.findIndex(trip => trip._id === tripID);
        if(index > -1){
          this.trips.splice(index, 1);
        }
      });
      
    }
  }

  //Redirect to the places page
  getRedirect(tripID:string){
    this.router.navigateByUrl("/places");
    }

  // Redirect to the page create-trip
  addRedirect(){
    this.router.navigateByUrl("/create-trip");
  }

  // Redirect to the page modify-trip
  modifyRedirect(tripID: string){
    this.router.navigateByUrl("/modify-trip"); //probablement modifier selon comment on veut faire
  }

  // Add a method to log out.
  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }

}
