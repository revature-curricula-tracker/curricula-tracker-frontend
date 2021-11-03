import { User } from './../../model/user';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  title = "Curricula Tracker";
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  user: User = new User('', '');

  constructor(private toastr: ToastrService, private router: Router) { }

  public loginUser(): void {
    if (this.user.password === '' || this.user.email === '') {
      this.errorToastr("Input cannot be empty");
    } else if (this.user.email === 'admin@revature.net' && this.user.password === 'password') {
      this.successToastr();
      this.router.navigate(['/home']);
    } else {
      this.errorToastr("Incorrect username or password");
    }
  }

  public successToastr() {
    this.toastr.success("Succesfully Logged In", "Login Successful!");
  }

  public errorToastr(message: string) {
    this.toastr.error(message, "Login Failed");
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
