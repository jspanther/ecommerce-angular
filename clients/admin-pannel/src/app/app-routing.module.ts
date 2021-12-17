import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ForgetComponent } from './auth/forget/forget.component';
import { LoginComponent } from './auth/login/login.component';
import { AddBannerComponent } from './pages/banner-management/add-banner/add-banner.component';
import { BannerListComponent } from './pages/banner-management/banner-list/banner-list.component';
import { EditBannerComponent } from './pages/banner-management/edit-banner/edit-banner.component';
import { ViewBannerComponent } from './pages/banner-management/view-banner/view-banner.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddProductComponent } from './pages/product-management/add-product/add-product.component';
import { EditProductComponent } from './pages/product-management/edit-product/edit-product.component';
import { ProductListComponent } from './pages/product-management/product-list/product-list.component';
import { ViewProductComponent } from './pages/product-management/view-product/view-product.component';
import { EditProfileComponent } from './pages/profile/edit-profile/edit-profile.component';
import { ViewProfileComponent } from './pages/profile/view-profile/view-profile.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SettingComponent } from './pages/setting/setting.component';
import { AddStaticContentComponent } from './pages/static-content/add-static-content/add-static-content.component';
import { EditStaticContentComponent } from './pages/static-content/edit-static-content/edit-static-content.component';
import { StaticContentManagementComponent } from './pages/static-content/static-content-management/static-content-management.component';
import { ViewStaticContentComponent } from './pages/static-content/view-static-content/view-static-content.component';
import { AddSubadminComponent } from './pages/subadmin-management/add-subadmin/add-subadmin.component';
import { EditSubadminComponent } from './pages/subadmin-management/edit-subadmin/edit-subadmin.component';
import { SubadminListComponent } from './pages/subadmin-management/subadmin-list/subadmin-list.component';
import { ViewSubadminComponent } from './pages/subadmin-management/view-subadmin/view-subadmin.component';
import { EditUserComponent } from './pages/user-management/edit-user/edit-user.component';
import { UserDetailsComponent } from './pages/user-management/user-details/user-details.component';
import { UserListComponent } from './pages/user-management/user-list/user-list.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'forget-password',component:ForgetComponent},
  {path:'reset-password',component:ResetPasswordComponent},
  {path:'change-password',component:ChangePasswordComponent,canActivate:[AuthGuard]},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  //user
  {path:'user-management',component:UserListComponent,canActivate:[AuthGuard]},
  {path:"user-details",component:UserDetailsComponent,canActivate:[AuthGuard]},
  {path:"edit-user",component:EditUserComponent,canActivate:[AuthGuard]},
  //product
  {path:"product-management",component:ProductListComponent,canActivate:[AuthGuard]},
  {path:"view-product",component:ViewProductComponent,canActivate:[AuthGuard]},
  {path:"edit-product",component:EditProductComponent,canActivate:[AuthGuard]},
  {path:"add-product",component:AddProductComponent,canActivate:[AuthGuard]},
  //product
  {path:"subadmin-management",component:SubadminListComponent,canActivate:[AuthGuard]},
  {path:"view-admin",component:ViewSubadminComponent,canActivate:[AuthGuard]},
  {path:"edit-admin",component:EditSubadminComponent,canActivate:[AuthGuard]},
  {path:"add-admin",component:AddSubadminComponent,canActivate:[AuthGuard]},
  //banner
  {path:"banner-management",component:BannerListComponent,canActivate:[AuthGuard]},
  {path:"view-banner",component:ViewBannerComponent,canActivate:[AuthGuard]},
  {path:"edit-banner",component:EditBannerComponent,canActivate:[AuthGuard]},
  {path:"add-banner",component:AddBannerComponent,canActivate:[AuthGuard]},
  //Static content
  {path:"static-management",component:StaticContentManagementComponent,canActivate:[AuthGuard]},
  {path:"view-static",component:ViewStaticContentComponent,canActivate:[AuthGuard]},
  {path:"edit-static",component:EditStaticContentComponent,canActivate:[AuthGuard]},
  {path:"add-static",component:AddStaticContentComponent,canActivate:[AuthGuard]},
  //profile
  {path:"view-profile",component:ViewProfileComponent,canActivate:[AuthGuard]},
  {path:"edit-profile",component:EditProfileComponent,canActivate:[AuthGuard]},
  {path:"setting",component:SettingComponent,canActivate:[AuthGuard]},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
