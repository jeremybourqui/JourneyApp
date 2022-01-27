import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";

//import services
import { PlaceService } from "../../../services/place.service";
import { PlaceDetailsService } from "../../../services/place-details.service"

// import Angular's HTTP client.
import { HttpClient } from "@angular/common/http";
import { ViewDidEnter } from "@ionic/angular";

// import model
import { Place } from 'src/app/models/place';

// import the environment config.
import { switchMap } from 'rxjs/operators';

import { Location } from '@angular/common';

import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.page.html',
  styleUrls: ['./place-details.page.scss'],
})
export class PlaceDetailsPage implements OnInit {

  //insertion place
  placeDetails?: Place;
  // place?: Place;

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
    //Inject place details service
    private placeDetailsService: PlaceDetailsService,
    //Inject location to go back after delete
    private location: Location,
    //Inject alertcontroller to make a popup before deleting
    public atrCtrl: AlertController,

  ) { }

  ionViewWillEnter() {

    // get the place id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const tripIdFromRoute = String(routeParams.get('tripId'));
    const PlaceIdFromRoute = String(routeParams.get('placeId'));

    this.auth.getUser$().pipe(
      switchMap((user) =>
      this.placeDetailsService.getPlace(user._id, tripIdFromRoute, PlaceIdFromRoute))
      ).subscribe(placeDetails => {
        this.placeDetails = placeDetails
        // console.log(this.placeDetails)
      });
  }

  ngOnInit() {
  }

  // Method to Delete a place
  async showConfirmAlert(placeID:string, tripID:string) {
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
            this.delete(placeID, tripID);
          }
        }
      ]
    });
    await alertConfirm.present();
  }

  //Method to delete
  delete(placeID:string, tripID:string) {
    if (this.placeDetails){
      this.auth.getUser$().pipe(
        switchMap((user) => this.placeDetailsService.deletePlace(user._id, tripID, placeID))
      ).subscribe({
        next: () => this.location.back()
        
      });
      
    }
  }



    // Redirect to the page modify-trip
    editRedirect(){
      this.router.navigateByUrl("/modify-place");
    }


}
