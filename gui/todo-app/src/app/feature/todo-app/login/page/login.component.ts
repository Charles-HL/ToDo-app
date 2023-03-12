import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
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

  isloginError = false;
  loginErrorMsg = '';

  returnUrl: string | undefined;
  private routeSub: Subscription;

  constructor(private authService: AuthService,private router: Router, private route: ActivatedRoute) {
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
}
