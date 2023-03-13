import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CreateUserResponse } from 'src/app/shared/models/dto/createUserResponse';
import { LoginResponse } from 'src/app/shared/models/dto/loginResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  createUserForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', [Validators.required, this.matchPasswords.bind(this)])
  });
  

  isCreatingUser = false;
  isloginError = false;
  loginErrorMsg = '';
  isCreateUserError = false;
  createUserErrorMsg = '';

  returnUrl: string | undefined;
  private routeSub: Subscription;

  constructor(private authService: AuthService,private router: Router, private route: ActivatedRoute, private apiService: ApiService) {
    this.routeSub = this.route.queryParams.subscribe((params) => {
      this.returnUrl = params['returnUrl'];
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  getReturnPage(): string {
    if (this.returnUrl) {
      return this.returnUrl;
    } else {
      return '/';
    }
  }

  private matchPasswords(control: AbstractControl): ValidationErrors | null {
    const password = control.parent?.get('password');
    const confirmPassword = control.parent?.get('confirmPassword');
    console.log("matchPasswords", control, password, confirmPassword)

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value['username'], this.loginForm.value['password']).subscribe((res: LoginResponse) => {
        if (res.success == true) {
          this.isloginError = false;  
          console.log('User is logged in');
          this.authService.emitIsLoggedSubject(true);
          console.debug('Navigating to ' + this.getReturnPage());
          this.router.navigate([this.getReturnPage()]);
        } else {
          this.isloginError = true;
          this.loginErrorMsg = res.message;
        }
      });
    }
  }

  onCreateUser() {
   this.isCreatingUser = true;
  }

  onCreateUserSubmit() {
    if (this.createUserForm.valid) {
      this.apiService.postSignup({username: this.createUserForm.value['username'],password: this.createUserForm.value['password']}).subscribe((res: CreateUserResponse) => {
        if (res.success == true) {
          this.isCreateUserError = false;  
          this.isCreatingUser = false;
        } else {
          this.isCreateUserError = true;
          this.createUserErrorMsg = res.message;
        }
      });
    }
  }

  onCancelCreateUser() { 
    this.isCreatingUser = false;
  }
}
