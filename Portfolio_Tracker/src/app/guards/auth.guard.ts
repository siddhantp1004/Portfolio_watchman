import { AuthService } from '../service/auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SnackBarService } from '../service/snack-bar.service';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard   {
  constructor(private auth: AuthService,
  private router: Router,
  private snackbar: SnackBarService,
  private toastr : ToastrService) {}
  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      
      this.snackbar.showSnackBar('PLEASE LOGIN WITHIN THE APPLICATION TO VIEW THE SELECTED COMPONENT', 'Dismiss', 5000, 'custom-snack-bar');
      this.toastr.error('Please login into the application first!', 'Error');
      this.router.navigate(['login']);
      return false;
    }
  }
}