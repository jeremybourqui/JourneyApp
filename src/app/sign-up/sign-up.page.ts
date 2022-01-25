import { Component, OnInit } from '@angular/core';

import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { SignUpService } from "../services/sign-up.service";

import { SignupRequest } from "../models/signup-request";
import { User } from "../models/user";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  signupRequest: SignupRequest;
  signupError: boolean;

  constructor(private signUp: SignUpService, private router: Router) {
    this.signupRequest = {
      mail: undefined,
      username: undefined,
      password: undefined
    }
   }

  onSubmit(form: NgForm) {
    if (form.invalid){
      return;
    }

    this.signupError = false;

    this.signUp.signup(this.signupRequest).subscribe({
      next: () => this.router.navigateByUrl("/"),
      error: (err) => {
        this.signupError = true;
        console.warn(`Signup failed: ${err.message}`);
      },
    });
    
  }


  ngOnInit() {
  }

}
