import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { HeaderComponent } from './pages/header/header/header.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoginComponent } from './pages/login/login/login.component';
import { RegisterComponent } from './pages/register/register/register.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import {  HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './pages/footer/footer.component';
import { CartComponent } from './pages/cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerifyUserComponent } from './pages/verify-user/verify-user.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { StatiContentComponent } from './pages/stati-content/stati-content.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    FooterComponent,
    CartComponent,
    VerifyUserComponent,
    ResetPasswordComponent,
    StatiContentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
