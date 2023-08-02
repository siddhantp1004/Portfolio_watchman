import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MarketComponent } from './market/market.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { NgFor, NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { UserportfoliosComponent } from './userportfolios/userportfolios.component';
import { ViewstocksComponent } from './viewstocks/viewstocks.component';
import { MatChipsModule } from '@angular/material/chips';
import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    MarketComponent,
    UserportfoliosComponent,
    ViewstocksComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    MatSnackBarModule,
    ToastrModule.forRoot(),
  ], 
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi:true 
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
