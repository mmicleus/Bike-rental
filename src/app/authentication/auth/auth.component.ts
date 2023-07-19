import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService, HttpResponseData } from '../auth.service';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit,OnDestroy {
  form:FormGroup = new FormGroup({});
  noMatch:boolean = false;
  loginMode:boolean = false;
  obs!:Observable<any>;
  error:string | null = null;
  sb!:Subscription;
  alertMessage:string | null = null;

  constructor(private authService:AuthService,private router:Router,private activatedRoute:ActivatedRoute){
  }

  ngOnInit(){
    this.form = new FormGroup({
      'email':new FormControl(null,[Validators.required,Validators.email]),
      'password':new FormControl(null,[Validators.required,Validators.minLength(6)]),
      'repeat-password':new FormControl(null,[ageRangeValidator(this)])
    }
    );

    this.form.get("repeat-password")?.valueChanges.subscribe(this.validatePasswordInput.bind(this))
    this.form.get("password")?.valueChanges.subscribe(this.validatePasswordInput.bind(this))

    this.sb = this.activatedRoute.queryParams.subscribe((params) => {
      if(params['alertMessage']){
        this.displayAlert(params['alertMessage'])
      }
    })


  }

  validatePasswordInput(value:string){

    if(this.form.get("repeat-password")?.value != this.form.get("password")?.value) {
      this.noMatch = true;
      return;
    }

    this.noMatch = false;
  }

  changeMode(){
    this.loginMode = !this.loginMode;
  }

  displayAlert(message:string){

    this.alertMessage = message;
    setTimeout(() => {this.alertMessage = null;},10000)
  }



  onSubmit(){
    if(this.loginMode){
      this.obs = this.authService.logIn(this.form.value.email,this.form.value.password);
    }
    else{
      this.obs = this.authService.signUp(this.form.value.email,this.form.value.password);
    }

    this.obs.subscribe((data:HttpResponseData) => {this.error = null;
    },(error) => {this.error = error});
  }

  ngOnDestroy(){
    this.sb.unsubscribe();
  }

 
}


function ageRangeValidator(component:any): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!component.loginMode && control.value == "") {
          return { 'required': true };
      }
      return null;
  };
}
