import {Component,OnInit,Output,EventEmitter} from '@angular/core';
import {FormGroup,FormBuilder,Validators,FormControl,ValidatorFn,AbstractControl} from '@angular/forms';
import {Users} from '../models/Users';
import {UsersPageComponent} from '../users/users-page.component';
import {AuthService} from './auth.service';
import {Router,RouterStateSnapshot,ActivatedRouteSnapshot} from '@angular/router';
import {DialogService} from '../dialog.service';
@Component({
  selector:'login-form',
  templateUrl:'./login-form.component.html',
  styleUrls:['./login.component.css']
})
export class LoginFormComponent implements OnInit{
  @Output() loadRegistrationPage = new EventEmitter<number>()
   userForm:FormGroup;
   user:Users = new Users(0,'alexi','alex','smith','alixsmith@newLogic.io','password@private');
   failedloggedIn:boolean = false;
    constructor(private fb:FormBuilder,private usersPageComponent:UsersPageComponent,private authService:AuthService,private router:Router,private dialogService:DialogService){
      this.createForm();
    }
    createForm(){
      this.userForm = new FormGroup({
        'email':new FormControl(this.user.username,[Validators.required,Validators.minLength(4),regexValidator(/[*&^%$$£'"?>:<;]/)]),
        'password':new FormControl(this.user.password,[Validators.required,Validators.minLength(8)])
      /*  'username':['',[Validators.required,Validators.minLength(4)/*,regexValidator(/[a-zA-Z]/,'numbers/special characters not allowed')]],
        'password':['',[Validators.required,Validators.minLength(8)]]*/
      });
    }
    ngOnInit(){
      //this.createForm();
    }

    login():any{
      this.authService.loginn(this.userForm.getRawValue()).subscribe((data) =>{
        console.log(data);
        if(data.token){
          if(this.authService.isLoggedIn){
            if(this.authService.redirectUrl){
              this.router.navigate([this,this.authService.redirectUrl]);
            }
            else{
              this.router.navigateByUrl('/layout');
            }
          }
        }
        else{
          console.log()
          this.dialogService.alert('login failed');
        }
      },(err)=>{
        console.log("Error trying to login....");
        this.dialogService.alert("login failed");
      });
     /* this.authService.login(username,password).subscribe(data =>{
        console.log(data);
        if(data == true){
          console.log("Logged in successfully");
          console.log(this.authService.redirectUrl);
          if(this.authService.redirectUrl){
            this.router.navigate([this.authService.redirectUrl]);
            return;
          }
          this.router.navigate(['/layout']);
        }
        console.log("Not logged in");
      });*/

    }

    get diagnostic(){
      return JSON.stringify(this.userForm.status);
    }
    get getUser(){
      return JSON.stringify(this.user);
    }

    requestRegistration(){
      console.log('Registration request...');
      this.loadRegistrationPage.emit(2);
      this.usersPageComponent.loadRequestedComponent(1);
    }
}
export function regexValidator(passwordPattern:RegExp):ValidatorFn{
  return (control:AbstractControl):{[key:string]:any} =>{
    const validPass = passwordPattern.test(control.value);
    console.log("Password status::",validPass);
    console.log(">>>", validPass ?  {'invalidPassword':{value:control.value}} :null);
    return validPass ?  {'invalidPassword':{value:control.value}} :null;
  }
}
