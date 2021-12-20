import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login/login.component';
import { RegisterComponent } from './pages/register/register/register.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { StatiContentComponent } from './pages/stati-content/stati-content.component';
import { VerifyUserComponent } from './pages/verify-user/verify-user.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomepageComponent},
  {path:'forget-password',component:ForgetPasswordComponent},
  {path:'reset-password',component:ResetPasswordComponent},
  {path:'logIn',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'cart',component:CartComponent},
  {path:'verify-user',component:VerifyUserComponent},
  {path:'static-content',component:StatiContentComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
