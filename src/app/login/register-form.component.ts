import {Component,OnInit} from '@angular/core';
import {FormGroup,FormControl,Validators,ValidatorFn,AbstractControl} from '@angular/forms';
import {Users} from '../models/Users';
import {UsersPageComponent} from '../users/users-page.component';
import {AuthService} from './auth.service';
import {DialogService} from '../dialog.service';
@Component({
  templateUrl:'./registration-form.component.html',
  styleUrls:['./login.component.css','./required-labels.css']
})
export class RegisterFormComponent implements OnInit{

  registrationForm:FormGroup;
  modelUser:Users = new Users(10000000,'viking','robin','hood','robinhood@mashes.early','xxxx');
  passwordMatch:boolean = false;
  constructor(private usersPageComponent:UsersPageComponent,private authService:AuthService,private dialogservice:DialogService){
    //this.createForm();
  }
  createForm(){
    this.registrationForm = new FormGroup({
      'firstname':new FormControl(this.modelUser.firstname,[Validators.required,Validators.minLength(2),regexValidator(/[0-9*&^%$$£'"?>:@<;]/)]),
      'lastname':new FormControl(this.modelUser.lastname,[Validators.required,Validators.minLength(2),regexValidator(/[0-9*&^%$$£'"?>:@<;]/)]),
      'email':new FormControl(this.modelUser.email,[Validators.required,Validators.email]),
      'password':new FormControl(this.modelUser.password,[Validators.required,Validators.minLength(8)]),
      'confirm_password':new FormControl('',[Validators.required])
    })
  }

 register(){
    console.log(this.registrationForm.getRawValue());
    this.authService.register(this.registrationForm.getRawValue()).subscribe(data =>{
      console.log(data);
      console.log(data.token);
      if(data.token){
        this.dialogservice.alert("you've registred successfully");
        this.requestLogin();
      }
    });
 }

onKey(event:KeyboardEvent){
  console.log((<HTMLInputElement>event.target).value);
}
 comparePasswords(repeatedPassword:string):void{
    console.log(repeatedPassword);
    this.passwordMatch = (repeatedPassword.trim() == this.modelUser.password ? true:false);
    console.log(this.passwordMatch);
 }
 requestLogin(){
   console.log('login requested')
    this.usersPageComponent.loadRequestedComponent(0);
 }
  ngOnInit(){
    this.createForm();
  }

}
export function regexValidator(forbiddenPattern:RegExp):ValidatorFn{
  return (control:AbstractControl):{[key:string]:any} =>{
    const invalidInput = forbiddenPattern.test(control.value);
    console.log("input status::",invalidInput);
    console.log(">>>", invalidInput ?  {'invalidPattern':{value:control.value}}:null);
    return invalidInput ?  {'invalidPattern':{value:control.value}} :null;
  }
}
