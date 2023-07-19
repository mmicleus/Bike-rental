import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { environment as env } from 'src/environments/environment.development';
import { User } from './auth/user.model';
import { Router } from '@angular/router';


export interface HttpResponseData{
  idToken:string,
  email:string,
  refreshToken:string
  expiresIn:string,
  localId:string
  registered:boolean
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user = new BehaviorSubject<User|null>(null);
  expirationId:any;
  account:User|null = null;

  constructor(private http:HttpClient,private router:Router) {
  }

  

  logIn(email:string,password:string){
    return this.http.post<HttpResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${env.API_KEY}`,{ email,password,returnSecureToken:true }).pipe(catchError(this.handleError),tap(this.handleResponse.bind(this)));
  }

  signUp(email:string,password:string){
    return this.http.post<HttpResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${env.API_KEY}`,{ email,password,returnSecureToken:true }).pipe(catchError(this.handleError),tap(this.handleResponse.bind(this)));
  }

 


  handleError(httpError:HttpErrorResponse){
    let aux = httpError.error.error.message;
    let message!:string;

    switch(aux){
      case "EMAIL_EXISTS": message = "Email taken!"
      break;
      case "EMAIL_NOT_FOUND": message = "Email not found!"
      break;
      case "INVALID_PASSWORD": message = "Invalid Password!"
      break;
      case "USER_DISABLED": message = "User Disabled"
      break;
      default:
        message = "Unknown password!"
    }
    
    return throwError(message);
  }


  handleResponse(response:HttpResponseData){
    let user = new User(response.email,response.localId,response.idToken,this.getExpirationDate(response.expiresIn));
    localStorage.setItem("user",JSON.stringify(user))
    this.user.next(user);
    this.account = user;

    this.router.navigate(["/ballinastoe"])


    this.autoLogout((+response.expiresIn) * 1000);
  }


  getExpirationDate(expiresIn:string){
      return new Date(new Date().getTime() + (+expiresIn) * 1000);
  } 

  autoLogin(){

    console.log("autoLogin");

    let aux = localStorage.getItem("user");
    if(!aux) return;

    let user:{
      email:string,
      id:string,
      _token:string,
      _tokenExpirationDate:string
    } = JSON.parse(aux);

    let actualUser = new User(user.email,user.id,user._token,new Date(user._tokenExpirationDate));


    console.log("user1:")
    console.log(user);


    if(!actualUser.token){
      return;
    }

    this.user.next(actualUser);
    this.account = actualUser;

    let expiresIn = new Date(user._tokenExpirationDate).getTime() - new Date().getTime();

    console.log("expires in:" + expiresIn);


    this.autoLogout(expiresIn);


    console.log("actual user:");
    console.log(actualUser);    
  }
  
  logOut(){
    localStorage.removeItem("user");
    this.user.next(null);
    this.account = null;
    
    if(this.expirationId){
      clearTimeout(this.expirationId)
    }

    this.expirationId = null;

    this.router.navigate(["/auth"]);

  

  }

  autoLogout(expiresIn:number){
    this.expirationId = setTimeout(() => {this.logOut()},expiresIn)
  }

}
