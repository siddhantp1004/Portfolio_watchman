import { Injectable } from '@angular/core';
import { MatSnackBar,MatSnackBarConfig , MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}
  horizontalPosition: MatSnackBarHorizontalPosition = 'center'; // 'start', 'center', 'end', 'left', 'right'
  verticalPosition: MatSnackBarVerticalPosition = 'top'; // 'top', 'bottom'
  showSnackBar(
    message: string,
    action: string = 'Close',
    duration: number = 3000,
    panelClass?: string // Add the panelClass parameter
  ) {
    const config: MatSnackBarConfig = {
      duration: duration,
      panelClass: panelClass || '', // Use the provided panel class or an empty string
      horizontalPosition:this.horizontalPosition,
      verticalPosition:this.verticalPosition
    };
    this.snackBar.open(message, action, config);
  }
}