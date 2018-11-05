import {Injectable} from '@angular/core';
import {Observable,of} from 'rxjs';
import {delay,tap} from 'rxjs/operators';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

//define interfaces here
export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
  firstname:string;
  lastname:string;
}

export interface TokenResponse{
  token:string;
}
export interface TokenPayload{
  email:string;
  password:string;
  firstname?:string;
  lastname?:string;

}
@Injectable()
export class AuthService{
  //isLoggedIn:boolean = false;
  loggedInuser:string = '';
  redirectUrl:string = "";
  private token:string;
  API_URL = "http://localhost:2000/api";

    constructor(private http:HttpClient,private router:Router){}
    login(username:string,password:string):Observable<boolean>{
      console.log("Trying to login....");
      this.loggedInuser = username;
      //return Observable.of(true).pipe(delay(1000),tap(val=>isLoggedIn=true));
     // return of(true).pipe(delay(100),tap(() => this.isLoggedIn =true));
      return of(true);
    }

    logout():void{
      this.token = "";
      window.localStorage.removeItem("mean-token");
      this.router.navigateByUrl('/');
    }

    private saveToken(token:string):void{
      localStorage.setItem('mean-token',token);
      this.token = token;
    }

    private getToken():string{
      if(!this.token){
        this.token = localStorage.getItem('mean-token');
      }
      return this.token;
    }

    public getUserDetails():UserDetails{
      const token = this.getToken();
      let payload;
      if(token){
        payload = token.split('.')[1];
        payload = window.atob(payload);
        return JSON.parse(payload);
      }
      else{return null;}
    }

    public isLoggedIn():boolean{
      const user = this.getUserDetails();
      if(user){
        return user.exp > Date.now()/1000;
      }
      else{
        return false;
      }
    }

    public loginn(user:TokenPayload):Observable<any>{
        return this.http.post(`${this.API_URL}/login`,user).pipe(map((data:TokenResponse)=>{
          if(data.token){
            this.saveToken(data.token);
          }
          return data;
        }));
    }

    public register(user:TokenPayload):Observable<any>{
      console.log("_ _ _-----------");
      console.log(user);
      console.log("------------___ _ _ ");
      var headers = new HttpHeaders({'Content-Type':'application/json'});
      /*return this.http.post(`http://localhost:2000/api/register`,user,{headers:headers}).pipe(map((data:TokenResponse)=>{
        if(data.token){
          this.saveToken(data.token);
        }
        console.log(data);
        return data;
      }));*/
      return this.http.post("http://localhost:2000/api/register",user,{headers:headers});
    }

    public profile():Observable<any>{
      return this.http.get(`${this.API_URL}/profile`,{headers:{Authorization:`Bearer ${this.getToken()}`}}).pipe(map((data:TokenResponse)=>{
        if(data){
          this.saveToken(data.token);
        }
        return data;
      }));
    }

}
